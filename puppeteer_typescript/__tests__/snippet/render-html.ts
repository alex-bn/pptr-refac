import puppeteer from 'puppeteer';
import Helper from '../utility-func/utility-functions';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 0,
    devtools: false,
    // timeout: 5000,
  });

  const page = await browser.newPage();
  let currentUrl: string;

  page
    .waitForSelector('img')
    .then(() => console.log(`First URL with image:` + currentUrl));

  for (currentUrl of [
    'https://unsplash.com/',
    'https://nationalinterest.org/',
    'https://www.politico.com/',
  ]) {
    await page.goto(currentUrl);
    await Helper.waitTillHTMLRendered(page);
  }

  await await browser.close();
})();
