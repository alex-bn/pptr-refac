'use strict';
const puppeteer = require('puppeteer');

describe('Puppeteer #23', () => {
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 0,
      devtools: false,
      ignoreHTTPSErrors: true,
    });
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(20000);
    await page.setDefaultTimeout(10000);
  });

  after(async function () {
    await browser.close();
  });

  it('Should scrap links from a given page', async function () {
    //
    await page.setExtraHTTPHeaders({ Referer: 'https://sparktoro.com/' });
    await page.goto('https://sparktoro.com/trending');

    const selector = 'div.title > a';
    await page.waitForSelector(selector);
    const links = await page.$$eval(selector, elements =>
      elements.map(link => link.href)
    );

    console.log(links);

    // const links = await page.evaluate(() => {
    // const l = Array.from(document.querySelectorAll('div.title > a'));
    // return l.map(link => link.href);
    // });
  });
});
