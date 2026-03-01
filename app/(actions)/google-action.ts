"use server";

import { z } from "zod";
import { createPublicAction } from "@/lib/api/server/action-guards";
import { GoogleService } from "@/lib/services/google/server/google-service";
import { GoogleSheetBookData } from "@/lib/types";

const fetchBooksListSchema = z.object({});

export const fetchBooksListAction = createPublicAction(
  fetchBooksListSchema,
  async (): Promise<GoogleSheetBookData[]> => {
    return await GoogleService.fetchBooksList();
  },
);
