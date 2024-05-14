import twilio from "twilio";
import { TWILIO_AUTH_TOKEN, TWILIO_SID } from "../config/index.js";

export const generateOTP = () => {
  // Generate a random 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  //   Generate expiry Date
  const expiry = new Date();
  expiry.setTime(new Date().getTime() + 5 * 60 * 1000);
  return { otp, expiry };
};

export const onRequestOTP = async (otp, toPhoneNumber) => {
  const accountSid = TWILIO_SID;
  const authToken = TWILIO_AUTH_TOKEN;
  const client = new twilio(accountSid, authToken);

  const response = await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: "+12512415850",
    to: `+91${toPhoneNumber}`,
  });

  return response;
};
