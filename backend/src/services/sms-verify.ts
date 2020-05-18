import { sms } from "../config";
const twilio = require("twilio")(sms.twilio.accountSid, sms.twilio.authToken);

export interface SmsVerifier {
    sendVerificationCodeSms: (phoneNumber: string) => Promise<void>;
    verifySmsCode: (phoneNumber: string, code: string) => Promise<boolean>;
}

const twilioVerifier: SmsVerifier = {
    sendVerificationCodeSms: async (phoneNumber) => {
        return await twilio.verify
            .services(sms.twilio.verificationSid)
            .verifications.create({ to: phoneNumber, channel: "sms" });
    },
    verifySmsCode: async (phoneNumber: string, code: string) => {
        const smsResult = await twilio.verify
            .services(sms.twilio.verificationSid)
            .verificationChecks.create({ code, to: phoneNumber });
        return smsResult.status === "approved";
    },
};

const mockVerifier: SmsVerifier = {
    sendVerificationCodeSms: async (phoneNumber) => {
        console.info(`mocking a sms text to ${phoneNumber}...`);
    },
    verifySmsCode: async (phoneNumber: string, code: string) => {
        // verify last 4 digits of the phone number
        return code === phoneNumber.substr(phoneNumber.length - 4);
    },
};

const smsService = sms.service === "twilio" ? twilioVerifier : mockVerifier
export default smsService
