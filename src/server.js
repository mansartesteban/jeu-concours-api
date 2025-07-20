import "./env.js";

import Fastify from "fastify";
import cors from "@fastify/cors";
import inscriptionRoute from "./routes/concours.js";
import dbPlugin from "./plugins/db.js";
import authRoutes from "./routes/auth.js";
import fastifyJwt from "@fastify/jwt";

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
const PORT = process.env.PORT || 3000;

app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${addr}`);
});

// TWH3zQys3Te0Uiwj
