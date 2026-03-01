"use server";

import { z } from "zod";
import { createPublicAction } from "@lib/api/server/action-guards";
import { readFile } from "fs/promises";
import { join } from "path";
import { RESUME_DOC_PATH } from "@/lib/constants";

const getResumeContentSchema = z.object({});

export const getResumeContentAction = createPublicAction(
  getResumeContentSchema,
  async () => {
    const filePath = join(process.cwd(), RESUME_DOC_PATH);
    const content = await readFile(filePath, "utf-8");
    return content;
  },
);
