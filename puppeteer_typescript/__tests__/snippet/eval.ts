import puppeteer from 'puppeteer';
import helper from '../utility-func/utility-functions';
import * as chai from 'chai';

const expect = chai.expect;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 0,
    devtools: false,
  });
  const page = await browser.newPage();
  await page.goto('http://example.com/');

  // This method runs document.querySelector within the page and passes it as the first argument to pageFunction

  const text = await page.$eval('h1', element => element.textContent);
  console.log(`Text in the h1 element: ${text}`);

  // This method runs Array.from(document.querySelectorAll(selector)) within the page and passes it as the first argument to pageFunction
  const count = await page.$$eval('p', elementsArray => elementsArray.length);
  console.log(`Number of <p> elements on the page is: ${count}`);

  //
  const title = await page.title();
  const url = await page.url();
  console.log(title);
  console.log(url);

  expect(title).to.be.a('string').that.includes('Example');
  expect(url).to.include('example.com');

  await browser.close();
})();
