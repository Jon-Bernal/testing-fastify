import { fastify, log } from "../constants";
let fastifyRoutes;
// Auth Routes
export default async function authRoutes(fastify: any, opts: any) {
  const db = fastify.mongo.db;

  fastify.post("/register", {}, async (request: any, reply: any) => {
    // console.log("request :>> ", request);
    // console.log("request.cookies :>> ", request?.cookies);

    const res = await db
      .collection("users")
      .insertOne({ email: "jon@test.com" });
    console.log("res :>> ", res);

    reply.status(200).setCookie("fastify-test").send("added jon@test.com");
    // return { message: "register route hit" };
  });

  fastify.post("/login", {}, async (request: any, reply: any) => {
    // console.log("request :>> ", request);
    // console.log("request.cookies :>> ", request?.cookies);

    const res = await db.collection("users").findOne({ email: "jon@test.com" });

    console.log("res :>> ", res);

    if (res) {
      reply
        .status(200)
        .setCookie("fastify-test")
        .send({ message: "login route hit" });
    } else {
      reply.status(404).clearCookie("fastify-test").send();
    }
    // return { message: "login route hit" };
  });

  fastify.post("/logout", {}, async (request: any, reply: any) => {
    // console.log("request :>> ", request);
    // console.log("request.cookies :>> ", request?.cookies);
    reply.status(200).clearCookie("fastify-test").send("Logged out");

    // return { message: "logout route hit" };
  });
}
