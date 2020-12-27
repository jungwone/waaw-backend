import { prisma } from "../../../../prisma/prismaClient";

export default {
  Query: {
    findUser: async (_, args) => {
      const { uuid } = args;

      return prisma.user.findFirst({
        where: {
          uuid,
          isDeleted: false,
        },
      });
    },
  },
};
