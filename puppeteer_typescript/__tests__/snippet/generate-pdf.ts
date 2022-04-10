import puppeteer from 'puppeteer';
import Helper from '../utility-func/utility-functions';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev/');
  await Helper.waitTillHTMLRendered(page);
  await page.pdf({
    path: `../snippet/files/${Date.now()}-page-pdf.pdf`,
    printBackground: true,
    scale: 0.5,
    format: 'letter',
    margin: { top: '50px', bottom: '50px' },
    landscape: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-size: 6rem">This is our custom header! The title is: <span class="title" /></div>"`,
    footerTemplate: `<div style="font-size: 6rem">This is our custom footer! The title is: <span class="title" /></div>"`,
  });

  await browser.close();
})();
