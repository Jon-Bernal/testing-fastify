import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import fastifyLog from "fastify-log";
import fastifyCors from "fastify-cors";

interface OurFastifyInstance extends FastifyInstance {
  logger?: {
    info: (arg: string) => void;
    warn: (arg: string) => void;
    error: (arg: string) => void;
  };
}

export const fastify: OurFastifyInstance = Fastify();

//! Make sure to change these for our production app
fastify.register(fastifyCors, {
  origin: true,
});

fastify.register(fastifyLog, {
  allInOne: true,
  timeFormat: "MM/dd/YY-HH:mm:ss ",
  info: "#58a6ff",
  warn: "#d9910b",
  error: "#fc7970",
});

export const log = {
  info: (arg: string) => fastify?.logger?.info(arg),
  warn: (arg: string) => fastify?.logger?.warn(arg),
  err: (arg: string) => fastify?.logger?.error(arg),
};
