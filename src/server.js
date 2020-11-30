import './env';
// import './passport';
import schema from './schema';
import { GraphQLServer } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 4000;
const prisma = new PrismaClient();

const server = new GraphQLServer({
  schema,
  context: () => prisma,
});

server.start({ port: PORT }, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
