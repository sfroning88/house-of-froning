export const PROVIDER_STALE_TIME = 60 * 1000;

export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const USER_ID_COOKIE_NAME = "house-of-froning-id";

export const QUERY_KEYS = {
  user: (userId: string) => ["user", userId] as const,
  spotifySong: () => ["spotify", "song"] as const,
  googleBooks: () => ["google", "books"] as const,
};

export const TRAINER_CARD_IMAGE_PATH = "/images/avatars/trainer.jpg";

export const PRIVACY_DOC_PATH = "lib/docs/PRIVACY.md";
export const RESUME_DOC_PATH = "lib/docs/RESUME.md";

export const SPOTIFY_STALE_TIME = 60 * 30 * 1000;
export const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
export const SPOTIFY_CURRENTLY_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
export const SPOTIFY_LAST_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export const GOOGLE_STALE_TIME = 60 * 60 * 1000;
export const GOOGLE_SHEETS_BASE_URL =
  "https://sheets.googleapis.com/v4/spreadsheets";
export const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
export const GOOGLE_SHEET_RANGE = "BOOKS!A:I";
export const GOOGLE_SHEET_SCOPE =
  "https://www.googleapis.com/auth/spreadsheets.readonly";
export const GOOGLE_BOOKS_API_BASE_URL =
  "https://www.googleapis.com/books/v1/volumes";
export const OPEN_LIBRARY_COVERS_BASE_URL =
  "https://covers.openlibrary.org/b/isbn";

export const DS_TO_WEB_SCALE = 6;
export const DS_PIXEL_WIDTH = 192;
export const DS_PIXEL_HEIGHT = 128;
export const DS_IMAGE_FILE_WIDTH = 1200;
export const DS_IMAGE_FILE_HEIGHT = 800;
export const DS_ASPECT_RATIO = 1.5;
export const DS_VIEWPORT_HEIGHT_RATIO = 0.9;
export const DS_IMAGE_PATH = "/images/ds/bottomscreen.jpg";
export const MOBILE_BREAKPOINT = 768;
export const DS_FRAME_MIN_WIDTH = 280;
export const DS_SCREEN_CENTER_X_RATIO = 0.5;
export const DS_SCREEN_CENTER_Y_RATIO = 0.3125;
export const DS_SCREEN_INNER_WIDTH_RATIO = 0.49;
export const DS_SCREEN_INNER_HEIGHT_RATIO = 0.76;
export const DS_BOTTOM_BAR_HEIGHT_RATIO = 0.24;
export const BOTTOM_BAR_BUTTON_SIZE = 48;
export const DS_MODAL_ZOOM_RATIO = 0.9;

export const MAP_AVATAR_BLINK_TIME = 3 * 1000;
export const MAP_AVATAR_IMAGE_PATH = "/images/avatars/headshot.jpg";
export const MAP_AVATAR_SIZE = 12;

export const LOCAL_MAP_PIXEL_WIDTH = 192;
export const LOCAL_MAP_PIXEL_HEIGHT = 128;
export const LOCAL_MAP_SCALE = 2;
export const LOCAL_ICON_SIZE = 24;
export const LOCAL_MAP_WIDTH = 384;
export const LOCAL_MAP_HEIGHT = 256;

export const CHICAGO_WIDTH = 24;
export const CHICAGO_HEIGHT = 48;
export const CHICAGO_X = 64;
export const CHICAGO_Y = 32;
export const CHICAGO_IMAGE_PATH = "/images/towns/chicago.jpeg";

export const MAP_AVATAR_DEFAULT_X =
  (CHICAGO_X + CHICAGO_WIDTH / 2) * DS_TO_WEB_SCALE;
export const MAP_AVATAR_DEFAULT_Y =
  (CHICAGO_Y + CHICAGO_HEIGHT / 2) * DS_TO_WEB_SCALE;

export const CHICAGO_WARRIORS_BASEBALL_CLUB_X = 20;
export const CHICAGO_WARRIORS_BASEBALL_CLUB_Y = 16;
export const CHICAGO_WARRIORS_BASEBALL_CLUB_IMAGE_PATH =
  "/images/towns/warriors.jpg";

export const SAINT_ALPHONSUS_ACADEMY_X = 100;
export const SAINT_ALPHONSUS_ACADEMY_Y = 20;
export const SAINT_ALPHONSUS_ACADEMY_IMAGE_PATH = "/images/towns/aaca.jpg";

export const SEANS_HOUSE_X = 112;
export const SEANS_HOUSE_Y = 52;
export const SEANS_HOUSE_IMAGE_PATH = "/images/towns/house.jpeg";

export const ROWAN_LABS_X = 152;
export const ROWAN_LABS_Y = 96;
export const ROWAN_LABS_IMAGE_PATH = "/images/towns/rowanlabs.jpg";

export const FOCUS_HEALTHCARE_PARTNERS_X = 156;
export const FOCUS_HEALTHCARE_PARTNERS_Y = 112;
export const FOCUS_HEALTHCARE_PARTNERS_IMAGE_PATH = "/images/towns/focus.jpg";

export const NOTRE_DAME_WIDTH = 24;
export const NOTRE_DAME_HEIGHT = 24;
export const NOTRE_DAME_X = 144;
export const NOTRE_DAME_Y = 64;
export const NOTRE_DAME_IMAGE_PATH = "/images/towns/notredame.jpg";

export const DUNCAN_HALL_X = 8;
export const DUNCAN_HALL_Y = 96;
export const DUNCAN_HALL_IMAGE_PATH = "/images/towns/duncanhall.jpg";

export const ND_LISTENS_X = 160;
export const ND_LISTENS_Y = 96;
export const ND_LISTENS_IMAGE_PATH = "/images/towns/ndlistens.jpg";

export const GOLDEN_DOME_X = 84;
export const GOLDEN_DOME_Y = 8;
export const GOLDEN_DOME_IMAGE_PATH = "/images/towns/goldendome.jpg";

export const GROTTO_X = 60;
export const GROTTO_Y = 40;
export const GROTTO_IMAGE_PATH = "/images/towns/grotto.jpg";

export const ND_CAREERS_COURSE_X = 112;
export const ND_CAREERS_COURSE_Y = 48;
export const ND_CAREERS_COURSE_IMAGE_PATH = "/images/towns/careers.jpg";
