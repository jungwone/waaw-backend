import { prisma } from "../../../prismaClient";

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args; // uuid
      const { user } = request;

      const post = await prisma.post.findUnique({
        where: { uuid: postId },
        include: {
          likes: { where: { postId, userId: user.uuid } },
        },
      });

      // like
      if (post.likes.length === 0) {
        await prisma.like.create({
          data: {
            post: { connect: { uuid: postId } },
            user: { connect: { uuid: user.uuid } },
          },
        });

        await prisma.post.update({
          where: { uuid: postId },
          data: { likeCount: post.likeCount + 1 },
        });
        return true;
      }
      // Unlike
      else {
        const like = post.likes[0];

        await prisma.like.delete({
          where: { id: like.id },
        });
      }

      await prisma.post.update({
        where: { uuid: postId },
        data: { likeCount: post.likeCount - 1 },
      });

      return false;
    },
  },
};
