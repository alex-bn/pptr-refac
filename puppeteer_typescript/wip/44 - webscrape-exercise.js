const puppeteer = require('puppeteer');

let browser = puppeteer.Browser;

const main = async () => {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      height: 800,
      width: 600,
    },
  });
  const page = await browser.newPage();
  const links = await gatherLinks();
  let titles = [];

  for (const link of links) {
    await page.goto(link);
    const title = await page.evaluate(() => {
      const $ = document.querySelector.bind(document);
      const titleSelector = $('div.product-details-tile__title-wrapper > h1');
      return titleSelector?.innerText;
    });

    titles.push(title);
  }
  console.log('titles', titles);
  await browser.close();
};

main();

const gatherLinks = async () => {
  const page = await browser.newPage();
  await page.goto('https://www.tesco.com/groceries/en-GB/shop/fresh-food/all');

  const links = await page.evaluate(() => {
    const $ = document.querySelectorAll.bind(document);
    const nodes = $(
      '#product-list > div.product-list-view.has-trolley > div.product-list-container > div.product-lists > div > div.category.product-list--page.product-list--current-page > div > ul > li .tile-content > a:nth-child(1)'
    );

    const mapped = Array.from(nodes).map(element => element.href);
    return mapped;
  });
  await page.close();
  return links;
};
