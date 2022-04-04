'use strict';
const startPuppeteerLoadTest = require('puppeteer-loadtest');

// Puppeteer #40

(async () => {
  const results = await startPuppeteerLoadTest({
    file: './_pptr_examples/10 - page-title-and-url.js', // path to file
    samplesRequested: 100, // number of samples requested
    concurrencyRequested: 25, // number of concurrency requested
  });
  console.log(results);
})();
