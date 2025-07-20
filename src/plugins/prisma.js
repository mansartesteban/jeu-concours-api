import fp from "fastify-plugin";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

export default fp(async (fastify) => {
  const prisma = new PrismaClient();
  await prisma.$connect();
  fastify.decorate("prisma", prisma);
});
