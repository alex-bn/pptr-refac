'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #34

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://pptr.dev');

  await page.waitForSelector('sidebar-component');
  await page.waitForTimeout(3000);
  await page.mouse.click(40, 150, { clickCount: 2 });

  // await page.mouse.move(40, 150);
  // await page.mouse.down(40, 150);
  // await page.mouse.up(40, 150);

  // simplifies the usage in order to not mess with coordinates but rather merely select the element
  // await page.hover('sidebar-component :nth-child(3)');

  // mouse wheel
  await page.goto(
    'https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/API/Element/wheel_event/_sample_.Scaling_an_element_via_the_wheel.html'
  );
  await page.waitForTimeout(3000);
  await page.hover('div');
  await page.mouse.wheel({ deltaY: -200 });

  // drag&drop
  await page.mouse.move(0, 0);
  await page.mouse.down();

  await page.mouse.move(100, 100);
  await page.mouse.up();

  // await browser.close();
})();
