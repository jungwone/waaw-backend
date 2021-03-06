import { prisma } from "../../prismaClient";

export default {
  Post: {
    totalPostCount: async (parent, _, __) => {
      const { category } = parent;
      return prisma.post.count({
        where: {
          category,
          isDeleted:false,
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
          isDeleted: false,
        },
      });
    },
  },
};
