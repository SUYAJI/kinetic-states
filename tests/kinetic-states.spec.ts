import { expect, test } from "@playwright/test";

const studyTitles = [
  "01 — INERTIA", "02 — MAGNETIC", "03 — DELAY", "04 — REPULSION", "05 — ELASTIC",
  "06 — PARALLAX", "07 — Scroll Inertia", "08 — SELECTION GRAVITY", "09 — Temporal Hover", "10 — Velocity Shift",
];

test("boots cleanly, renders all studies, and uses bundled imagery", async ({ page }) => {
  const consoleMessages: string[] = [];
  page.on("console", (message) => { if (["error", "warning"].includes(message.type())) consoleMessages.push(message.text()); });
  await page.goto("/");
  for (const title of studyTitles) await expect(page.getByRole("heading", { name: title })).toBeVisible();
  await expect(page.locator("img")).toHaveCount(32);
  expect(await page.locator("img").evaluateAll((images) => images.every((image) => !image.src.includes("unsplash")))).toBe(true);
  expect(consoleMessages).toEqual([]);
});

test("supports document scrolling and lets Scroll Inertia yield page traversal", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.mouse.wheel(0, 900);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  const scrollStudy = page.getByRole("heading", { name: "07 — Scroll Inertia" }).locator("..").locator("..");
  await scrollStudy.scrollIntoViewIfNeeded();
  await scrollStudy.locator('[aria-label="Scrollable inertia study items"]').evaluate((element) => { element.scrollTop = element.scrollHeight; });
  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 700);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before);
});

test("keyboard focus reaches an interactive study with a visible outline", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const pull = page.getByRole("button", { name: "Pull" });
  await expect(pull).toBeFocused();
  expect(await pull.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
});

test("magnetic and temporal-hover studies expose representative state changes", async ({ page }) => {
  await page.goto("/");
  const pull = page.getByRole("button", { name: "Pull" });
  await pull.hover();
  await expect(pull.locator("img")).toHaveAttribute("style", /opacity: 1/);
  const dwell = page.getByRole("button", { name: /Hold focus, hover, or activate/ });
  await dwell.click();
  await expect(page.getByText("LOCKED")).toBeVisible({ timeout: 1600 });
});

test("touch-sized presentation has no horizontal overflow or custom cursor", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.locator(".fixed.z-\\[100\\]")).toHaveCount(0);
  await context.close();
});

test("reduced motion loads cleanly and keeps deliberate dwell interaction usable", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const consoleMessages: string[] = [];
  page.on("console", (message) => { if (["error", "warning"].includes(message.type())) consoleMessages.push(message.text()); });
  await page.goto("/");
  const dwell = page.getByRole("button", { name: /Hold focus, hover, or activate/ });
  await dwell.focus();
  await expect(page.getByText("LOCKED")).toBeVisible();
  expect(consoleMessages).toEqual([]);
  await context.close();
});
