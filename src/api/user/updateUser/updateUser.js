import { prisma } from "../../../../prisma/prismaClient";

export default {
  Mutation: {
    updateUser: async (_, args, { isAuthenticated, request }) => {
      isAuthenticated(request);
      const { userId, avatar, intro, nickname } = args;

      return prisma.user.update({
        where: {
          uuid: userId,
        },
        data: {
          avatar: avatar === "" ? undefined : avatar,
          intro: intro === "" ? undefined : intro,
          nickname: nickname === "" ? undefined : nickname,
        },
      });
    },
  },
};
