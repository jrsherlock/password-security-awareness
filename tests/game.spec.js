import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const solveData = [
  ["glen", [0, 0, 0], "SpinalTapDerek35", 1],
  ["shanti", [1, 2, 0], "SeattleJD2021", 0],
  ["kyle", [1, 0, 2], "Alumiman18", 2],
  ["lance", [1, 2, 1], "04/21/22 5AZX4", 1],
];
async function reviewPosts(page, answers) {
  for (let i = 0; i < 3; i++) {
    if (i === 0) await page.locator(".evidence-card").first().click();
    await page
      .getByRole("dialog")
      .locator("input[type=radio]")
      .nth(answers[i])
      .check();
    await page.getByRole("button", { name: "Log observation" }).click();
    await expect(page.getByRole("status")).toContainText(
      /Clue added|Distraction ruled out/,
    );
    await page
      .getByRole("button", {
        name: i < 2 ? "Next post" : "Back to evidence board",
      })
      .click();
  }
}
test("all four investigations complete with real clue and protection choices; saves across reload", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  for (const [id, answers, password, protection] of solveData) {
    await page.goto("/#case/" + id);
    await expect(
      page.getByLabel("Connect the clues", { exact: true }),
    ).toBeDisabled();
    await reviewPosts(page, answers);
    await page.getByLabel("Connect the clues", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Test password" }).click();
    await expect(page.locator(".protection-section")).toBeVisible();
    await page.locator(".assessment input").nth(protection).check();
    await page
      .getByRole("button", { name: "Protect the account", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "Nice work, detective." }),
    ).toBeVisible();
  }
  await page.goto("/#progress");
  await expect(
    page.getByRole("heading", { name: "Digital Defender" }),
  ).toBeVisible();
  await expect(page.locator(".xp-total")).toContainText("1200");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Digital Defender" }),
  ).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download field report" }).click();
  expect((await downloadPromise).suggestedFilename()).toBe(
    "overshared-field-report.md",
  );
  expect(errors).toEqual([]);
});
test("wrong answers give feedback, hints cost XP, and collected clues persist", async ({
  page,
}) => {
  await page.goto("/#case/glen");
  await page.locator(".evidence-card").first().click();
  await page.getByRole("dialog").locator("input[type=radio]").nth(1).check();
  await page.getByRole("button", { name: "Log observation" }).click();
  await expect(page.getByRole("status")).toContainText("Take another look");
  await page.getByRole("button", { name: "Close dialog" }).click();
  await reviewPosts(page, [0, 0, 0]);
  await page.reload();
  await expect(page.locator(".clue-progress")).toContainText("3 OF 3");
  await page.getByRole("button", { name: /Need a nudge/ }).click();
  await page.getByLabel("Connect the clues", { exact: true }).fill("wrong");
  await page.getByRole("button", { name: "Test password" }).click();
  await expect(page.getByRole("status")).toContainText("Not quite");
  await page
    .getByLabel("Connect the clues", { exact: true })
    .fill("Spinal Tap Derek 35");
  await page.getByRole("button", { name: "Test password" }).click();
  await page.locator(".assessment input").nth(0).check();
  await page
    .getByRole("button", { name: "Protect the account", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("predictable");
  await page.locator(".assessment input").nth(1).check();
  await page
    .getByRole("button", { name: "Protect the account", exact: true })
    .click();
  await expect(page.locator(".completion-stats")).toContainText("+240");
});
test("mobile has no horizontal overflow and dialogs retain keyboard focus", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await expect(page.locator(".case-card")).toHaveCount(4);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .getByRole("button", { name: "How to play", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Solved", exact: true }).click();
  await expect(
    page.getByText("Every detective starts somewhere."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Explore cases" }).click();
  await expect(page.locator(".case-card")).toHaveCount(4);
});
test("home, case, evidence, playbook and progress meet axe WCAG AA checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/#case/shanti", "/#playbook", "/#progress"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  }
  await page.goto("/#case/glen");
  await page.locator(".evidence-card").first().click();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
});
test("PWA metadata, cache, and Chromium offline emulation", async ({
  page,
  context,
  browserName,
}) => {
  await page.goto("/");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await expect
    .poll(() => page.evaluate(() => !!navigator.serviceWorker.controller))
    .toBe(true);
  const manifest = await page.evaluate(async () => {
    const link = document.querySelector("link[rel=manifest]");
    return await fetch(link.href).then((r) => r.json());
  });
  expect(manifest.display).toBe("standalone");
  expect(manifest.icons).toHaveLength(2);
  expect(
    await page.evaluate(async () => {
      const keys = await caches.keys();
      return keys.some((key) => key.includes("workbox-precache"));
    }),
  ).toBe(true);
  // WebKit's simulated offline toggle produces an internal navigation error here.
  // Its cache-only reload is verified below by shutting down the origin server.
  if (browserName === "webkit") return;
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole("heading", { name: /Your life/ })).toBeVisible();
  await page.goto("/#case/lance");
  await page.locator(".evidence-card").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(
    await page
      .locator(".source-post img")
      .evaluate((img) => img.complete && img.naturalWidth > 0),
  ).toBe(true);
  await context.setOffline(false);
});

test("GitHub Pages subdirectory serves assets, fonts, routes and offline cache", async ({
  page,
  context,
}) => {
  const { createServer } = await import("node:http");
  const { readFile } = await import("node:fs/promises");
  const { resolve, extname, sep } = await import("node:path");
  const root = resolve("dist");
  const prefix = "/password-security-awareness/";
  const types = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".webmanifest": "application/manifest+json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ttf": "font/ttf",
  };
  const server = createServer(async (req, res) => {
    try {
      const path = new URL(req.url, "http://localhost").pathname;
      if (!path.startsWith(prefix)) {
        res.writeHead(404);
        res.end();
        return;
      }
      const file = resolve(
        root,
        decodeURIComponent(path.slice(prefix.length)) || "index.html",
      );
      if (!file.startsWith(root + sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      const body = await readFile(file);
      res.writeHead(200, {
        "Content-Type": types[extname(file)] || "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}${prefix}`;
  try {
    const failed = [];
    page.on("response", (response) => {
      if (response.status() >= 400) failed.push(response.url());
    });
    await page.goto(url);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await navigator.serviceWorker.ready;
    });
    await expect(
      page.getByRole("heading", { name: /Your life/ }),
    ).toBeVisible();
    await page.reload();
    await expect
      .poll(() => page.evaluate(() => !!navigator.serviceWorker.controller))
      .toBe(true);
    expect(
      await page.evaluate(() => document.fonts.check("800 60px Barlow")),
    ).toBe(true);
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
    await page.reload();
    await page.locator(".case-card").first().click();
    await expect(
      page.getByRole("heading", { name: "A little too personal." }),
    ).toBeVisible();
    expect(
      await page
        .locator(".evidence-image img")
        .first()
        .evaluate((img) => img.complete && img.naturalWidth > 0),
    ).toBe(true);
    expect(failed).toEqual([]);
  } finally {
    await context.setOffline(false);
    await new Promise((resolve) => server.close(resolve));
  }
});
