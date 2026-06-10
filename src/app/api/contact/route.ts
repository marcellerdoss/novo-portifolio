import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const TO_EMAIL = 'marcelle.rdoss@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev';

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Configuração do servidor incompleta.' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    const { error: sendError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio] Mensagem de ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
      html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr />
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    if (sendError) {
      console.error('[contact] Resend error:', sendError.name, sendError.message);
      return NextResponse.json({ error: 'Falha ao enviar e-mail.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Caught error:', err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
