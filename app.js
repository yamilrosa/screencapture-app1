const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://craigslist.org");

  page.setViewport({ width: 1920, height: 1080 });
  await page.screenshot({ path: `./public/screenshot.png` });
  // await page.screenshot({ path: `screenshot${Date.now()}.png` });

  await browser.close();
})();
