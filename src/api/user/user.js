import { prisma } from "../../prismaClient";

export default {
  User: {
    postCount: async (parent, _, __) => {
      const { uuid } = parent;

      return prisma.post.count({
        where: {
          authorId: uuid,
          isDeleted: false,
        },
      });
    },
  },
};
