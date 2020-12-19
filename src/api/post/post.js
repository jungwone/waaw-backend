import { prisma } from "../../../prisma/prismaClient";

export default {
  Post: {
    likeCount: async (parent, _, __) => {
      return prisma.like.count({
        where: {
          postId: parent.uuid,
        },
      });
    },
    isLiked: async (parent, _, __) => {
      const { uuid, author } = parent;
      const count = await prisma.like.count({
        where: { AND: [{ postId: uuid }, { userId: author.uuid }] },
      });
      if (count === 1) {
        return true;
      } else {
        return false;
      }
    },
    commentCount: async (parent, _, __) => {
      return prisma.comment.count({
        where: {
          postId: parent.uuid,
        },
      });
    },
  },
};
