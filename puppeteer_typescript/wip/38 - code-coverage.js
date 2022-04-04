'use strict';
const puppeteer = require('puppeteer');
const fs = require('fs');
const pti = require('puppeteer-to-istanbul');

// Puppeteer #38

(async () => {
  const browser = await puppeteer.launch({ devtools: true });
  const page = await browser.newPage();

  await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage(),
  ]);

  await page.goto('https://pptr.dev', { waitUntil: 'networkidle2' });

  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage(),
  ]);

  pti.write([...jsCoverage, ...cssCoverage]);

  // run: npx nyc report --reporter=html
  // wil create a folder named "coverage" that contains the report in an html format, enjoy!

  // const calculateUsedBytes = data =>
  //   data.map(({ url, ranges, text }) => {
  //     let usedBytes = 0;

  //     ranges.forEach(range => (usedBytes += range.end - range.start - 1));

  //     return {
  //       url,
  //       usedBytes,
  //       totalBytes: text.length,
  //     };
  //   });

  // fs.writeFile(
  //   'code.coverage.json',
  //   JSON.stringify(calculateUsedBytes(jsCoverage), null, 4),
  //   () => {}
  // );

  await browser.close();
})();
