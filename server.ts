import dotenv from "dotenv-safe";
dotenv.config();
import { fastify, log } from "./constants";
import autoLoad from "fastify-autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// import { Server, IncomingMessage, ServerResponse } from "http";

fastify.get("/ping", {}, async (request, reply) => {
  return { pong: "PONG!" };
});

// Route behind Authentication
fastify.register(autoLoad, {
  dir: join(__dirname, "routes"),
  dirNameRoutePrefix: false,
});

fastify.addHook('preValidation', async (req, reply, payload) => {

  
    return payload
}))

fastify.get("/restricted", {}, async (request, reply) => {
  return { message: "restricted route hit" };
});

const start = async () => {
  try {
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
    process.exit(1);
  }
};
start();

// TODO ITEMS:
// [X] - Plugins (cors, helmet, cookie parser, ioredis, )
// [X] - Routes
// [X] - Figure out how to deal with mongo connection
// [ ] - Fastify-csrf plugin
// [ ] - Auth / Cookies
// [ ] - Figure out static file serving (Nginx, Caddy, traffic or serve static files with Fastify)
// [ ] - Fastify with Apollog server
// [ ] - Subscriptions
