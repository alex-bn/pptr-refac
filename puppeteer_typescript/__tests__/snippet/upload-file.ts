import puppeteer from 'puppeteer';
import helper from '../helpers/functions';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://the-internet.herokuapp.com/upload', {
    waitUntil: 'domcontentloaded',
  });

  await helper.loadFile(page, '#file-upload', `./files/pdf.pdf`);
  await page.click('#file-submit');
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  // await helper.timeout(1250);
  // await helper.waitForText(page, 'body', 'File Uploaded!');

  await browser.close();
})();
