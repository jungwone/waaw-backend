export default {
  Query: {
    findUser: async (_, args) => {
      console.log('find user arguments : ', args);
      return null;
    },
  },
};
