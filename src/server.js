import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import dbPlugin from "./plugins/db";
import fastifyMorgan from "morgan";
import inscriptionRoute from "./routes/concours";
import prismaPlugin from "./plugins/prisma";
import authRoutes from "./routes/auth";
import fastifyJwt from "@fastify/jwt";

dotenv.config();

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});
await app.register(dbPlugin);

// await app.register(prismaPlugin);
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || "changeme",
});
await app.register(inscriptionRoute);
await app.register(authRoutes, { prefix: "/auth" });

app.listen({ port: Number(process.env.PORT) || 3000 }, (err, addr) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${addr}`);
});

// TWH3zQys3Te0Uiwj
