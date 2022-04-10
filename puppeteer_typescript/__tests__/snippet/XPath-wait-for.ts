import puppeteer from 'puppeteer';
import Helper from '../utility-func/utility-functions';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  let currentURL: string;
  page
    .waitForXPath('//img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of [
    'https://example.com',
    'https://google.com',
    'https://bbc.com',
  ]) {
    await Helper.loadPage(page, currentURL);
  }
  await browser.close();
})();
