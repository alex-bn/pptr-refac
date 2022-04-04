'use strict';
const puppeteer = require('puppeteer');

describe('Puppeteer #19', () => {
  //
  let browser;
  let page;

  //
  before('Before hook description', async function () {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
      devtools: false,
    });
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(20000);
    await page.setDefaultTimeout(10000);
  });

  after('After hook description', async function () {
    await browser.close();
  });

  it('Desktop device test', async function () {
    //TODO
    await page.setViewport({ width: 1650, height: 1050 });
    await page.goto('https://example.com/');
    await page.waitForTimeout(5000);
  });

  it('Tablet device test', async function () {
    //TODO
    const tablet = puppeteer.devices['iPad landscape'];
    await page.emulate(tablet);
    await page.goto('https://example.com/');
    await page.waitForTimeout(5000);
  });

  it('Mobile device test', async function () {
    //TODO
    const mobile = puppeteer.devices['iPhone X'];
    await page.emulate(mobile);
    await page.goto('https://example.com/');
    await page.waitForTimeout(5000);
  });
});
