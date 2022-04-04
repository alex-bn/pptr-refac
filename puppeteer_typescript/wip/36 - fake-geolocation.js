'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #36

(async () => {
  const browser = await puppeteer.launch({ devtools: true });
  const page = await browser.newPage();

  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://pptr.dev/', ['geolocation']);

  await page.goto('https://pptr.dev/', { waitUntil: 'networkidle2' });

  await page.setGeolocation({ latitude: 90, longitude: 0 });

  const coords = await page.evaluate(
    () =>
      new Promise(resolve =>
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) =>
            resolve({ latitude, longitude })
        )
      )
  );
  console.log(coords);
  // await browser.close();
})();
