import { prisma } from "../../../prismaClient";

export default {
  Mutation: {
    checkNickname: async (_, args) => {
      const { nickname } = args;
      const user = await prisma.user.findUnique({
        where: {
          nickname,
        },
      });

      if (user) {
        // 사용할 수 없음
        return false;
      } else {
        // 사용할 수 있음
        return true;
      }
    },
  },
};
