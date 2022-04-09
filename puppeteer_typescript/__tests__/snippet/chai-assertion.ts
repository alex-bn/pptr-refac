import puppeteer from 'puppeteer';
import * as chai from 'chai';
import Helper from '../utility-func/utility-functions';

const expect = chai.expect;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 200,
    devtools: false,
  });
  const page = await browser.newPage();
  const url = 'http://uitestingplayground.com/';

  await Helper.loadUrl(page, url);
  const link1 = Array.from(
    await page.$x('//a[contains(text(), "Text Input")]')
  );
  await link1[0].click();

  await Helper.type(page, 'text to be written', '#newButtonName');

  await Helper.clickElement(page, '#updatingButton');

  await button = 

  expect()

  // const title = await page.title();
  // const urlString = await page.url();
  // const text = await page.$eval('h1', element => element.textContent);
  // const count = await page.$$eval('p', elementsArray => elementsArray.length);

  // Assertions with chai library:
  // https://www.chaijs.com/api/bdd/

  // expect(title).to.be.a('string', 'Example Domain');
  // expect(url).to.include('example.com');
  // expect(text).to.be.a('string', 'Example Domain');
  // expect(count).to.eq(2);

  await Helper.timeout(2500);

  await browser.close();
})();
