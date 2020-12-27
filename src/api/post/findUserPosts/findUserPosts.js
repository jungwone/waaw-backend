import { prisma } from "../../../../prisma/prismaClient";

export default {
  Query: {
    findUserPosts: async (_, args) => {
      const { id, uuid, category = "", take = 0, skip = 20 } = args;

      if (category === "") {
        return prisma.post.findMany({
          skip,
          take,
          where: {
            authorId: uuid,
            isDeleted: false,
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
            AND: [{ authorId: uuid }, { category }],
          },
          include: {
            author: true,
          },
        });
      }
    },
  },
};
