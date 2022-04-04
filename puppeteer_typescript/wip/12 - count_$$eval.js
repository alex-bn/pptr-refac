'use strict';
const puppeteer = require('puppeteer');

describe('Puppeteer #12', () => {
  //
  it('Should run document.querySelectorAll', async function () {
    const browser = await puppeteer.launch({
      headless: true,
      slowMo: 10,
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

    await browser.close();
  });
});
