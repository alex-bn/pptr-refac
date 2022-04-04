'use strict';
const puppeteer = require('puppeteer');

describe('Puppeteer #4', () => {
  //
  it('Should reload the page', async function () {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
      devtools: false,
    });
    const page = await browser.newPage();
    await page.goto('http://example.com/');
    await page.waitForTimeout(3000);
    await page.waitForSelector('h1');

    // Reload
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await page.waitForSelector('h1');
    await browser.close();
  });
});
