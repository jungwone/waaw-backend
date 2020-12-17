import { prisma } from "../../../../prisma/prismaClient";

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args; // uuid
      const { user: userData } = request;

      const check = await prisma.like.findMany({
        where: {
          AND: [{ postId }, { userId: userData.uuid }],
        },
      });

      if (check.length === 0) {
        await prisma.like.create({
          data: {
            post: {
              connect: { uuid: postId },
            },
            user: {
              connect: { uuid: userData.uuid },
            },
          },
        });
        return true;
      } else {
        const like = check[0];
        await prisma.like.delete({
          where: {
            id: like.id,
          },
        });
      }

      return false;
    },
  },
};
