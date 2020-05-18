require("dotenv-safe").config();

export const app = {
    name: "Corona Maps",
    version: "0",
    host: process.env.APP_HOST || "",
    port: +(process.env.PORT || "80"),
    environment: "development",
    secret: process.env.APP_SECRET || "PlsInsertASecretHere",
};

export const db = {
    client: process.env.DB_CONNECTION,
    connection: {
        charset: "utf8",
        timezone: "UTC",
        host: process.env.DB_HOST,
        port: +(process.env.DB_PORT || "5432"),
        database: process.env.NODE_ENV === "test" ? process.env.TEST_DB_NAME : process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
};

export const sms = {
    service: process.env.SMS_SERVICE,
    twilio: {
        authToken: process.env.TWILIO_AUTH_TOKEN,
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        verificationSid: process.env.TWILIO_VERIFICATION_SID,
    },
};
