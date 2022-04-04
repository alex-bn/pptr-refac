'use strict';
const puppeteer = require('puppeteer');

// Puppeteer 20

// Creates a new incognito browser context. This won't share cookies/cache with other browser contexts.

(async () => {
  const browser = await puppeteer.launch();

  // Create a new incognito browser context
  const context = await browser.createIncognitoBrowserContext();

  // Create a new page in a pristine context
  const page = await context.newPage();

  // Do stuff
  await page.goto('https://example.com');
})();
