import { chromium } from "playwright";

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 1000 },
  { name: "mobile", width: 375, height: 900 }
];

const browser = await chromium.launch();
const failures = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  await page.screenshot({ path: `playwright-${viewport.name}.png`, fullPage: true });

  const result = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflowing = [...document.querySelectorAll("body *")]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1);
      })
      .slice(0, 10)
      .map((element) => ({
        tag: element.tagName,
        className: String(element.className),
        text: element.textContent?.trim().slice(0, 80)
      }));

    return {
      title: document.title,
      horizontalOverflow: doc.scrollWidth > window.innerWidth + 1,
      scrollWidth: doc.scrollWidth,
      innerWidth: window.innerWidth,
      overflowing
    };
  });

  if (result.title !== "Gobika Ponnusamy - Software Engineer I") {
    failures.push(`${viewport.name}: unexpected title "${result.title}"`);
  }

  if (consoleErrors.length) {
    failures.push(`${viewport.name}: console errors: ${consoleErrors.join(" | ")}`);
  }

  if (result.horizontalOverflow) {
    failures.push(
      `${viewport.name}: horizontal overflow ${result.scrollWidth}/${result.innerWidth}: ${JSON.stringify(result.overflowing)}`
    );
  }

  await page.close();
}

await browser.close();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Portfolio checks passed for desktop, tablet, and mobile.");
