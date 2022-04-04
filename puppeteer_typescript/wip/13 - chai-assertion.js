'use strict';
const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('Puppeteer #13', () => {
  //
  it('Should perform assertions using chai', async function () {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
      devtools: false,
    });
    const page = await browser.newPage();
    await page.goto('http://example.com/');

    const title = await page.title();
    const url = await page.url();
    const text = await page.$eval('h1', element => element.textContent);
    const count = await page.$$eval('p', elementsArray => elementsArray.length);

    // Assertions with chai library:
    // https://www.chaijs.com/api/bdd/

    expect(title).to.be.a('string', 'Example Domain');
    expect(url).to.include('example.com');
    expect(text).to.be.a('string', 'Example Domain');
    expect(count).to.eq(2);

    await browser.close();
  });
});
