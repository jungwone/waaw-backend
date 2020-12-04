import { prisma } from "../../../../prisma/prismaClient";

export default {
  Mutation: {
    upsertPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, title, content, category, open } = args;
      const { user } = request;
      const post = await prisma.post.findFirst({ where: { id } });
      if (post && post.authorId !== user.id) {
        throw Error("You can't edit this post");
      }

      if (!id) {
        return prisma.post.create({
          data: {
            title,
            content,
            category,
            open,
            author: {
              connect: { id: user.id },
            },
          },
        });
      } else if (id === post.id) {
        return prisma.post.update({
          where: { id },
          data: {
            title,
            content,
            category,
            open,
          },
        });
      } else {
        throw Error("Wrong post");
      }
    },
  },
};
