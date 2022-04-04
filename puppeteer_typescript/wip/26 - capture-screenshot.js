'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #26

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.resourceType() === 'image') request.abort();
    else request.continue();
  });
  await page.goto('https://news.google.com/news/', {
    waitUntil: 'networkidle2',
  });

  const button =
    '#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.AIC7ge > form > div > div > button > div.VfPpkd-RLmnJb';
  await page.waitForSelector(button);
  await page.click(button);
  await page.waitForNavigation();

  // take screenshot of the current page
  await page.screenshot({
    path: 'news.png',
    // fullPage: true,
    type: 'jpeg',
    quality: 100,
    clip: { x: 50, y: 6, width: 300, height: 300 },
  });

  await page.waitForTimeout(5000);
  await browser.close();
})();
