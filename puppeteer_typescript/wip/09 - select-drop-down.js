'use strict';
const puppeteer = require('puppeteer');

describe('Puppeteer #9', () => {
  //
  it('Should select an option from a drop-down list', async function () {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
      devtools: false,
    });
    const page = await browser.newPage();
    await page.goto('https://devexpress.github.io/testcafe/example/');
    await page.type('#developer-name', 'Puppeteer Test', { delay: 100 });
    await page.click('#tried-test-cafe', { clickCount: 1 });

    // Triggers a change and input event once all the provided options have been selected.
    await page.select('#preferred-interface', 'JavaScript API');

    await page.waitForTimeout(2000);
    await browser.close();
  });
});
