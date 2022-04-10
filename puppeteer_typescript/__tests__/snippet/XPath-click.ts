import puppeteer from 'puppeteer';
import helper from '../utility-func/utility-functions';

(async () => {
  const url = 'http://www.uitestingplayground.com/';
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await helper.loadPage(page, url);
  // await helper.clickElement(
  //   page,
  //   '#overview > div > div:nth-child(1) > div:nth-child(1) > h3 > a'
  // );

  const link = Array.from(await page.$x('//a[contains(text(), "Dynamic ID")]'));
  await link[0]?.click();

  await helper.timeout(2000);
  // await helper.waitForText(page, 'body', 'File Uploaded!');

  //*[@id="0fc69a08-37ba-4942-5a0f-f23e0449292d"]/html/body/section/div/button

  await browser.close();
})();
