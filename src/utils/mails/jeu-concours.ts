import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(to, pseudo = "participant") {
  try {
    return await resend.emails.send({
      from: process.env.MAIL_FROM,
      to,
      subject: "Confirmation d'inscription au jeu concours de Chronos7",
      html: `<div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 40px 20px;">
  <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center;">

    <img src="https://i.ibb.co/Df3S1856/chronos7-icon-64.png" alt="Logo Chronos7" style="max-width: 120px; margin-bottom: 20px;" />

    <h2 style="color: #222;">Merci pour ta participation, <span style="color: #8e44ad;">${pseudo}</span> !</h2>

    <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 20px;">
      Ton inscription au <strong>jeu concours de Chronos7</strong> a bien été prise en compte !
    </p>

    <p style="font-size: 16px; line-height: 1.6; color: #333;">
      Voici ce que tu pourrais remporter :
    </p>

    <ul style="text-align: left; max-width: 400px; margin: 0 auto 20px; color: #444; font-size: 15px; line-height: 1.6;">
      <li>📸 Un shooting photo offert dans un rayon de 30 km autour de Beauvais</li>
      <li>🎬 Une participation en tant que public à un de nos futurs tournages</li>
      <li>🎭 Une participation en tant que figurant dans un de nos futurs tournages</li>
      <li>🖼️ Une photo dédicacée de l'équipe</li>
    </ul>

    <p style="font-size: 16px; color: #333;">
      Le tirage au sort aura lieu le <strong>10 août 2025 à 18h00</strong><br />
      📺 En live sur <a href="https://www.instagram.com/chronos7_asso/" style="color: #8e44ad;">Instagram</a> et Tiktok !<br />
      Sois présent(e) si tu veux vivre l’instant avec nous !
    </p>

    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Pas dispo ce jour-là ? Pas de panique, nous t’enverrons un message si tu es tiré(e) au sort 😉<br />
      N’oublie pas de nous suivre ici :<br />
      👉 <a href="https://www.instagram.com/chronos7_asso/" style="color: #8e44ad;">@chronos7_asso</a>
    </p>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

    <p style="font-size: 13px; color: #999;">
      Si tu souhaites modifier tes informations, envoie-nous un message sur Instagram ou contacte-nous par mail à<br />
      <a href="mailto:chronos7.asso@gmail.com" style="color: #8e44ad;">chronos7.asso@gmail.com</a><br />
      (ne réponds pas à cet e-mail automatique)
    </p>
  </div>
</div>`,
    });
  } catch (err) {
    console.error("Erreur Resend :", err);
    throw err;
  }
}
