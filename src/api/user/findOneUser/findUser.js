import { prisma } from "../../../../prisma/prismaClient";

export default {
  Query: {
    findUser: async (_, args) => {
      const { id } = args;

      return prisma.user.findUnique({
        where: {
          id,
        },
      });
    },
  },
};
