import puppeteer from 'puppeteer';
import Helper from '../utility-func/utility-functions';

(async () => {
  const url = 'http://www.uitestingplayground.com/';
  const browser = await puppeteer.launch({ headless: false });
  // Create a new incognito browser context.
  const context = await browser.createIncognitoBrowserContext();
  // Create a new page in a pristine context.
  const page = await context.newPage();

  // Do stuff
  await Helper.loadPage(page, url);
  const urlSelector =
    '#overview > div > div:nth-child(1) > div:nth-child(4) > h3 > a';

  await Helper.click(page, urlSelector);
  await Helper.waitTillHTMLRendered(page);
  await Helper.shouldExist(page, 'body > section > div > button');

  await Helper.timeout(3000);
  //
  await browser.close();
})();
