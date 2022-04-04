'use strict';
const puppeteer = require('puppeteer');

describe('Puppeteer #21', () => {
  let browser;
  let page;

  before('Some text description', async function () {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
      devtools: false,
      //
      ignoreHTTPSErrors: true,
    });
    page = await browser.newPage();
    await page.setDefaultTimeout(10000);
    await page.setDefaultNavigationTimeout(20000);
  });

  after('Some other description', async function () {
    await browser.close();
  });

  it('Should access a page that returns a https error', async function () {
    await page.goto('http://zero.webappsecurity.com/index.html');
  });
});
