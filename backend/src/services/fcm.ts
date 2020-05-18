import admin from "firebase-admin";
import firebaseConfig from "../../firebase_credentials.json";
import { findFcmKeysByUserId } from "../model/fcmKey";

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
});

export interface Notification {
    title: string;
    body: string;
}

/**
 * Send a notification to a User
 * @param {string} title    Eg. Voce tem um novo ajudante!
 * @param {string} body     Eg. O ajudante Gabriel aceitou sua ordem
 * @param {string} token    Firebase Token Eg. GPOIRGPOAI540GFKO39434
 */
export const sendNotification = (token: string, { title, body }: Notification) =>
    admin.messaging().send({
        notification: {
            title,
            body,
        },
        token,
    });

export const notifyUserInAllPlatforms = async (userId: number, notification: Notification) => {
    const tokens = await findFcmKeysByUserId(userId);

    const notifications = tokens.map((fcmRecord) => {
        return sendNotification(fcmRecord.token, notification);
    });
    await Promise.all(notifications);
};

export default admin;
