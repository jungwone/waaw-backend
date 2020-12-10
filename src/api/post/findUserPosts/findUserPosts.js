import { prisma } from "../../../../prisma/prismaClient";

export default {
  Query: {
    findUserPosts: async (_, args) => {
      console.log("오오오오오오오오오오", args);
      const { id, category = "", take = 0, skip = 20 } = args;

      if (category === "") {
        return prisma.post.findMany({
          skip,
          take,
          where: {
            authorId: id,
          },
          include: {
            author: true,
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
            AND: [{ authorId: id }, { category }],
          },
          include: {
            author: true,
          },
        });
      }
    },
  },
};
