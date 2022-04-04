'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #16
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let currentURL;
  page
    .waitForXPath('//img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of [
    'https://example.com',
    'https://google.com',
    'https://bbc.com',
  ]) {
    await page.goto(currentURL);
  }
  await browser.close();
})();
