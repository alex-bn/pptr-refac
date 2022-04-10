import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ devtools: false });
  const page = await browser.newPage();

  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://pptr.dev/', ['geolocation']);

  await page.goto('https://pptr.dev/', { waitUntil: 'networkidle2' });

  await page.setGeolocation({ latitude: 0, longitude: 0 });

  const coords = await page.evaluate(
    () =>
      new Promise(resolve => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const lat = position.coords.latitude;
              const long = position.coords.longitude;
              resolve({ 'Latitude:': lat, 'Longitude:': long });
            },
            error => {
              console.log('Need access to get location.', error);
            }
          );
        }
      })
  );

  console.log(coords);
  await browser.close();
})();
