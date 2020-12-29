import { prisma } from "../../../prismaClient";

export default {
  Query: {
    findUser: async (_, args) => {
      const { userId } = args;

      return prisma.user.findFirst({
        where: {
          uuid: userId,
          isDeleted: false,
        },
      });
    },
  },
};
