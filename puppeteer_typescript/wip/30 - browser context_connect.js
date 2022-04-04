'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #30

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  // Store the endpoint to be able to reconnect to Chromium
  const browserWSEndpoint = browser.wsEndpoint();
  console.log(browserWSEndpoint);

  // Disconnect puppeteer from Chromium
  browser.disconnect();

  // Use the endpoint to reestablish a connection
  const browser2 = await puppeteer.connect({ browserWSEndpoint });
  const page = await browser2.newPage();
  await page.goto('https://cnn.com');
  const title = await page.title();
  const url = await page.url();
  console.log(`Navigated to ${title} at ${url}`);
  await browser2.close();
})();
