'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #35

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev/');
  await page.waitForSelector('[type="search"]');

  await page.pdf({
    path: './output.pdf',
    printBackground: true,
    scale: 0.5,
    format: 'a6',
    margin: { top: '50px', bottom: '50px' },
    landscape: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-size: 6rem">This is our custom header! The title is: <span class="title" /></div>"`,
    footerTemplate: `<div style="font-size: 6rem">This is our custom footer! The title is: <span class="title" /></div>"`,
  });

  await page.waitForTimeout(1000);
  await browser.close();
})();
