'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #25

async function run() {
  let browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();
  let currentUrl;

  await page.setViewport({ width: 1920, height: 1080 });
  await page.setRequestInterception(true);

  page.on('request', req => {
    if (
      req.resourceType() == 'stylesheet' ||
      req.resourceType() == 'font' ||
      req.resourceType() == 'image'
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  for (currentUrl of [
    'https://www.ebay.com/',
    'https://bbc.com',
    'https://news.google.com/news/',
  ]) {
    await page.goto(currentUrl);
    await page.waitForTimeout(3000);
  }
  await browser.close();
}

run();
