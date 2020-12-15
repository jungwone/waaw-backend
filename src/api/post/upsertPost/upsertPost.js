import { prisma } from "../../../../prisma/prismaClient";

export default {
  Mutation: {
    upsertPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, uuid, title, content, category, open, fileUrl } = args;
      const { user } = request;
      const post = await prisma.post.findFirst({ where: { uuid } });
      if (post && post.authorId !== user.id) {
        throw Error("You can't edit this post");
      }

      if (!uuid) {
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
      } else if (uuid === post.uuid) {
        return prisma.post.update({
          where: { uuid },
          data: {
            title,
            content,
            category,
            open,
            fileUrl,
          },
        });
      } else {
        throw Error("Wrong post");
      }
    },
  },
};
