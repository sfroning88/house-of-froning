"use server";

import { readFile } from "fs/promises";
import { join } from "path";

export async function getPrivacyContent() {
  const filePath = join(process.cwd(), "app/privacy/PRIVACY.md");
  const content = await readFile(filePath, "utf-8");
  return content;
}
