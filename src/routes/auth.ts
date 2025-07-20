import fastifyJwt from "@fastify/jwt";
import fastifyOauth2 from "@fastify/oauth2";

const authorizedMails = [
  "esteban.mansart@gmail.com",
  "chronos7.asso@gmail.com",
];

const authRoutes: FastifyPluginAsync = async (app) => {
  app.post("/logout", async (req, reply) => {
    // Pour le front, on renvoie juste un 200 OK
    return { message: "Logged out" };
  });

  app.get("/oauth/callback", async (req, reply) => {
    const token =
      await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    const userInfo = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token.token.access_token}`,
        },
      }
    ).then((res) => res.json());

    // Vérifie si utilisateur existe ou crée un nouveau
    const user = await app.prisma.user.upsert({
      where: { email: userInfo.email },
      update: { lastLoginAt: new Date() },
      create: {
        email: userInfo.email,
      },
    });

    // Crée et renvoie un token de session
    const sessionToken = app.jwt.sign({
      id: user.id,
      email: user.email,
    });

    if (authorizedMails.includes(user.email)) {
      reply.redirect(`${process.env.CLIENT_URL}/admin?token=${sessionToken}`);
    } else {
      reply.redirect(`${process.env.CLIENT_URL}/admin`);
    }
  });

  app.register(fastifyOauth2, {
    name: "googleOAuth2",
    scope: ["email", "profile"],
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/oauth",
    callbackUri: "http://localhost:3000/auth/oauth/callback",
  });
};
export default authRoutes;
