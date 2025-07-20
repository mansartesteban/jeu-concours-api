import fp from "fastify-plugin";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export default fp(async (app) => {
  app.decorate("prisma", prisma);
});
