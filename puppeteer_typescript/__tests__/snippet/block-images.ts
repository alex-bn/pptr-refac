import puppeteer from 'puppeteer';
import helper from '../utility-func/utility-functions';

(async () => {
  const url = 'https://news.google.com';
  const agreeSelector = 'div.AIC7ge > form > div > div > button';
  let start: Date = new Date();
  console.log('--\xa0process:\xa0start');

  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await helper.interceptReq(page);
  await helper.loadPage(page, url);

  const agree = await page.$(agreeSelector);
  await agree?.click();
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  console.log('--\xa0process:\xa0accept\xa0terms\xa0of\xa0service');

  await page.screenshot({
    path: `${__dirname}/screenshots/${Date.now()}-block-images.png`,
    fullPage: true,
  });
  console.log('--\xa0process:\xa0screenshot');

  await browser.close().then(() => {
    let finish: Date = new Date();
    let end = (+finish - +start) / 1000;
    console.log('--\xa0process:\xa0end,\xa0runtime\xa0' + end + '\xa0seconds');
  });
})();
