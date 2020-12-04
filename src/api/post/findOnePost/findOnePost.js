import { prisma } from "../../../../prisma/prismaClient";

export default {
  Query: {
    findOnePost: async (_, args) => {
      const { id } = args;
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
        },
      });
      if (!post) {
        throw Error("This post is not exist");
      }

      return prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
        },
      });
    },
  },
};
