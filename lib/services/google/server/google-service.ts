import "server-only";

import { env } from "@packages/config";
import { GoogleSheetBookData } from "@/lib/types";
import {
  SheetToBooksData,
  CleanGooglePrivateKey,
  DetermineBookToShow,
} from "@/lib/utils";
import {
  GOOGLE_STALE_TIME,
  GOOGLE_SHEETS_BASE_URL,
  GOOGLE_TOKEN_URL,
  GOOGLE_SHEET_RANGE,
  GOOGLE_SHEET_SCOPE,
  GOOGLE_BOOKS_API_BASE_URL,
  OPEN_LIBRARY_COVERS_BASE_URL,
} from "@/lib/constants";

let cachedBooks: GoogleSheetBookData[] = [];
let bookCacheExpiresAt = 0;
let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;
let cachedBookToShow: GoogleSheetBookData | null = null;
let bookToShowCacheExpiresAt = 0;

export const GoogleService = {
  async signJWT(
    privateKey: string,
    serviceAccountEmail: string,
  ): Promise<string> {
    const header = {
      alg: "RS256",
      typ: "JWT",
    };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: serviceAccountEmail,
      scope: GOOGLE_SHEET_SCOPE,
      aud: GOOGLE_TOKEN_URL,
      iat: now,
      exp: now + 3600,
    };
    const encodedHeader = btoa(JSON.stringify(header))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    const encodedPayload = btoa(JSON.stringify(payload))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const keyData = CleanGooglePrivateKey(privateKey);
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = keyData
      .replace(pemHeader, "")
      .replace(pemFooter, "")
      .replace(/\s/g, "");
    const derKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));
    const key = await crypto.subtle.importKey(
      "pkcs8",
      derKey,
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
      },
      false,
      ["sign"],
    );
    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      new TextEncoder().encode(signatureInput),
    );
    const encodedSignature = btoa(
      String.fromCharCode(...new Uint8Array(signature)),
    )
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    return `${signatureInput}.${encodedSignature}`;
  },

  async getAccessToken(): Promise<string | null> {
    if (cachedAccessToken && Date.now() < tokenExpiresAt) {
      return cachedAccessToken;
    }
    const serviceAccountEmail = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = env.GOOGLE_PRIVATE_KEY;
    if (!serviceAccountEmail || !privateKey) {
      return null;
    }
    try {
      const jwt = await this.signJWT(privateKey, serviceAccountEmail);
      const response = await fetch(GOOGLE_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: jwt,
        }),
      });
      if (!response.ok) {
        console.error(
          "[Google Sheets] Token exchange failed:",
          response.statusText,
        );
        return null;
      }
      const data = (await response.json()) as {
        access_token: string;
        expires_in: number;
      };
      cachedAccessToken = data.access_token;
      tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
      return cachedAccessToken;
    } catch (error) {
      console.error("[Google Sheets] Token exchange error:", error);
      return null;
    }
  },

  async fetchBooksList(): Promise<GoogleSheetBookData[]> {
    if (cachedBooks.length > 0 && Date.now() < bookCacheExpiresAt) {
      return cachedBooks;
    }
    const accessToken = await this.getAccessToken();
    if (!accessToken) {
      return [];
    }
    const sheetId = env.GOOGLE_SHEET_ID;
    if (!sheetId) {
      return [];
    }
    try {
      const encodedRange = encodeURIComponent(GOOGLE_SHEET_RANGE);
      const url = `${GOOGLE_SHEETS_BASE_URL}/${sheetId}/values/${encodedRange}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "[Google Sheets] Fetch failed:",
          response.statusText,
          errorText,
        );
        return [];
      }
      const data = (await response.json()) as {
        values: string[][];
      };
      const books = SheetToBooksData(data.values || []);
      cachedBooks = books;
      bookCacheExpiresAt = Date.now() + GOOGLE_STALE_TIME;
      return books;
    } catch (error) {
      console.error("[Google Sheets] Unexpected error:", error);
      return [];
    }
  },

  async fetchBookImage(title: string, author: string): Promise<string | null> {
    const apiKey = env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey) {
      return null;
    }
    try {
      const query = `intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`;
      const url = `${GOOGLE_BOOKS_API_BASE_URL}?q=${query}&key=${apiKey}&maxResults=1`;
      const response = await fetch(url);
      if (!response.ok) {
        console.error("[Google Books] Fetch failed:", response.statusText);
        return null;
      }
      const data = (await response.json()) as {
        items?: Array<{
          volumeInfo?: {
            imageLinks?: {
              thumbnail?: string;
              large?: string;
              extraLarge?: string;
            };
            industryIdentifiers?: Array<{
              type: string;
              identifier: string;
            }>;
          };
        }>;
      };
      if (data.items?.[0]?.volumeInfo?.imageLinks) {
        const imageLinks = data.items[0].volumeInfo.imageLinks;
        return (
          imageLinks.extraLarge ||
          imageLinks.large ||
          imageLinks.thumbnail ||
          null
        );
      }
      const isbn = data.items?.[0]?.volumeInfo?.industryIdentifiers?.find(
        (id) => id.type === "ISBN_13" || id.type === "ISBN_10",
      )?.identifier;
      if (isbn) {
        return `${OPEN_LIBRARY_COVERS_BASE_URL}/${isbn}-L.jpg`;
      }
      return null;
    } catch (error) {
      console.error("[Google Books] Unexpected error:", error);
      return null;
    }
  },

  async fetchBookToShow(): Promise<GoogleSheetBookData | null> {
    if (cachedBookToShow && Date.now() < bookToShowCacheExpiresAt) {
      return cachedBookToShow;
    }
    const books = await this.fetchBooksList();
    if (books.length === 0) {
      return null;
    }
    const bookToShow = DetermineBookToShow(books);
    if (!bookToShow) {
      return null;
    }
    const coverImageUrl = await this.fetchBookImage(
      bookToShow.title,
      bookToShow.author,
    );
    const bookWithCover: GoogleSheetBookData = {
      ...bookToShow,
      coverImageUrl,
    };
    cachedBookToShow = bookWithCover;
    bookToShowCacheExpiresAt = Date.now() + GOOGLE_STALE_TIME;
    return bookWithCover;
  },
};
