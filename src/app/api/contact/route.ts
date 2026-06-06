import { NextResponse } from "next/server";
import { getPool, initDb } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate inputs
    if (!name || name.length < 2 || name.length > 80) {
      return NextResponse.json({ error: "Invalid name (must be 2-80 chars)." }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (!message || message.length < 10 || message.length > 4000) {
      return NextResponse.json({ error: "Invalid message (must be 10-4000 chars)." }, { status: 400 });
    }

    // 1. Initialize DB and save contact submission
    await initDb();
    const pool = getPool();
    await pool.query(
      "INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );
    console.log(`Saved contact request from ${name} (${email}) to Neon PostgreSQL.`);

    // 2. Try to send email notification
    let emailSent = false;
    const smtpHost = process.env.SMTP_HOST;
    const smtpSender = process.env.SMTP_SENDER;
    const recipient = process.env.CONTACT_RECIPIENT;

    if (smtpHost && smtpSender && recipient) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_PORT === "465",
          auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          } : undefined,
          connectionTimeout: 8000,
        });

        await transporter.sendMail({
          from: smtpSender,
          to: recipient,
          subject: `Portfolio contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });
        emailSent = true;
        console.log("Forwarded contact notification email via SMTP.");
      } catch (err) {
        console.error("Email notification sending failed:", err);
      }
    } else {
      console.log("SMTP credentials missing. Skipping email notification.");
    }

    return NextResponse.json({
      message: "Thanks for reaching out. I’ll respond shortly.",
      email_sent: emailSent,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
