import { NextResponse } from "next/server";
import { getPool, initDb } from "@/lib/db";

// Helper to verify passcode auth
function checkAuth(request: Request): boolean {
  const adminPasscode = process.env.ADMIN_PASSCODE || "admin";
  const { searchParams } = new URL(request.url);
  const passcodeQuery = searchParams.get("passcode");
  const passcodeHeader = request.headers.get("x-admin-passcode");

  return passcodeQuery === adminPasscode || passcodeHeader === adminPasscode;
}

export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initDb();
    const pool = getPool();
    const result = await pool.query(
      "SELECT id, name, email, message, created_at FROM contact_submissions ORDER BY created_at DESC"
    );
    return NextResponse.json({ contacts: result.rows });
  } catch (error) {
    console.error("Failed to query database contacts:", error);
    return NextResponse.json({ error: "Failed to query database" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required to delete." }, { status: 400 });
    }

    const pool = getPool();
    await pool.query("DELETE FROM contact_submissions WHERE id = $1", [parseInt(id)]);
    return NextResponse.json({ message: "Contact submission deleted successfully." });
  } catch (error) {
    console.error("Failed to delete contact submission:", error);
    return NextResponse.json({ error: "Failed to delete item." }, { status: 500 });
  }
}
