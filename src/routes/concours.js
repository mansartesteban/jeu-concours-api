import { z } from "zod";
import { sendConfirmationEmail } from "../utils/mails/jeu-concours.js";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

export default async function inscriptionRoute(app) {
  const schema = z
    .object({
      nom: z.string().min(1).optional(),
      prenom: z.string().min(1).optional(),
      ville: z.string().min(1).optional(),
      email: z.string().email().optional(),
      pseudo: z.string().min(1).optional(),
    })
    .refine((data) => data.nom && data.prenom && data.email, {
      message: "Données incomplètes : formulaire requis",
    });

  app.post("/inscription", async (request, reply) => {
    const parsed = schema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({ message: parsed.error.issues[0].message });
    }

    const data = parsed.data;

    try {
      const existingEntrant = await app.prisma.Entrant.findFirst({
        where: {
          OR: [data.email ? { email: data.email } : undefined].filter(Boolean),
        },
      });

      if (existingEntrant) {
        return reply.code(409).send({ message: "Utilisateur déjà inscrit" });
      }

      await app.prisma.Entrant.create({
        data: {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          ville: data.ville,
          instagramHandle: data.pseudo,
        },
      });

      let res = await sendConfirmationEmail(
        data.email,
        data.prenom || data.nom || data.pseudo
      );

      return reply.send({ success: true });
    } catch (err) {
      console.error(err);
      return reply.code(500).send({ message: "Erreur serveur" });
    }
  });

  app.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  app.get(
    "/admin/entrants",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      try {
        const entrants = await app.prisma.Entrant.findMany({
          orderBy: { createdAt: "desc" },
        });
        return reply.send(
          entrants.map(({ nom, prenom, instagramHandle, id }) => ({
            id,
            firstname: prenom,
            lastname: nom,
            pseudo: instagramHandle,
          }))
        );
      } catch (err) {
        console.error(err);
        return reply.code(500).send({ message: "Erreur serveur" });
      }
    }
  );

  // app.get("/test", () => {
  //   async function main() {
  //     const TOTAL = 50;

  //     for (let i = 0; i < TOTAL; i++) {
  //       const usePseudo = Math.random() > 0.5;

  //       await app.prisma.Entrant.create({
  //         data: {
  //           prenom: faker.person.firstName(),
  //           nom: faker.person.lastName(),
  //           instagramHandle: usePseudo ? faker.internet.userName() : null,
  //           email: faker.internet.email(),
  //           createdAt: faker.date.past(),
  //         },
  //       });
  //     }

  //     console.log(`✅ ${TOTAL} utilisateurs insérés`);
  //   }

  //   main()
  //     .catch((e) => {
  //       console.error(e);
  //       process.exit(1);
  //     })
  //     .finally(() => {});
  // });
}
