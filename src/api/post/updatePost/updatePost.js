import { prisma } from "../../../prismaClient";

export default {
  Mutation: {
    updatePost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId, title, content, category, open, thumbnail } = args;

      return prisma.post.update({
        where: {
          uuid: postId,
        },
        data: {
          title,
          content,
          category,
          open,
          thumbnail,
        },
      });
    },
  },
};
