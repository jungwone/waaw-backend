import { prisma } from "../../../prismaClient";

export default {
  Mutation: {
    updateUser: async (_, args, { isAuthenticated, request }) => {
      isAuthenticated(request);
      const { userId, avatar, intro, nickname } = args;

      const check = await prisma.user.findUnique({
        where: {
          nickname,
        },
      });

      if (check && check.uuid !== userId) {
        throw Error("이미 존재하는 닉네임입니다.");
      }

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
