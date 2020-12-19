import { prisma } from "../../../prisma/prismaClient";

export default {
  Comment: {
    user: async (parent, _, __) => {
      const { userId } = parent;
      return prisma.user.findUnique({
        where: {
          uuid: userId,
        },
        select: {
          id: true,
          uuid: true,
          avatar: true,
          nickname: true,
        },
      });
    },
  },
};
