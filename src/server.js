import "./env";
import "./passport";
import schema from "./schema";
import { GraphQLServer } from "graphql-yoga";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middleware/middleware";

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
