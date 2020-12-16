import { prisma } from "../../../../prisma/prismaClient";

export default {
  Query: {
    findOnePost: async (_, args) => {
      const { uuid } = args;
      const post = await prisma.post.findUnique({
        where: {
          uuid,
        },
        select: {
          id: true,
          uuid: true,
          title: true,
          content: true,
          fileUrl: true,
          createdAt: true,
          author: {
            select: {
              uuid: true,
              nickname: true,
              avatar: true,
            },
          },
          likes: {
            select: {
              user: true,
            },
          },
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
