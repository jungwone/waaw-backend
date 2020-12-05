import { prisma } from "../../../../prisma/prismaClient";

export default {
  Mutation: {
    deletePost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      return prisma.post.delete({
        where: {
          id,
        },
      });
    },
  },
};
