import puppeteer from 'puppeteer';

(async () => {
  //
  const browser = await puppeteer.launch({
    headless: false,
  });
  // Tab 1:
  const page1 = await browser.newPage();
  // Tab 2:
  const page2 = await browser.newPage();

  await page1.goto('http://example.com/');
  await page1.waitForSelector('h1');

  await page2.goto('http://www.uitestingplayground.com/');
  await page2.waitForSelector('#description');

  await page1.bringToFront();
  await page1.waitForTimeout(1000);

  await page2.bringToFront();
  await page2.waitForTimeout(1000);

  await page1.bringToFront();
  await page1.waitForTimeout(1000);

  await browser.close();
})();
