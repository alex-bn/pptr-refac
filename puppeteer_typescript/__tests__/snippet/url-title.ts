import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 10,
    devtools: false,
  });
  const start = Date.now();
  const page = await browser.newPage();
  await page.goto('http://example.com/');

  // Shortcut for page.mainFrame().title()
  const title = await page.title();

  // This is a shortcut for page.mainFrame().url()
  const url = await page.url();

  console.log(`Title: ${title}`);
  console.log(`URL: ${url}`);
  console.log('Took', Date.now() - start, 'ms.');
  await browser.close();
})();
