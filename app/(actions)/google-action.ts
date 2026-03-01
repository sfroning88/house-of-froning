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

const fetchBookImageSchema = z.object({
  title: z.string(),
  author: z.string(),
});

export const fetchBookImageAction = createPublicAction(
  fetchBookImageSchema,
  async ({ input }): Promise<string | null> => {
    return await GoogleService.fetchBookImage(input.title, input.author);
  },
);

const fetchBookToShowSchema = z.object({});

export const fetchBookToShowAction = createPublicAction(
  fetchBookToShowSchema,
  async (): Promise<GoogleSheetBookData | null> => {
    return await GoogleService.fetchBookToShow();
  },
);
