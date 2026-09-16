"use server";

import { z } from "zod";
import { createPublicAction } from "@lib/api/server/action-guards";
import { readFile } from "fs/promises";
import { join } from "path";

const getResumeContentSchema = z.object({});

export const getResumeContentAction = createPublicAction(
  getResumeContentSchema,
  async () => {
    const filePath = join(process.cwd(), "lib/docs", "RESUME.md");
    const content = await readFile(filePath, "utf-8");
    return content;
  },
);
