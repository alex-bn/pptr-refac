'use strict';
const puppeteer = require('puppeteer');
const fs = require('fs');

// Puppeteer #37

(async () => {
  const browser = await puppeteer.launch({ devtools: true });
  const page = await browser.newPage();

  await page.goto('https://github.com', { waitUntil: 'networkidle2' });

  const snapshot = await page.accessibility.snapshot({
    interestingOnly: false,
    root: await page.$('header'),
  });
  fs.writeFile('output.json', JSON.stringify(snapshot, null, 4), () => {});

  await browser.close();
})();
