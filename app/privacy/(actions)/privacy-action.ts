"use server";

import { z } from "zod";
import { createPublicAction } from "@lib/api/server/action-guards";
import { readFile } from "fs/promises";
import { join } from "path";

const getPrivacyContentSchema = z.object({});

export const getPrivacyContent = createPublicAction(
  getPrivacyContentSchema,
  async () => {
    const filePath = join(process.cwd(), "app/privacy/PRIVACY.md");
    const content = await readFile(filePath, "utf-8");
    return content;
  },
);
