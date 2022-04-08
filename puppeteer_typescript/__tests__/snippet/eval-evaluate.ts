import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto('http://example.com/');

  // This method runs document.querySelector within the page and passes it as the first argument to pageFunction

  const text = await page.$eval('h1', element => element.textContent);
  console.log(`Text in the h1 element: ${text}`);

  const link = await page.$eval(
    'p > a',
    element => (<HTMLAnchorElement>element).href
  );

  const link2 = await page.evaluate(() => {
    const element = document.querySelector<HTMLAnchorElement>('p > a');
    return element?.href;
  });

  const innerText = await page.evaluate(() => {
    return Promise.resolve(
      document.querySelector<HTMLElement>(
        'body > div:nth-child(1) > p:nth-child(2)'
      )?.innerText
    );
  });
  /**
   * @workaround can use evaluate()
   * @remarks evaluates a function in the page's context and returns the result.
   * */

  console.log(`Link will redirect to: ${link}`);
  console.log(`Link will redirect to: ${link2}`);
  console.log(`Inner text: ${innerText}`);

  await browser.close();
})();
