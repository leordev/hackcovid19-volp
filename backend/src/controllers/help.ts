import { Request, Response, NextFunction } from "express";

import { getTokenUser } from "../services/jwt";
import { getAddressById } from "../model/address";
import { EntityType, HelpStatus } from "../model/enums";
import {
    insertHelpRequest,
    findHelpRequestsForRequester,
    findHelpRequestsForHelper,
    getHelpRequestById,
    updateHelpRequest,
    findHelpRequestsInRegion,
    FullHelpRequest,
} from "../model/help";
import {
    RegionQueryParams,
    calculateRegionFromQueryParams,
    calculateRegion,
    DEFAULT_NEARBY_RADIUS_FOR_NOTIFICATIONS,
} from "../utils/geoloc";
import { findUserById, findHelpersInRegion } from "../model/user";
import {
    notifyHelpRequested,
    notifyHelpAccepted,
    notifyHelpInProgress,
    notifyHelpCompleted,
    notifyUserCanceledRequest,
    notifyHelperCanceledRequest,
} from "../services/notifications";
import { findPhonesForEntity, PhoneNumber } from "../model/phone";

export interface NewHelpRequest {
    description: string;
    offered_amount: number;
    address_id: number;
}

export const requestHelp = async (req: Request<{}, {}, NewHelpRequest>, res: Response, next: NextFunction) => {
    try {
        const newRequest = req.body;
        const user = getTokenUser(req);

        const address = await getAddressById(newRequest.address_id);
        if (!address || !(address.type === EntityType.User && address.entity_id === user.userId)) {
            throw "invalid address";
        }

        /// TODO: prevent help request flood (cant open a new help request whenever
        /// another request is pending)
        const helpRequest = await insertHelpRequest({
            requester_id: user.userId,
            address_id: newRequest.address_id,
            description: newRequest.description,
            offered_amount: newRequest.offered_amount,
            helper_id: 0,
            paid_amount: 0,
            receipt: "",
            status: HelpStatus.Pending,
        });

        const region = calculateRegion(address.latitude, address.longitude, DEFAULT_NEARBY_RADIUS_FOR_NOTIFICATIONS);
        const helpers = await findHelpersInRegion(region.start, region.end);
        notifyHelpRequested(
            helpRequest,
            helpers.map((i) => i.id),
        );

        res.send(helpRequest);
    } catch (err) {
        next(err);
    }
};

export const listMyHelpRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = getTokenUser(req);
        const requests = await findHelpRequestsForRequester(user.userId);
        const helped = await findHelpRequestsForHelper(user.userId);
        res.send({ requests, helped });
    } catch (err) {
        next(err);
    }
};

export const getHelpRequest = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const user = getTokenUser(req);
        const request = await getHelpRequestById(parseInt(req.params.id));
        if (
            !request ||
            (request.requester_id !== user.userId && request.helper_id > 0 && request.helper_id !== user.userId)
        ) {
            throw "invalid request";
        }

        const requester = await findUserById(request.requester_id);
        if (!requester) {
            throw "invalid requester";
        }

        const requester_phones = await findPhonesForEntity(EntityType.User, request.requester_id);
        const address = await getAddressById(request.address_id);
        if (!address) {
            throw "invalid address";
        }

        let helper;
        let helper_phones = [] as PhoneNumber[];
        if (request.helper_id > 0) {
            helper = await findUserById(request.helper_id);
            helper_phones = await findPhonesForEntity(EntityType.User, request.helper_id);
        }

        const fullRequest: FullHelpRequest = {
            ...request,
            requester,
            address,
            requester_phones,
            helper,
            helper_phones,
        };
        res.send(fullRequest);
    } catch (err) {
        next(err);
    }
};

export const listHelpRequestsForLocation = async (
    req: Request<{ status: string }, {}, {}, RegionQueryParams>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = getTokenUser(req);
        const user = await findUserById(userId);
        if (!user || !user.is_helper) {
            throw "not a helper";
        }

        const status: HelpStatus = parseInt(req.params.status);

        const region = calculateRegionFromQueryParams(req.query);
        const requests = await findHelpRequestsInRegion(region.start, region.end, status);
        res.send(requests);
    } catch (err) {
        next(err);
    }
};

export interface HelpStatusApi {
    status: HelpStatus;
    paidAmount?: number;
    receipt?: string;
}

export const updateHelpRequestStatus = async (
    req: Request<{ id: string }, {}, HelpStatusApi>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = getTokenUser(req);

        const requestId = parseInt(req.params.id);
        const newStatus = req.body;

        const request = await getHelpRequestById(requestId);
        if (!request) {
            throw "invalid help request";
        }

        // helper accepts new pending request
        if (
            newStatus.status === HelpStatus.Accepted &&
            request.status === HelpStatus.Pending &&
            userId !== request.requester_id
        ) {
            const updatedRequest = { ...request, helper_id: userId, status: HelpStatus.Accepted };
            await updateHelpRequest(updatedRequest);
            notifyHelpAccepted(updatedRequest);
            return res.sendStatus(204);
        }

        // helper in progress
        if (
            newStatus.status === HelpStatus.InProgress &&
            request.status === HelpStatus.Accepted &&
            userId === request.helper_id
        ) {
            const updatedRequest = { ...request, status: newStatus.status };
            if (newStatus.receipt) updatedRequest.receipt = newStatus.receipt;
            if (newStatus.paidAmount) updatedRequest.paid_amount = newStatus.paidAmount;
            await updateHelpRequest(updatedRequest);
            notifyHelpInProgress(updatedRequest);
            return res.sendStatus(204);
        }

        // help is completed
        if (
            newStatus.status === HelpStatus.Completed &&
            request.status === HelpStatus.InProgress &&
            userId === request.helper_id
        ) {
            const updatedRequest = { ...request, completed_at: new Date(), status: newStatus.status };
            if (newStatus.receipt) updatedRequest.receipt = newStatus.receipt;
            if (newStatus.paidAmount) updatedRequest.paid_amount = newStatus.paidAmount;
            await updateHelpRequest(updatedRequest);
            notifyHelpCompleted(updatedRequest);
            return res.sendStatus(204);
        }

        // user cancels help
        if (
            newStatus.status === HelpStatus.Canceled &&
            request.status !== HelpStatus.Completed &&
            request.status !== HelpStatus.Canceled &&
            userId === request.requester_id
        ) {
            await updateHelpRequest({ ...request, status: HelpStatus.Canceled });
            if (request.helper_id > 0) {
                notifyUserCanceledRequest(request);
            }
            return res.sendStatus(204);
        }

        // helper undo/cancel the current help
        if (
            newStatus.status === HelpStatus.Pending &&
            (request.status === HelpStatus.InProgress || request.status === HelpStatus.Accepted) &&
            userId === request.helper_id
        ) {
            const updatedRequest = {
                ...request,
                helper_id: 0,
                paid_amount: 0,
                receipt: "",
                status: HelpStatus.Pending,
            };
            await updateHelpRequest(updatedRequest);
            notifyHelperCanceledRequest(updatedRequest);
            return res.sendStatus(204);
        }

        throw "invalid help status update";
    } catch (err) {
        return next(err);
    }
};
