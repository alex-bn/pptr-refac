'use strict';
const puppeteer = require('puppeteer');

describe('Puppeteer #18', () => {
  let browser;
  let page;

  before('Text description', async function () {
    // use to set up your browser
    // runs once before the first test in this block
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 10,
      devtools: false,
    });
    page = await browser.newPage();
    await page.setDefaultTimeout(10000);
    await page.setDefaultNavigationTimeout(20000);
  });

  after('Text description', async function () {
    // runs once after the last test in this block
    await browser.close();
  });

  beforeEach('Text description', async function () {
    // runs before each test in this block (it block)
  });

  afterEach('Text description', async function () {
    // runs after each test in this block(it block)
  });

  it('Should perform a test step', async function () {
    await page.goto('http://example.com/', { waitUntil: ['networkidle2'] });
  });
});
