'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #31

(async () => {
  // using a debugger such as ndb -> $ ndb script.js
  debugger;

  const browser = await puppeteer.launch({ devtools: true, slowMo: 200 }); // using the launch options

  // Using a sleep function:
  const sleep = duration =>
    new Promise(resolve => setTimeout(resolve, duration));

  // Operations to debug
  const page = await browser.newPage();
  await page.goto('https://pptr.dev/');

  // holding the browser instance in a state between operations and not a the end of them
  // await browser.waitForTarget(() => false);

  await page.waitForSelector('toolbar-component');
  await page.focus('[type="search"]');
  debugger;
  await page.keyboard.type('Page', { delay: 200 });

  debugger; // placing break points and using a debugger -> vscode Run and Debug

  await sleep(3000);
  await page.waitForTimeout(3000); // with a page instance

  await page.keyboard.press('Enter');

  await browser.close(); // can comment this line in order to hold the browser open
})();
