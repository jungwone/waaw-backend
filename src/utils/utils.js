import sendgrid from "@sendgrid/mail";
import jwt from "jsonwebtoken";

export const sendMailForLogin = (emailAddress, loginCode) => {
  const email = {
    from: "prsjb77@gmail.com",
    to: emailAddress,
    subject: "🙄 Login Code 🙄",
    html: `Hello Your login code is <strong>${loginCode}</strong><br/> Copy and paste to login`,
  };

  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  return sendgrid.send(email);
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const changeFileNameToUpload = (fileName) => {
  const dotIndex = fileName.lastIndexOf(".");
  const fileExt = fileName.substring(dotIndex);
  const pureFileName = fileName.substring(0, dotIndex).replace(/ /g, "");
  const date = Date.now().toString();
  const randomString = Math.random().toString(35).substring(2, 17);
  const newFileName = `${date}-${pureFileName}-${randomString}${fileExt}`;
  return newFileName;
};
