export const QUERY_KEYS = {
  user: (userId: string) => ["user", userId] as const,
  spotifySong: () => ["spotify", "song"] as const,
  googleBooks: () => ["google", "books"] as const,
};
