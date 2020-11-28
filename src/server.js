require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 4000;
const prisma = new PrismaClient();

// const createUser = async () => {
//   const user = await prisma.user.create({
//     data: {
//       email: "test2@test2.com",
//       name: "test2 name2",
//     },
//   });
//   console.log(user);
// };

// // createUser();

const typeDefs = `
    type Query{
        hello: String!
    }
`;

const resolvers = {
  Query: {
    hello: () => "Helloo",
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start({ port: PORT }, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
