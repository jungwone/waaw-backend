import { prisma } from '../../../../prisma/prismaClient';

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const {
        email,
        name,
        nickname,
        bio,
        avatar = '',
        loginSecret = '',
      } = args;

      const isExist = await prisma.user.findUnique({
        where: { nickname },
      });
      console.log('존재하는가? ', isExist);
      if (isExist) {
        throw Error('Same user name or email is already exist');
      }

      const user = await prisma.user.create({
        data: {
          email,
          name,
          nickname,
          bio,
          avatar,
          loginSecret,
        },
      });
      if (user) {
        console.log(user);
        return true;
      } else {
        throw Error('Failed to create new user.');
      }
    },
  },
};
