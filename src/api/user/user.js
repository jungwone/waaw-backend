import { prisma } from "../../../prisma/prismaClient";

export default {
  User: {
    postCount: async (parent, _, __) => {
      const { userId } = parent;
      return prisma.post.count({
        where: {
          authorId: userId,
          isDeleted: false,
        },
      });
    },
  },
};
