import { prisma } from "../../../../prisma/prismaClient";

export default {
  Mutation: {
    deleteComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { commentId } = args;
      return prisma.comment.update({
        where: {
          uuid: commentId,
        },
        data: {
          isDeleted: true,
        },
      });
    },
  },
};
