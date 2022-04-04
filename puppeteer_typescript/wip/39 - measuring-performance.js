'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #39

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev/', { waitUntil: 'networkidle2' });

  // 1 - Load-time metrics
  const metrics = await page.evaluate(() => JSON.stringify(window.performance));
  console.log(JSON.parse(metrics));
  // loadEventEnd - navigationStart represents the time since the navigation started until the page is loaded

  // 2 - Runtime metrics
  const metrics2 = await page.metrics();
  console.log(metrics2);
  // the interesting metric here is the actual memory usage by javascript on the page: JSHeapUsedSize: 11487304

  // 3 - Tracing browser activities
  await page.tracing.start({ path: 'tracing.json' });
  await page.goto('https://pptr.dev/', { waitUntil: 'networkidle2' });
  await page.tracing.stop();
  // use chrome dev tools to load and inspect the file

  await browser.close();
})();
