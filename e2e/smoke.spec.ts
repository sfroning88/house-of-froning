import { test, expect, type Page } from "@playwright/test";
import { COOKIE_BANNER_DISMISSED_KEY } from "@/lib/constants";
import { TEST_IDS } from "../lib/test-ids";

async function preparePage(page: Page) {
  await page.addInitScript((key) => {
    localStorage.setItem(key, "true");
  }, COOKIE_BANNER_DISMISSED_KEY);
  await page.goto("/");
  await expect(page).toHaveTitle(/House of Froning/);
  await expect(page.getByTestId(TEST_IDS.homeScreen)).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test("home page renders the town map", async ({ page }) => {
  const map = page.getByTestId(TEST_IDS.townMap);
  await expect(map).toBeVisible();
  await expect(page.getByTestId(TEST_IDS.townChicago)).toBeVisible();
  await expect(page.getByTestId(TEST_IDS.townNotreDame)).toBeVisible();
});

test("bottom bar shows main action buttons", async ({ page }) => {
  const bottomBar = page.getByTestId(TEST_IDS.bottomBar);
  await expect(
    bottomBar.getByRole("button", { name: "Trainer Card" }),
  ).toBeVisible();
  await expect(
    bottomBar.getByRole("button", { name: "Spotify Song" }),
  ).toBeVisible();
  await expect(
    bottomBar.getByRole("button", { name: "Google Books" }),
  ).toBeVisible();
  await expect(bottomBar.getByRole("link", { name: "GitHub" })).toBeVisible();
  await expect(bottomBar.getByRole("link", { name: "LinkedIn" })).toBeVisible();
});

test("trainer card modal opens and closes", async ({ page }) => {
  await page
    .getByTestId(TEST_IDS.bottomBar)
    .getByRole("button", {
      name: "Trainer Card",
    })
    .click();
  const modal = page.getByTestId(TEST_IDS.trainerCardModal);
  await expect(
    modal.getByRole("heading", { name: "TRAINER CARD" }),
  ).toBeVisible();
  await expect(modal.getByText("SEAN")).toBeVisible();
  await page.getByTestId(TEST_IDS.trainerCardClose).click();
  await expect(modal).not.toBeVisible();
});

test("chicago town modal opens and closes", async ({ page }) => {
  await page.getByTestId(TEST_IDS.townChicago).click();
  const modal = page.getByTestId(TEST_IDS.townModalChicago);
  await expect(modal.getByRole("heading", { name: "Chicago" })).toBeVisible();
  await modal.getByRole("button", { name: "Close" }).click();
  await expect(modal).not.toBeVisible();
});

test("notre dame town modal opens", async ({ page }) => {
  await page.getByTestId(TEST_IDS.townNotreDame).click();
  const modal = page.getByTestId(TEST_IDS.townModalNotreDame);
  await expect(modal.getByRole("heading", { name: "NotreDame" })).toBeVisible();
});

test("spotify modal opens with title", async ({ page }) => {
  await page
    .getByTestId(TEST_IDS.bottomBar)
    .getByRole("button", {
      name: "Spotify Song",
    })
    .click();
  const modal = page.getByTestId(TEST_IDS.spotifyModal);
  await expect(
    modal.getByRole("heading", { name: "Music To My Ears" }),
  ).toBeVisible();
});

test("google books modal opens with title", async ({ page }) => {
  await page
    .getByTestId(TEST_IDS.bottomBar)
    .getByRole("button", {
      name: "Google Books",
    })
    .click();
  const modal = page.getByTestId(TEST_IDS.googleBooksModal);
  await expect(
    modal.getByRole("heading", { name: "Get Yo Knowledge Up" }),
  ).toBeVisible();
});

test("external links point to github and linkedin", async ({ page }) => {
  const bottomBar = page.getByTestId(TEST_IDS.bottomBar);
  await expect(bottomBar.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    /github\.com/i,
  );
  await expect(
    bottomBar.getByRole("link", { name: "LinkedIn" }),
  ).toHaveAttribute("href", /linkedin\.com/i);
});
