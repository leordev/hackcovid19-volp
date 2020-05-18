import { HelpRequest } from "../model/help";
import { notifyUserInAllPlatforms, Notification } from "./fcm";

export const notifyHelpRequested = async (request: HelpRequest, helperIds: number[]): Promise<void> => {
    const notifications: Promise<void>[] = [];

    const helperNotification: Notification = {
        title: `Um Novo Pedido de Ajuda foi solicitado em sua Região`,
        body: request.description,
    };
    for (const helperId of helperIds) {
        notifications.push(notifyUserInAllPlatforms(helperId, helperNotification));
    }

    const requesterNotification = notifyUserInAllPlatforms(request.requester_id, {
        title: "Pedido de Ajuda Criado",
        body:
            helperIds.length > 0
                ? "Ajudantes ao redor da sua região foram notificados."
                : "Infelizmente não foram encontrados ajudantes na sua região. Por favor, compartilhe seu pedido de ajuda usando nosso link...",
    });
    notifications.push(requesterNotification);

    await Promise.all(notifications);
};

export const notifyHelpAccepted = async (request: HelpRequest): Promise<void> => {
    const notification: Notification = {
        title: `Seu Pedido de Ajuda foi Aceito!`,
        body: request.description,
    };
    await notifyUserInAllPlatforms(request.requester_id, notification);
};

export const notifyHelpInProgress = async (request: HelpRequest): Promise<void> => {
    const notification: Notification = {
        title: `Seu Pedido de Ajuda está Em Andamento!`,
        body: request.description,
    };
    await notifyUserInAllPlatforms(request.requester_id, notification);
};

export const notifyHelpCompleted = async (request: HelpRequest): Promise<void> => {
    const notification: Notification = {
        title: `Pedido de Ajuda FINALIZADO!`,
        body: request.description,
    };
    await notifyUserInAllPlatforms(request.requester_id, notification);
};

export const notifyUserCanceledRequest = async (request: HelpRequest): Promise<void> => {
    const notification: Notification = {
        title: `Usuário Cancelou o Pedido de Ajuda`,
        body: request.description,
    };
    await notifyUserInAllPlatforms(request.helper_id, notification);
};

export const notifyHelperCanceledRequest = async (request: HelpRequest): Promise<void> => {
    const notification: Notification = {
        title: `Infelizmente o Ajudante teve de Interromper seu Atendimento...`,
        body: request.description,
    };
    await notifyUserInAllPlatforms(request.requester_id, notification);
};
