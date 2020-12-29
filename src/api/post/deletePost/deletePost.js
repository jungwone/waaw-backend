import { prisma } from "../../../prismaClient";

export default {
  Mutation: {
    deletePost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args;
      return prisma.post.update({
        where: {
          uuid: postId,
        },
        data: {
          isDeleted: true,
        },
      });
    },
  },
};
