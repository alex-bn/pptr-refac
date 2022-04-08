import puppeteer from 'puppeteer';
import Helper from '../utility-func/utility-functions';

(async () => {
  const url = 'http://www.uitestingplayground.com/textinput';
  const sel: string = '#newButtonName';

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // using backspace
  await Helper.loadPage(page, url);
  await page.type(sel, 'backspace clear this slowly', {
    delay: 30,
  });
  await Helper.backspaceClear(page, sel);

  await Helper.timeout(750);

  // 3 clicks
  await page.type(sel, 'click click click', {
    delay: 30,
  });
  await Helper.clickToSelect(page, sel);
  await page.type(sel, 'clear all');
  await Helper.timeout(750);

  // clear all
  await Helper.clearAll(page, sel);
  await Helper.timeout(750);

  await browser.close();
})();
