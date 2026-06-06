import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "resume-19-04.pdf");

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Resume file not found.", { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Arnav-Bhatia-Resume.pdf"',
      },
    });
  } catch (error) {
    console.error("Error reading resume PDF:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
