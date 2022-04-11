import { Cluster } from 'puppeteer-cluster';

(async () => {
  // #workers
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 10,
    monitor: true,
    timeout: 500000,
    puppeteerOptions: {
      slowMo: 50, // fails without the slowMo opt
      headless: true,
    },
  });

  cluster.on('taskerror', (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });

  await cluster.task(async ({ page, data: url, worker }) => {
    const messengerFrameSelector = '#web-messenger-container';
    const messengerBubbleSelector = '#messenger-button';
    const messengerInputSelector = '#footer > form > div > textarea';
    const clickDelay = 3000;
    const waitTimeout = 5000;

    const waitForResponse = async (frame: any, response: any) => {
      await frame.waitForFunction(
        `document.querySelector('body').innerText.includes('${response}')`
      );
      return;
    };

    const sendMessage = async (inputSelector: any, message: any) => {
      await inputSelector.type(message);
      await inputSelector.press('Enter');
      return;
    };

    const clickButton = async (frame: any, button: any) => {
      const buttonSelector = await messengerFrame?.waitForSelector(
        `#conversation > div.messages-container > div > div.reply-container > button:nth-child(${button}) > span`
      );
      await buttonSelector?.click();
    };

    async function timeout(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    await page.goto(url);
    await page.setViewport({ width: 1024, height: 768 });
    await page.waitForSelector(messengerFrameSelector, {
      timeout: waitTimeout,
    });

    //
    const messengerFrameContainer = await page.$(messengerFrameSelector);
    const messengerFrame = await messengerFrameContainer?.contentFrame();
    const messengerBubble = await messengerFrame?.waitForSelector(
      messengerBubbleSelector,
      { timeout: waitTimeout }
    );

    await messengerBubble?.click();
    let messageInput = await messengerFrame?.waitForSelector(
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
    await page.screenshot({ path: `./screenshots/${Date.now()}cluster.png` });
  });

  // #workers
  for (let i = 1; i <= 10; i++) {
    cluster.queue('https://stackchat.com/');
  }
  await cluster.idle();
  await cluster.close();
})();
