import fastifyPlugin from "fastify-plugin";

async function authorization(fastify: any, opts: any) {
  const { httpErrors, config } = fastify;

  fastify.decorateRequest("user", null);

  fastify.decorate("authorize", authorize);
  async function authorize(req: any, reply: any) {
    const name = req?.cookies?.name;

    if (!name) {
      throw fastify.httpErrors.unauthorized("Missing cookie");
    }
  }
}
