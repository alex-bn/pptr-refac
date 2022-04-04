'use strict';
const puppeteer = require('puppeteer');

describe('Puppeteer #17', () => {
  //
  it('Should check for hidden elements', async function () {
    const browser = await puppeteer.launch({
      headless: true,
      slowMo: 10,
      devtools: false,
    });

    const page = await browser.newPage();
    await page.setDefaultTimeout(10000);
    await page.setDefaultNavigationTimeout(20000);

    //
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.waitForSelector('#signin_button');

    // To check that the button no longer exists after the click there are 2 options:
    await page.click('#signin_button');

    // a)
    await page.waitForTimeout(() => !document.querySelector('#signin_button'));

    // b)
    await page.waitForSelector('#signin_button', {
      hidden: true,
      timeout: 3000, // has the highest precedence
    });
    await browser.close();
  });
});
