const puppeteer = require('puppeteer');
let browser = puppeteer.Browser;

const main = async () => {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { height: 800, width: 600 },
    devtools: true,
  });
  const page = await browser.newPage();
  const links = await gatherLinks();
  let info = [];

  for (const link of links) {
    await page.goto(link);
    const infoes = await page.evaluate(() => {
      let result = [];

      const $ = document.querySelector.bind(document);
      const title = $('div.col-sm-6.product_main > h1');

      const $$ = document.querySelector.bind(document);
      const price = $$('div.col-sm-6.product_main > p:nth-child(2)');

      result.push(title?.innerText, price?.innerText);

      return result;
    });
    info.push(infoes);
  }

  console.log(info);

  try {
    selector =
      '#default > div > div > div > div > section > div:nth-child(2) > div > ul > li.next > a';
    await page.goto('https://books.toscrape.com/');
    const next = await page.waitForSelector(selector);
    while (next) await page.click(selector);
  } catch (e) {
    console.log('oh snap 👌', e);
  }

  await browser.close();
};

main();

const gatherLinks = async () => {
  const page = await browser.newPage();
  await page.goto('https://books.toscrape.com/');
  const links = await page.evaluate(() => {
    const $ = document.querySelectorAll.bind(document);
    const nodeList = $(
      '#default > div > div > div > div > section > div:nth-child(2) > ol > li .product_pod > div > a:nth-child(1)'
    );

    const mapped = Array.from(nodeList).map(element => element.href);
    return mapped;
  });
  await page.close();
  return links;
};
