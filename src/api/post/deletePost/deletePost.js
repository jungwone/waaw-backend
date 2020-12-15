import { prisma } from "../../../../prisma/prismaClient";

export default {
  Mutation: {
    deletePost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { uuid } = args;
      return prisma.post.delete({
        where: {
          uuid,
        },
      });
    },
  },
};
