import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

export default fp(async (fastify) => {
  const prisma = new PrismaClient();
  await prisma.$connect();
  fastify.decorate("prisma", prisma);
});
