import "./env";
// import './passport';
import schema from "./schema";
import { GraphQLServer } from "graphql-yoga";

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
  schema,
});

server.start({ port: PORT }, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
