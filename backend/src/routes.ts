import { Router } from "express";

import { index as info, signup } from "./controllers";
import { authSmsVerificationCode, authenticate, renewToken } from "./controllers/auth";
import { newInstitution, modifyInstitution, getInstitution, listInstitutions } from "./controllers/institution";
import { newAddress, listMyAddresses } from "./controllers/address";
import { getDonation, newDonation, acceptDonation } from "./controllers/donation";
import { updateTokenFcm } from "./controllers/fcm";
import { setHelper } from "./controllers/helpers";
import {
    requestHelp,
    listMyHelpRequests,
    updateHelpRequestStatus,
    listHelpRequestsForLocation,
    getHelpRequest,
} from "./controllers/help";

const router: Router = Router();

/* --- OPEN PUBLIC PATHS --- */
router.get("/", info);

// auth
router.post("/signup", signup);
router.post("/authenticate", authenticate);
router.post("/auth-verify-code", authSmsVerificationCode);

router.get("/institution", listInstitutions);
router.get("/institution/:id", getInstitution);

/* --- PROTECTED PATHS --- */
router.post("/address", newAddress);

router.post("/new-institution", newInstitution);
router.put("/institution", modifyInstitution);

router.put("/donation/:id/accept", acceptDonation);
router.get("/donation/:id", getDonation);
router.post("/donation", newDonation);

router.post("/user/update-token/fcm", updateTokenFcm);
router.get("/user/renew-token", renewToken);
router.put("/user/set-helper", setHelper);
router.get("/user/addresses", listMyAddresses);

router.post("/help", requestHelp);
router.get("/help", listMyHelpRequests);
router.get("/help/location/:status", listHelpRequestsForLocation);
router.get("/help/:id", getHelpRequest);
router.put("/help/:id/status", updateHelpRequestStatus);

export default router;
