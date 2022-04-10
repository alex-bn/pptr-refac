import puppeteer from 'puppeteer';
import Helper from '../utility-func/utility-functions';

(async () => {
  //
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({ Referer: 'https://sparktoro.com/' });
  await page.goto('https://sparktoro.com/trending');

  const selector = 'div.title > a';
  const links = await page.$$eval(selector, elements =>
    elements.map(link => (<HTMLAnchorElement>link).href)
  );
  console.log(links);

  await Helper.loadPage(page, 'http://www.uitestingplayground.com/');
  const sel = 'h3 > a';
  const testLinks = await page.$$eval(sel, elements =>
    elements.map(link => (<HTMLAnchorElement>link).href)
  );
  console.log(testLinks);

  await browser.close();
})();
