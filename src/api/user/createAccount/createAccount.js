import { prisma } from "../../../prismaClient";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { email, name, nickname, bio, avatar = "", loginCode = "" } = args;

      const isExist = await prisma.user.findUnique({
        where: { nickname },
      });

      if (isExist) {
        throw Error("Same user name or email is already exist");
      }

      const user = await prisma.user.create({
        data: {
          email,
          name,
          nickname,
          bio,
          avatar,
          loginCode,
        },
      });
      if (user) {
        return true;
      } else {
        throw Error("Failed to create new user.");
      }
    },
  },
};
