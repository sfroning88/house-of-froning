import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "app/privacy/PRIVACY.md");
    const content = await readFile(filePath, "utf-8");
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Failed to read privacy policy:", error);
    return NextResponse.json(
      { error: "Failed to read privacy policy -- check developer logs." },
      { status: 500 },
    );
  }
}
