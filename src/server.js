import "./env";
import "./passport";
import schema from "./schema";
import { GraphQLServer } from "graphql-yoga";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middleware/middleware";
import { uploadController, uploadMiddleware } from "./utils/upload";
import cors from "cors";

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(cors());
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);

server.start({ port: PORT, bodyParserOptions: { limit: "5mb" } }, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
