import { ServerContext } from "serverContext";
import { QueryResolvers, User } from "../../codeGenBE";

interface UserResolvers {
  Query: QueryResolvers;
}
export const userResolvers: UserResolvers = {
  Query: {
    getUser: async (
      _: any,
      { email },
      { db }: ServerContext,
      ____: any
    ): Promise<User> => {
      try {
        if (!email) throw "no email provided";
        // const { db } = fastify.mongo.db;
        // console.log("db", db);
        // console.log("fastify", fastify);
        const user = await db.collection("users").findOne({ email });
        // console.log("user", user);
        // return { id: "mongoId", email: "yo@yo.com" };
        return { id: user._id, email: user.email };
      } catch (err) {
        console.log("err", err);
        throw new Error(`${err}`);
      }
    },
  },
};
