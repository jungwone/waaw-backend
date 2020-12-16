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
      const { postId, author } = parent;
      const count = await prisma.like.count({
        where: { AND: [{ postId }, { userId: author.uuid }] },
      });
      if (count === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
