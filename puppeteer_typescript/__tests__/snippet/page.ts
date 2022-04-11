import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  //
  // const page2 = await browser.newPage();
  // const page3 = await browser.newPage();
  // console.log((await browser.pages()).length);

  // print content of the main frame
  // console.log(await page.mainFrame().content());

  // similar to:

  const response = await page.goto('https://pptr.dev', {
    waitUntil: 'domcontentloaded',
  });
  await page.bringToFront();
  console.log(response.headers());
  console.log(response.status());
  console.log(response.ok());
  console.log(response.securityDetails());
  console.log(response.remoteAddress());

  const html = await page.content();
  // console.log(html);

  //
  // const initializedPages = await browser.pages();
  // console.log(initializedPages.length);

  //
  await browser.close();
})();
