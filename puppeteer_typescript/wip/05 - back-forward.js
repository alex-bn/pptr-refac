'use strict';
const puppeteer = require('puppeteer');

describe('Puppeteer #5', () => {
  //
  it('Should navigate back and forth in history', async function () {
    const browser = await puppeteer.launch({
      headless: true,
      slowMo: 250,
      devtools: false,
    });
    // Test will pass only in headless mode !
    const page = await browser.newPage();

    await page.goto('http://www.uitestingplayground.com/');
    // await page.waitForTimeout(3000);
    await page.goto('https://www.netlify.com/');
    // await page.waitForTimeout(3000);

    await page.goBack();
    // await page.waitForTimeout(3000);
    await page.goForward();
    // await page.waitForTimeout(3000);
    await page.waitForSelector('#cta-header-announcementBar');

    await browser.close();
  });
});
