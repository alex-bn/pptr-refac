'use strict';
const puppeteer = require('puppeteer');

describe('Puppeteer #15', () => {
  //
  it('Should simulate the keyboard', async function () {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
      devtools: false,
    });

    const page = await browser.newPage();
    await page.setDefaultTimeout(10000);
    await page.setDefaultNavigationTimeout(20000);

    //
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.waitForSelector('#searchTerm');
    await page.type('#searchTerm', 'Hello World', { delay: 100 });
    //
    await page.keyboard.press('Enter', { delay: 100 });
    await page.waitForTimeout(1000);

    //
    await page.goto('https://pptr.dev');
    await page.waitForSelector('[type="search"]');
    await page.focus('[type="search"]');
    await page.waitForTimeout(1000);
    await page.keyboard.type('keyboard', { delay: 100 });
    await page.keyboard.press('ArrowDown', { delay: 100 });
    await page.keyboard.press('ArrowDown', { delay: 100 });
    await page.keyboard.press('Enter', { delay: 100 });
    // await browser.close();
  });
});
