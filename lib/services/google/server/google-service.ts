import "server-only";

import { env } from "@packages/config";
import { GoogleSheetBookData } from "@/lib/types";

let cachedBooks: GoogleSheetBookData[] = [];
let bookCacheExpiresAt = 0;

export const GoogleService = {
  async fetchBooksList(): Promise<GoogleSheetBookData[]> {
    if (cachedBooks && Date.now() < bookCacheExpiresAt) {
      return cachedBooks;
    }
    try {
      return [];
    } catch (error) {
      console.error("[Google Sheets] Unexpected error:", error);
      return [];
    }
  },
};
