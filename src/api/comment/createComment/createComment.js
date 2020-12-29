import { prisma } from "../../../prismaClient";

export default {
  Mutation: {
    createComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId, content, parentId } = args;
      const { user: userData } = request;

      return prisma.comment.create({
        data: {
          content,
          post: { connect: { uuid: postId } },
          user: { connect: { uuid: userData.uuid } },
        },
      });

      // TODO : 답글 생성
    },
  },
};
