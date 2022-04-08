import puppeteer from 'puppeteer';
import helper from '../utility-func/utility-functions';

(async () => {
  const url = 'https://www.cleancss.com/base64-decode/';
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // await helper.loadPage(page, url);
  // await helper.loadFile(page, '#loadfilewrapper', `./files/pdf.pdf`);
  // await page.click('#loadfilewrapper');
  // await helper.waitForText(
  //   page,
  //   'body',
  //   'We got an empty result for your request.  This may mean that your input formatting is invalid.  Please verify and try again.'
  // );

  await helper.loadPage(page, url);
  await helper.loadMultipleFiles(page, '#loadfilewrapper', '../snippet/files');
  await page.click('#loadfilewrapper');
  await helper.timeout(2000);
  // await helper.waitForText(page, 'body', 'File Uploaded!');

  await browser.close();
})();
