import puppeteer from 'puppeteer';
import Helper from '../utility-func/utility-functions';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 0,
    devtools: false,
  });
  const page = await browser.newPage();

  const url = 'http://zero.webappsecurity.com/index.html';
  //
  const func = async () => {
    // const a = await page.waitForSelector('#signin_button', {
    //   visible: true,
    //   hidden: true,
    //   timeout: 3000,
    // });
    // if (a) {
    //   return console.log('visible');
    // } else {
    //   return console.log('not visible');
    // }
    // const element_is_visible = await page.evaluate(() => {
    //   const element = document.querySelector('#signin_button');
    //   if (element) {
    //     const style = getComputedStyle(element);
    //     const rect = element.getBoundingClientRect();
    //     return (
    //       style.visibility !== 'hidden' &&
    //       !!(rect.bottom || rect.top || rect.height || rect.width)
    //     );
    //   }
    // });
    // if (element_is_visible) {
    //   console.log('visible');
    // } else {
    //   console.log('not visible');
    // }
  };

  // 1
  await Helper.loadPage(page, url);
  const a = await Helper.shouldNotExist(page, '#signin_button');
  const b = await Helper.shouldExist(page, '#signin_button');
  console.log(a);
  console.log(b);
  // func();

  await Helper.clickAndLoad(page, '#signin_button');
  // func();

  await page.goto('http://zero.webappsecurity.com/index.html');

  // func();

  await browser.close();
})();
