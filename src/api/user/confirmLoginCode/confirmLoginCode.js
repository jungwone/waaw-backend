import { generateToken } from "../../../utils/utils";
import { prisma } from "../../../prismaClient";

export default {
  Mutation: {
    confirmLoginCode: async (_, args) => {
      const { email, loginCode } = args;
      const user = await prisma.user.findUnique({ where: { email } });

      // 해당 이메일로 가입된 유저가 없음
      if (!user) {
        throw Error("No user matches to your email");
      } else if (user && user.loginCode === loginCode) {
        await prisma.user.update({
          where: { email },
          data: { loginCode: "" },
        });

        const token = generateToken(user.uuid);
        const myInfo = {
          token,
          id: user.id,
          uuid: user.uuid,
          avatar: user.avatar,
        };

        return myInfo;
      } else {
        throw Error("Check your login code again.");
      }
    },
  },
};
