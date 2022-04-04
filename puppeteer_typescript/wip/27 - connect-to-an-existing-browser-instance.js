'use strict';
const puppeteer = require('puppeteer');
const axios = require('axios');
const chromeLauncher = require('chrome-launcher');

// Puppeteer #27

(async () => {
  // Initializing a chrome instance manually
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const response = await axios.get(
    `http://localhost:${chrome.port}/json/version`
  );

  const { webSocketDebuggerUrl } = response.data;
  // websocket endpoint:
  console.log(webSocketDebuggerUrl);

  // connect() method simply attaches a browser instance to puppeteer, all we have to do is supplying the url details of this instance
  // Connecting the instance using `browserWSEndpoint`
  const browser = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
  });
  console.log(browser);

  const page = await browser.newPage();
  await page.goto('http://cnn.com/');
  await page.waitForTimeout(5000);

  await browser.close();
  await chrome.kill();
})();
