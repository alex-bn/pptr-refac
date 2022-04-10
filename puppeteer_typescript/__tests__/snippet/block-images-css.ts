import puppeteer from 'puppeteer';
import Helper from '../utility-func/utility-functions';

// Puppeteer #25

(async () => {
  let browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();
  let currentUrl;

  await page.setViewport({ width: 1920, height: 1080 });
  await page.setRequestInterception(true);

  page.on('request', req => {
    if (
      req.resourceType() == 'stylesheet' ||
      req.resourceType() == 'font' ||
      req.resourceType() == 'image' ||
      req.resourceType() == 'media'
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  for (currentUrl of [
    'https://www.ebay.com/',
    'https://bbc.com',
    'https://cnn.com',
  ]) {
    console.time('test took');
    await page.goto(currentUrl);
    await page.screenshot({ path: `./screenshots/${Date.now()}-block.png` });
    console.timeEnd('test took');
  }
  await browser.close();
})();
