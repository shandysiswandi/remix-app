import { expect, test } from "@playwright/test";
import { APP_NAME } from "~/lib/constant";

test.describe("Home Page", () => {
  test("should have the correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Home/);
  });

  test("should display the main heading and paragraph", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Build and Deploy with Confidence" })
    ).toBeVisible();

    await expect(
      page.getByText("You've set up a powerful, modern, and scalable foundation")
    ).toBeVisible();
  });

  test('should navigate to the login page when "Get Started" is clicked', async ({ page }) => {
    await page.goto("/");

    const getStartedLink = page.getByRole("link", { name: "Get Started" });

    await expect(getStartedLink).toBeVisible();

    await getStartedLink.click();

    await expect(page).toHaveURL(/.*\/login/);
  });

  test("should display the footer", async ({ page }) => {
    await page.goto("/");

    const year = new Date().getFullYear();
    await expect(page.getByText(`© ${year} ${APP_NAME} Inc. All Rights Reserved.`)).toBeVisible();
  });
});