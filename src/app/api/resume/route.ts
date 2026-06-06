import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    title: "Arnav Bhatia Resume",
    filename: "Arnav-Bhatia-Resume.pdf",
    view_url: "/api/resume/view",
    download_url: "/api/resume/download",
  });
}
