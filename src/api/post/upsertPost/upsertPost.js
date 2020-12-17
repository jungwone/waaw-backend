import { prisma } from "../../../../prisma/prismaClient";

export default {
  Mutation: {
    upsertPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, title, content, category, open, fileUrl } = args;
      const { user } = request;
      // const post = await prisma.post.findFirst({ where: { uuid } });
      // if (post && post.authorId !== user.uuid) {
      //   throw Error("You can't edit this post");
      // }
      return prisma.post.create({
        data: {
          title,
          content,
          category,
          open,
          fileUrl,
          author: {
            connect: { uuid: user.uuid },
          },
        },
      });
    },
  },
};
