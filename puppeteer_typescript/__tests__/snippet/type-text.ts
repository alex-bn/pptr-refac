import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    devtools: false,
    timeout: 5000,
  });

  const page = await browser.newPage();
  await page.goto('https://devexpress.github.io/testcafe/example/');

  // Sends a keydown, keypress/input, and keyup event for each character in the text.

  await page.type('#developer-name', 'Puppeteer Test', { delay: 100 }); // Types slower like a user
  await page.waitForTimeout(2000);

  await browser.close();
})();
