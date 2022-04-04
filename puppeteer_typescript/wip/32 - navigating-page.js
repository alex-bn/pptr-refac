'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #32

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  console.log((await browser.pages()).length);
  const [initializedPages] = await browser.pages();
  // console.log(initializedPages);

  //
  const page = await browser.newPage();
  // const page2 = await browser.newPage();
  // const page3 = await browser.newPage();

  // print content of the main frame
  console.log(await page.mainFrame().content());
  // similar to:
  console.log(await page.content());

  try {
    const response = await page.goto('https://pptr.dev', {
      timeout: 10000,
      waitUntil: 'networkidle2',
    });
    // console.log(response);
  } catch (error) {
    console.log(error);
  }

  await browser.close();
})();
