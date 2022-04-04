'use strict';
const puppeteer = require('puppeteer');

// Puppeteer #42
// https://stackchat.com/blog/puppeteer-cluster-performance-testing

https: (async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 }); // slowMo required !!!
  const page = await browser.newPage();

  const url = 'https://stackchat.com/';
  const messengerFrameSelector = '#web-messenger-container';
  const messengerBubbleSelector = '#messenger-button';
  const messengerInputSelector = '#footer > form > div > textarea';
  const clickDelay = 3000;
  const waitTimeout = 5000;

  // Helper function 1
  const waitForResponse = async (frame, response) => {
    console.log(`Waiting for ${response}`);
    await frame.waitForFunction(
      `document.querySelector('body').innerText.includes('${response}')`
    );
    return;
  };

  // Helper function 2
  const sendMessage = async (inputSelector, message) => {
    console.log(`Type message ${message}`);
    await inputSelector.type(message);
    await inputSelector.press('Enter');
    return;
  };

  // Helper function 3
  const clickButton = async (frame, button) => {
    console.log(`Clicking button ${button}`);
    const buttonSelector = await messengerFrame.waitForSelector(
      `#conversation > div.messages-container > div > div.reply-container > button:nth-child(${button}) > span`
    );
    await buttonSelector.click();
  };

  // Timeout helper
  async function timeout(ms) {
    console.log(`Pause for ${ms / 1000} seconds`);
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Steps:
  await page.goto(url);
  await page.setViewport({ width: 1024, height: 768 });
  let frames = await page.frames();
  console.log('Getting frame...');
  console.log('Getting frame selector...');
  await page.waitForSelector(messengerFrameSelector, { timeout: waitTimeout });

  //
  const messengerFrameContainer = await page.$(messengerFrameSelector);
  const messengerFrame = await messengerFrameContainer.contentFrame();
  const messengerBubble = await messengerFrame.waitForSelector(
    messengerBubbleSelector,
    { timeout: waitTimeout }
  );

  //
  console.log('Page and Messenger ready');
  console.log('Wait for messenger input');
  //

  await messengerBubble.click();
  let messageInput = await messengerFrame.waitForSelector(
    messengerInputSelector,
    { timeout: waitTimeout }
  );

  await sendMessage(messageInput, 'Hello');
  await waitForResponse(messengerFrame, 'What do you think?');
  await timeout(clickDelay);
  await clickButton(messengerFrame, 1);
  await waitForResponse(messengerFrame, 'What should l call you?');
  await sendMessage(messageInput, 'Joe Adams');
  await timeout(clickDelay * 2);
  await clickButton(messengerFrame, 2);

  // Create an array of known messenger responses to react to
  const responses = [
    'hear about the features?',
    'Sounds pretty cool, huh?',
    'Still following?',
    'integrating social channels',
    'AI capabilities?',
    'following along alright?',
    'Sound good?',
    'a sneaky feature?',
    'competitors basic bots!',
  ];

  for (const response of responses) {
    await waitForResponse(messengerFrame, response);
    await timeout(clickDelay);
    await clickButton(messengerFrame, 1);
  }

  await waitForResponse(messengerFrame, 'to do next');
  await timeout(2000);
  console.log('Taking screenshot and exiting');
  await page.screenshot({ path: 'screenshot.png' });

  // close
  await browser.close();
})();
