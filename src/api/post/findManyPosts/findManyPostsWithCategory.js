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
            createdAt: "asc",
          },
          include: {
            author: true,
          },
          where: {
            open: true,
          },
        });
      } else {
        return prisma.post.findMany({
          skip,
          take,
          orderBy: {
            createdAt: "asc",
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
