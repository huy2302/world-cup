import { test, expect } from "@playwright/test";

test.describe("FC Online Tournament & Squad E2E Tests", () => {
  test("should load home page and display active tournaments and ELO leaderboard", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("COMPETE & DOMINATE IN")).toBeVisible();
    await expect(page.getByText("Featured Tournaments")).toBeVisible();
    await expect(page.getByText("Top ELO Coaches")).toBeVisible();
  });

  test("should navigate to FC Squad Builder and view tactical pitch", async ({ page }) => {
    await page.goto("/squad");
    await expect(page.getByText("FC Online Squad Builder & Roster Inspection")).toBeVisible();
    await expect(page.getByText("Salary Limit")).toBeVisible();
  });

  test("should navigate to Leaderboard", async ({ page }) => {
    await page.goto("/leaderboard");
    await expect(page.getByText("FC Online ELO Leaderboard")).toBeVisible();
  });
});
