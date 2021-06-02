import { fastify, log } from "../constants";
let fastifyRoutes;
// Auth Routes
export default async function authRoutes(fastify: any, opts: any) {
  fastify.post("/register", {}, async (request: any, reply: any) => {
    console.log("request :>> ", request);
    console.log("request.cookies :>> ", request?.cookies);
    return { message: "register route hit" };
  });

  fastify.post("/login", {}, async (request: any, reply: any) => {
    console.log("request :>> ", request);
    console.log("request.cookies :>> ", request?.cookies);
    reply
      .status(200)
      .setCookie("Test Cookie")
      .send({ message: "login route hit" });
    // return { message: "login route hit" };
  });

  fastify.post("/logout", {}, async (request: any, reply: any) => {
    console.log("request :>> ", request);
    console.log("request.cookies :>> ", request?.cookies);
    return { message: "logout route hit" };
  });
}
