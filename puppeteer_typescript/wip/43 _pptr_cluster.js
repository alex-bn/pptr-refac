const { Cluster } = require('puppeteer-cluster');
(async () => {
  // Create cluster with 10 workers
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 10,
    monitor: true,
    timeout: 500000,
    puppeteerOptions: {
      slowMo: 50, // pass the slowMo options otherwise will fail (looking fo a solution)
      headless: true,
    },
  });

  // Print errors to console
  cluster.on('taskerror', (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });

  // Dumb sleep function to wait for page load
  async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  await cluster.task(async ({ page, data: url, worker }) => {
    // const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    // const page = await browser.newPage();

    const messengerFrameSelector = '#web-messenger-container';
    const messengerBubbleSelector = '#messenger-button';
    const messengerInputSelector = '#footer > form > div > textarea';
    const clickDelay = 3000;
    const waitTimeout = 5000;

    const waitForResponse = async (frame, response) => {
      await frame.waitForFunction(
        `document.querySelector("body").innerText.includes("${response}")`
      );
      return;
    };

    const sendMessage = async (inputSelector, message) => {
      await inputSelector.type(message);
      await inputSelector.press('Enter');
      return;
    };

    const clickButton = async (frame, button) => {
      const buttonSelector = await messengerFrame.waitForSelector(
        `#conversation > div.messages-container > div > div.reply-container > button:nth-child(${button}) > span`
      );
      await buttonSelector.click();
    };

    async function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    await page.goto(url);
    await page.setViewport({ width: 1024, height: 768 });
    let frames = await page.frames();
    await page.waitForSelector(messengerFrameSelector, {
      timeout: waitTimeout,
    });
    const messengerFrameContainer = await page.$(messengerFrameSelector);
    const messengerFrame = await messengerFrameContainer.contentFrame();
    const messengerBubble = await messengerFrame.waitForSelector(
      messengerBubbleSelector,
      {
        timeout: waitTimeout,
      }
    );
    await messengerBubble.click();
    let messageInput = await messengerFrame.waitForSelector(
      messengerInputSelector,
      {
        timeout: waitTimeout,
      }
    );

    await sendMessage(messageInput, 'Hello');
    await waitForResponse(messengerFrame, 'What do you think?');
    await clickButton(messengerFrame, 1);
    await waitForResponse(messengerFrame, 'What should l call you?');
    await sendMessage(messageInput, 'Tony Harrison');
    await clickButton(messengerFrame, 2);

    // Create an array of known messenger responses to react to
    responses = [
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
      await clickButton(messengerFrame, 1);
    }

    await page.screenshot({ path: `screenshot${worker.id}.png` });
    await page.screenshot({ path: 'screenshot.png' });
  });

  for (let i = 1; i <= 30; i++) {
    cluster.queue('https://stackchat.com/');
  }
  await cluster.idle();
  await cluster.close();
})();
