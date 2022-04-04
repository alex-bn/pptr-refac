'use strict';
const puppeteer = require('puppeteer');

describe('Puppeteer #22', () => {
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      devtools: false,
      ignoreHTTPSErrors: true,
    });
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(20000);
    await page.setDefaultTimeout(10000);
  });

  after(async function () {
    await browser.close();
  });

  it('Should upload files from disk', async function () {
    //
    await page.goto('https://chercher.tech/practice/popups#', {
      waitUntil: 'networkidle2',
    });
    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.waitForSelector('input[type="file"]'),
      page.click('input[type="file"]'),
    ]);

    // true if the field accepts multiple files, otherwise false
    const isMultiple = await fileChooser.isMultiple();

    // can upload MULTIPLE files when allowed
    if (!isMultiple) {
      await fileChooser.accept(['./test_pdf/A.pdf']);
    } else {
      await fileChooser.accept(['./test_pdf/A.pdf', './test_pdf/B.pdf']);
    }

    // can upload only ONE file
    // elementHandle.uploadFile('./file_Path');
    const up = await page.$('input[type="file"]');
    await up.uploadFile('./test_pdf/B.pdf');

    await page.waitForTimeout(5000);
  });
});
