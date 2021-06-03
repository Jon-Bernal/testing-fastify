import dotenv from "dotenv-safe";
dotenv.config();
import { fastify, log } from "./constants";
import autoLoad from "fastify-autoload";
// import { fileURLToPath } from "url";
import { join } from "path";
// import { Server, IncomingMessage, ServerResponse } from "http";
import { ApolloServer } from "apollo-server-fastify";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { ServerContext } from "./serverContext";
import { User } from "./codeGenBE";

fastify.register(autoLoad, {
  dir: join(__dirname, "plugins"),
  // dirNameRoutePrefix: false,
});
// Route behind Authentication
fastify.register(autoLoad, {
  dir: join(__dirname, "routes"),
  dirNameRoutePrefix: false,
});
// const context = async (args: any) => {
//   console.log("args", args);
//   return args;
// };
console.log("top level fastifyf", fastify);
const context = async ({
  request,
  reply,
  connection,
}: // fastify /*redis*/,
ServerContext) => {
  // const db = fastify.mongo.db;
  // console.log("fastify", fastify);
  console.log("connection", connection);
  if (connection) {
    // connection.pubsub = pubsub;
    // return {connection}
  }
  // const token = req?.headers?.authorization ? req?.headers?.authorization?.split(" ")?.[1] : ""
  let user = <User>{};
  try {
    // user = <User>verify(token, process.env.JWT_SECRET_KEY!)
  } catch (err) {
    console.log("err", err);
  }
  // return { request, reply, fastify, db: fastify?.mongo?.db };
  return { request, reply, db: fastify?.mongo?.db };
};

const start = async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context,
      playground: {
        endpoint: "/graphql",
        settings: { "request.credentials": "include" },
      },
    });
    // await server.applyMiddleware({app, cors: false})
    await server.start();
    fastify.register(server.createHandler());
    await fastify.listen(process.env.PORT || 5000);

    const address = fastify.server.address();
    const port = typeof address === "string" ? address : address?.port;
    log.info(`Server started on port ${process.env.PORT}`);
    log.warn("Warning");
    log.err("ERROR!!");
    // throw "Error";
  } catch (err) {
    // server.log.error(err);
    log.err("error: " + err);
    console.log("err", err);
    process.exit(1);
  }
};
start();

// TODO ITEMS:
// [X] - Plugins (cors, helmet, cookie parser, ioredis, )
// [X] - Routes
// [X] - Figure out how to deal with mongo connection
// [x] - Fastify-csrf plugin
// [x] - Auth / Cookies
// [] - Fastify with Apollog server
// [] - Subscriptions
// [] - Figure out static file serving (Nginx, Caddy, traffic or serve static files with Fastify)
