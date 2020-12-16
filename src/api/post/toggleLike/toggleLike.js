import { prisma } from "../../../../prisma/prismaClient";

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args; // uuid
      const { user: userData } = request;
      const option = {
        AND: [{}, {}],
      };

      const check = await prisma.like.findMany({
        where: {
          AND: [{ postId }, { userId: userData.uuid }],
        },
      });

      console.log(" 있나?", check);

      // 좋아요가 처음일 때
      if (check.length === 0) {
        console.log("이런! 좋아요가 처음이군요?");
        const response = await prisma.like.create({
          data: {
            post: {
              connect: { uuid: postId },
            },
            user: {
              connect: { uuid: userData.uuid },
            },
          },
        });
        console.log(response);
      } else {
        console.log("이미 좋아요를 하셨군요?");
        const like = check[0];
        const result = await prisma.like.delete({
          where: {
            id: like.id,
          },
        });

        console.log("삭제 결과 : ", result);
      }

      // 좋아요 취소할 때

      return true;
    },
  },
};
