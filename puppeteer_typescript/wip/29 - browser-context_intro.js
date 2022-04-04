'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #29

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const defaultContext = await browser.defaultBrowserContext();

  const page1 = await defaultContext.newPage();
  await page1.goto('https://cnn.com');

  const incognitoContext = await browser.createIncognitoBrowserContext();
  await incognitoContext.overridePermissions('https://pptr.dev', ['camera']);

  const page2 = await incognitoContext.newPage();
  await page2.goto('https://bbc.com');
  await page2.waitForTimeout(3000);
  console.log(browser.browserContexts());

  await incognitoContext.close();
  await page1.waitForTimeout(3000);
  await browser.close();
})();
