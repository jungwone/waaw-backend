import { prisma } from "../../../../prisma/prismaClient";

export default {
  Query: {
    findUser: async (_, args) => {
      const { uuid } = args;

      return prisma.user.findUnique({
        where: {
          uuid,
        },
      });
    },
  },
};
