import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { nombre, email, fecha, comentarios } = data;

    // ⚡ Configura tu transportador SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // o el host de tu servidor de correo
      port: 465,
      secure: true,
      auth: {
        user: "marlen@ichdatos.com.ar", // cuenta que envía el mail
        pass: "vthb vomb ypnz ylmw", // contraseña o app password
      },
    });

    // ⚡ Enviar mail
    await transporter.sendMail({
      from: `"Agendamiento ICH" <info@elbalcon.com>`,
      to: ["marlen@ichdatos.com.ar", "francisco@ichdatos.com.ar"], // los dos destinatarios
      subject: `Nueva cita de ${nombre}`,
      text: `Nombre: ${nombre}
Email: ${email}
Fecha: ${fecha}
Comentarios: ${comentarios}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "Error al enviar mail" }, { status: 500 });
  }
}
