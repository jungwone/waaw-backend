import { prisma } from "../../../../prisma/prismaClient";

export default {
  Mutation: {
    upsertPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, title, content, category, open, thumbnail } = args;
      const { user } = request;

      return prisma.post.create({
        data: {
          title,
          content,
          category,
          open,
          thumbnail,
          author: {
            connect: { uuid: user.uuid },
          },
        },
      });
    },
  },
};
