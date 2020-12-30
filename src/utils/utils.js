import sendgrid from "@sendgrid/mail";
import jwt from "jsonwebtoken";

export const sendMailForLogin = (emailAddress, loginCode) => {
  const email = {
    from: "prsjb77@gmail.com",
    to: emailAddress,
    subject: "글의 집 로그인 코드입니다 ",
    html: `로그인 코드는 굵게 표시된 부분입니다.<br/> <strong>${loginCode}</strong><br/> 복사 붙여넣기를 추천드립니다 :)`,
  };

  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  return sendgrid.send(email);
};

export const generateToken = (uuid) => {
  return jwt.sign({ uuid }, process.env.JWT_SECRET);
};

export const splitFileNameAndExt = (fileName) => {
  const dotIndex = fileName.lastIndexOf(".");
  const fileExt = fileName.substring(dotIndex);
  const pureFileName = fileName.substring(0, dotIndex).replace(/ /g, "");

  return {
    fileExt,
    pureFileName,
  };
};

export const changeFileNameToUpload = (fileName) => {
  const { fileExt, pureFileName } = splitFileNameAndExt(fileName.toLowerCase());
  const date = Date.now().toString();
  const randomString = Math.random().toString(35).substring(2, 10);
  const newFileName = `${date}-${pureFileName}-${randomString}${fileExt}`;
  return newFileName;
};

export const getLastWeekDate = () => {
  let currentDate = new Date();
  let days = currentDate.getDate();
  currentDate.setDate(days - 7);
  return currentDate;
};
