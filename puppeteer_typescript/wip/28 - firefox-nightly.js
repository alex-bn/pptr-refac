'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #28

// Install Puppeteer with Firefox Nightly:
// npm set PUPPETEER_PRODUCT firefox
// npm uninstall puppeteer
// npm i puppeteer

(async () => {
  // Align the product option with the installed binary
  const browser = await puppeteer.launch({
    product: 'firefox',
    devtools: true,
  });
  const page = await browser.newPage();

  await page.goto('https://bbc.com');
  await page.waitForTimeout(5000);

  console.info(browser);
  await browser.close();
})();

// Back to Chromium:
// npm set PUPPETEER_PRODUCT chrome
// npm uninstall puppeteer
// npm i puppeteer
