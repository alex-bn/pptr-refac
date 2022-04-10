import puppeteer from 'puppeteer';
import Helper from '../utility-func/utility-functions';
import * as chai from 'chai';

const expect = chai.expect;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 0,
    devtools: false,
  });

  const page = await browser.newPage();
  const url = 'http://www.uitestingplayground.com/';
  // Override the it.block timeout value:
  page.setDefaultTimeout(10000);
  page.setDefaultNavigationTimeout(20000);

  await Helper.loadPage(page, url);
  const nodesCount = await Helper.getCount(page, '#overview > div > div');
  expect(nodesCount).to.eq(5);
  //

  await browser.close();
})();
