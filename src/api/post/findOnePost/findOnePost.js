import { prisma } from "../../../../prisma/prismaClient";

export default {
  Query: {
    findOnePost: async (_, args) => {
      const { uuid } = args;
      const post = await prisma.post.findUnique({
        where: {
          uuid,
        },
        include: {
          author: true,
        },
      });
      if (!post) {
        throw Error("This post is not exist");
      } else {
        return post;
      }
    },
  },
};
