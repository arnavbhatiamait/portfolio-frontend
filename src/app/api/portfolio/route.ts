import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Arnav Bhatia",
    role: "AI/ML Engineer | Generative AI Developer | Full Stack Developer",
    location: "India",
    email: "arnavbhatiamait@gmail.com",
    summary:
      "AI/ML Engineer and Full Stack Developer focused on Generative AI, Deep Learning, automation systems, and scalable cloud infrastructure.",
    github: "https://github.com/arnavbhatiamait",
    linkedin: "https://www.linkedin.com/in/arnav-bhatia-77500425a/",
    hugging_face: "https://huggingface.co/spaces/Arnavbhatia/Food_Vision",
  });
}
