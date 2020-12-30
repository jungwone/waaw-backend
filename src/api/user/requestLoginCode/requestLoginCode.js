import { prisma } from "../../../prismaClient";
import { v4 as uuidv4 } from "uuid";
import { sendMailForLogin } from "../../../utils/utils";

export default {
  Mutation: {
    requestLoginCode: async (_, args) => {
      const { email } = args;
      const loginCode = uuidv4();

      const isSignedUp = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!isSignedUp) {
        throw Error("해당 메일로 가입된 유저가 없습니다.");
      }

      try {
        await sendMailForLogin(email, loginCode);
        await prisma.user.update({
          where: { email },
          data: {
            loginCode,
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
