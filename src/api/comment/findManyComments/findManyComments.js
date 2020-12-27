import { prisma } from "../../../../prisma/prismaClient";

export default {
  Query: {
    findManyComments: async (_, args) => {
      const { postId, skip = 0, take = 10 } = args;
      return prisma.comment.findMany({
        skip,
        take,
        where: {
          postId,
          isDeleted: false,
        },
        include: {
          user: true,
        },
      });
    },
  },
};
