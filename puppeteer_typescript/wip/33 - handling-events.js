'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #33

async function run() {
  let browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();
  let currentUrl;

  // native events & syntactic events of the page API
  page
    // emitted when the DOM is parsed and ready without waiting for external resources
    .on('domcontentloaded', () => console.log('✔ DOM is ready!'))

    // emitted when the page is fully loaded
    .on('load', () => console.log('✔ Page is loaded!'))

    .on('request', request => console.log(request.url()))
    .on('close', () => console.log('✔ Page is closed!'));

  // Custom Events //

  // the provided function is invoked by the window but within the context of Puppeteer - meaning the Node.js process

  await page.exposeFunction('onCustomEvent', e =>
    console.log(`${e.type} fired`, e.detail || '')
  );

  // Attach an event listener to the document of the page to capture a custom event on page load/navigation

  await page.evaluateOnNewDocument(() => {
    document.addEventListener('my-custom-event', e => {
      window.onCustomEvent({ type: 'my-custom-event', detail: e.detail });
    });
  });
  await page.goto('https://pptr.dev');
  await page.evaluate(() =>
    document.dispatchEvent(new Event('my-custom-event'))
  );

  await page.close();
  await browser.close();
}

run();
