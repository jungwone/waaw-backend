import { prisma } from "../../../../prisma/prismaClient";

export default {
  Query: {
    findManyPostsWithCategory: async (_, args) => {
      const { category = "", take = 0, skip = 20 } = args;

      if (category === "") {
        return prisma.post.findMany({
          skip,
          take,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            author: {
              select: {
                id: true,
                uuid: true,
                nickname: true,
                avatar: true,
                intro: true,
              },
            },
          },
          where: {
            open: true,
            isDeleted: false,
          },
        });
      } else {
        return prisma.post.findMany({
          skip,
          take,
          orderBy: {
            createdAt: "desc",
          },
          where: {
            category: { equals: category },
            open: true,
          },
          include: {
            author: true,
          },
        });
      }
    },
  },
};
