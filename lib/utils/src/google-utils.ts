import { GoogleSheetBookStatus, GoogleSheetBookData } from "@/lib/types";

export function SheetToBooksData(values: string[][]): GoogleSheetBookData[] {
  if (!values || values.length < 2) {
    return [];
  }
  const rows = values.slice(1);
  return rows
    .filter((row) => row.length > 0 && row[0])
    .map((row) => {
      const firstName = row[1] || "";
      const lastName = row[2] || "";
      const author = `${firstName} ${lastName}`.trim();
      const daysToReadStr = row[6] || "";
      const daysToRead =
        parseInt(daysToReadStr.replace(" Days", "").trim(), 10) || 0;
      const statusStr = (row[3] || "").toLowerCase().trim();
      const status =
        Object.values(GoogleSheetBookStatus).find((s) => s === statusStr) ||
        GoogleSheetBookStatus.INACTIVE;
      return {
        title: row[0] || "",
        author,
        status,
        dateBegan: row[4] || "",
        dateFinished: row[5] || "",
        daysToRead,
        topics: row[7] || "",
        thoughts: row[8] || "",
      };
    });
}

export function CleanGooglePrivateKey(key: string): string {
  return key.replace(/\\n/g, "\n");
}

export function DetermineBookToShow(
  books: GoogleSheetBookData[],
): GoogleSheetBookData | null {
  if (!books || books.length === 0) {
    return null;
  }
  const readingBooks = books.filter(
    (book) => book.status === GoogleSheetBookStatus.READING,
  );
  if (readingBooks.length === 1) {
    return readingBooks[0];
  }
  if (readingBooks.length > 1) {
    return readingBooks[Math.floor(Math.random() * readingBooks.length)];
  }
  const finishedBooks = books.filter(
    (book) => book.status === GoogleSheetBookStatus.FINISHED,
  );
  if (finishedBooks.length > 0) {
    return finishedBooks[Math.floor(Math.random() * finishedBooks.length)];
  }
  const inactiveBooks = books.filter(
    (book) => book.status === GoogleSheetBookStatus.INACTIVE,
  );
  if (inactiveBooks.length > 0) {
    return inactiveBooks[Math.floor(Math.random() * inactiveBooks.length)];
  }
  const orderedBooks = books.filter(
    (book) => book.status === GoogleSheetBookStatus.ORDERED,
  );
  if (orderedBooks.length > 0) {
    return orderedBooks[Math.floor(Math.random() * orderedBooks.length)];
  }
  const needToBuyBooks = books.filter(
    (book) => book.status === GoogleSheetBookStatus.NEED_TO_BUY,
  );
  if (needToBuyBooks.length > 0) {
    return needToBuyBooks[Math.floor(Math.random() * needToBuyBooks.length)];
  }
  return null;
}
