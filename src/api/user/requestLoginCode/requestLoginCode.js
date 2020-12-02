import { prisma } from "../../../../prisma/prismaClient";
import { v4 as uuidv4 } from "uuid";
import { sendMailForLogin } from "../../../utils/utils";

export default {
  Mutation: {
    requestLoginCode: async (_, args) => {
      const { email } = args;
      const loginCode = uuidv4();

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
