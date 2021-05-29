import { fastify, log } from "./constants";

// import { Server, IncomingMessage, ServerResponse } from "http";

fastify.get("/ping", {}, async (request, reply) => {
  return { pong: "it worked!" };
});

const start = async () => {
  try {
    await fastify.listen(3000);

    const address = fastify.server.address();
    const port = typeof address === "string" ? address : address?.port;
    log.info("Server started on port 3000");
    log.warn("Warning");
    log.err("ERROR!!");
    // throw "Error";
  } catch (err) {
    // server.log.error(err);
    log.err("this is an error text");
    process.exit(1);
  }
};
start();
