import { test, expect, type Page } from "@playwright/test";

const COOKIE_BANNER_DISMISSED_KEY = "house-of-froning-cookie-banner-dismissed";

async function preparePage(page: Page) {
  await page.addInitScript((key) => {
    localStorage.setItem(key, "true");
  }, COOKIE_BANNER_DISMISSED_KEY);
  await page.goto("/");
  await expect(page).toHaveTitle(/House of Froning/);
}

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test("home page renders the town map", async ({ page }) => {
  const map = page.locator(".border-iceberg-medium").first();
  await expect(map).toBeVisible();
  await expect(map.getByRole("button")).toHaveCount(2);
});

test("bottom bar shows main action buttons", async ({ page }) => {
  await expect(
    page.getByRole("button", { name: "Trainer Card" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Spotify Song" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Google Books" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "GitHub" })).toBeVisible();
  await expect(page.getByRole("link", { name: "LinkedIn" })).toBeVisible();
});

test("trainer card modal opens and closes", async ({ page }) => {
  await page.getByRole("button", { name: "Trainer Card" }).click();
  const heading = page.getByRole("heading", { name: "TRAINER CARD" });
  await expect(heading).toBeVisible();
  await expect(page.getByText("SEAN")).toBeVisible();
  const modal = page.locator("[aria-modal]").filter({ has: heading });
  await modal.getByRole("button").click();
  await expect(heading).not.toBeVisible();
});

test("chicago town modal opens and closes", async ({ page }) => {
  const map = page.locator(".border-iceberg-medium").first();
  await map.getByRole("button").first().click();
  const heading = page.getByRole("heading", { name: "Chicago" });
  await expect(heading).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(heading).not.toBeVisible();
});

test("notre dame town modal opens", async ({ page }) => {
  const map = page.locator(".border-iceberg-medium").first();
  await map.getByRole("button").nth(1).click();
  await expect(page.getByRole("heading", { name: "NotreDame" })).toBeVisible();
});

test("spotify modal opens with title", async ({ page }) => {
  await page.getByRole("button", { name: "Spotify Song" }).click();
  await expect(
    page.getByRole("heading", { name: "Music To My Ears" }),
  ).toBeVisible();
});

test("google books modal opens with title", async ({ page }) => {
  await page.getByRole("button", { name: "Google Books" }).click();
  await expect(
    page.getByRole("heading", { name: "Get Yo Knowledge Up" }),
  ).toBeVisible();
});

test("external links point to github and linkedin", async ({ page }) => {
  await expect(page.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    /github\.com/i,
  );
  await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    /linkedin\.com/i,
  );
});
