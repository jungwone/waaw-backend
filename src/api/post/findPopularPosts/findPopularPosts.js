import { prisma } from "../../../../prisma/prismaClient";
import { getLastWeekDate } from "../../../utils/utils";

export default {
  Query: {
    findPopularPosts: async (_, args) => {
      const { take = 0, skip = 20 } = args;

      return prisma.post.findMany({
        skip,
        take,
        orderBy: [{ likeCount: "desc" }, { createdAt: "desc" }],
        include: {
          author: {
            select: {
              id: true,
              uuid: true,
              nickname: true,
            },
          },
        },
        where: {
          open: true,
          createdAt: {
            gte: getLastWeekDate(),
          },
        },
      });
    },
  },
};
