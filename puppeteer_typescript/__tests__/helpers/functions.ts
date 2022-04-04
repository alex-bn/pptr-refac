import puppeteer from 'puppeteer';

export default class Helper {
  // #
  static timeout = async (ms: number) => {
    return new Promise(res => setTimeout(res, ms));
  };

  // #
  static interceptReq = async (page: puppeteer.Page): Promise<void> => {
    /**
     * @link https://pptr.dev/
     * @important setRequestInterception works only with a headless browser
     */
    await page.setRequestInterception(true);

    page.on('request', r => {
      /**
       * @see https://stackoverflow.com/a/47166637/3645650
       */

      if (
        [
          //'stylesheet',
          'image',
          'media',
          'font',
        ].indexOf(r.resourceType()) !== -1
      ) {
        r.abort();
      } else {
        r.continue();
      }
    });
  };

  // #
  static waitForText = async (
    page: puppeteer.Page,
    selector: string,
    text: string
  ) => {
    try {
      await page.waitForSelector(selector);
      const res = await page.waitForFunction(
        (selector: string, text: string) =>
          document
            .querySelector<HTMLElement>(selector)
            ?.innerText.includes(text),
        { timeout: 5000 },
        selector,
        text
      );
      if (res) return text;
    } catch (error: any) {
      console.log(
        `Failed to wait for text: "${text}", keep calm and carry on.`,
        error
      );
    }
  };

  // #
  static loadFile = async (
    page: puppeteer.Page,
    // selector: string,
    button: string,
    file: string
  ) => {
    try {
      // await page.waitForSelector(selector);
      const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click(button),
      ]);

      fileChooser.isMultiple()
        ? console.log(
            '--\xa0process:\xa0allows\xa0multiple\xa0file\xa0election'
          )
        : console.log(
            '--\xa0process:\xa0cannot\xa0upload\xa0multiple\xa0files'
          );

      await fileChooser.accept([file]);
    } catch (error) {
      console.log('Could not load file, keep calm and carry on.', error);
    }
  };
}
//   // #1
//   takeScreenshot: async function (page) {
//     try {
//       await page.screenshot({
//         path: `screenshot-${Date.now()}.png`,
//         type: 'png',
//         fullPage: true,
//       });
//     } catch (error) {
//       console.error(error);
//       console.info(`Failed to take screenshot but test will proceed...`);
//       return Promise.resolve();
//     }
//   },

//

//   // #3
//   loadUrl: async function (page, url) {
//     try {
//       await Promise.all([
//         page.goto(url, { waitUntil: 'domcontentloaded' }),
//         page.waitForResponse(response => response.ok()),
//       ]);
//     } catch (error) {
//       console.log(error);
//       throw new Error(`Could not load page.`);
//     }
//   },

//   click: async function (page, selector) {
//     try {
//       await page.waitForSelector(selector);
//       await page.click(selector);
//     } catch (error) {
//       console.log(error);
//       throw new Error(`Could not click on element with selector: ${selector}.`);
//     }
//   },

//   // #4
//   clickAndLoad: async function (page, selector) {
//     try {
//       await Promise.all([
//         page.click(selector),
//         page.waitForNavigation({ waitUntil: 'networkidle2' }),
//       ]);
//     } catch (error) {
//       console.log(error);
//       throw new Error(
//         `Could not click and load on element with selector: ${selector}`
//       );
//     }
//   },

//   // #5 clicking 3 times
//   clickToClear: async function (page, selector) {
//     try {
//       await page.waitForSelector(selector);
//       const input = await page.$(selector);
//       await input.click({ clickCount: 3 });
//     } catch (error) {
//       console.log(error);
//       throw new Error(`Could not click on: ${selector} to select text.`);
//     }
//   },

//   // #6
//   doubleClick: async function (page, selector) {
//     try {
//       await page.waitForSelector(selector);
//       const input = await page.$(selector);
//       await input.click({ clickCount: 2 });
//     } catch (error) {
//       console.log(error);
//       throw new Error(`Could not double-click on: ${selector}.`);
//     }
//   },

//   // #7 backspace - > has a limit of 18 chars when it lands on the input filed
//   backspaceClear: async function (page, selector) {
//     try {
//       const input = await page.$eval(selector, el => el.value);
//       for (let i = 0; i < input.length; i++) {
//         await page.keyboard.press('Backspace');
//       }
//     } catch (error) {
//       console.log(error);
//       throw new Error(`Could not clear the filed for selector: ${selector}`);
//     }
//   },

//   // #8
//   clearAll: async function (page, selector) {
//     try {
//       await page.$eval(selector, el => (el.value = ''));
//     } catch (error) {
//       console.log(error);
//       throw new Error(`Could not find selector: ${selector}`);
//     }
//   },

//   // #9 internet gem: the beast
//   waitTillHTMLRendered: async function (page, timeout = 30000) {
//     // https://stackoverflow.com/questions/52497252/puppeteer-wait-until-page-is-completely-loaded
//     const checkDurationMsecs = 1000;
//     const maxChecks = timeout / checkDurationMsecs;
//     let lastHTMLSize = 0;
//     let checkCounts = 1;
//     let countStableSizeIterations = 0;
//     const minStableSizeIterations = 3;

//     while (checkCounts++ <= maxChecks) {
//       let html = await page.content();
//       let currentHTMLSize = html.length;

//       let bodyHTMLSize = await page.evaluate(
//         () => document.body.innerHTML.length
//       );

//       await console.log(
//         'last: ',
//         lastHTMLSize,
//         ' <> curr: ',
//         currentHTMLSize,
//         ' body html size: ',
//         bodyHTMLSize
//       );

//       if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
//         countStableSizeIterations++;
//       else countStableSizeIterations = 0; //reset the counter

//       if (countStableSizeIterations >= minStableSizeIterations) {
//         console.log('Page fully rendered..');
//         break;
//       }

//       lastHTMLSize = currentHTMLSize;
//       await page.waitForTimeout(checkDurationMsecs);
//     }
//   },

//   // #10
//   type: async function (page, text, selector) {
//     try {
//       await page.waitForSelector(selector);
//       await page.type(selector, text);
//     } catch (error) {
//       console.log(error);
//       throw new Error(`Selector: ${selector}, not found.`);
//     }
//   },

//   // #11
//   getText: async function (page, selector) {
//     try {
//       await page.waitForSelector(selector);
//       await page.$eval(selector, e => e.innerHTML);
//     } catch (error) {
//       console.log(error);
//       throw new Error(`Could not get text from selector: ${selector}.`);
//     }
//   },

//   // #12
//   getCount: async function (page, selector) {
//     try {
//       await page.waitForSelector(selector);
//       await page.$$eval(selector, items => items.length);
//     } catch (error) {
//       console.log(error);
//       throw new Error(`Could not get count of selector: ${selector}.`);
//     }
//   },

//   // #13 ✔
//   waitForText: async function (page, selector, text) {
//     try {
//       await page.waitForSelector(selector);
//       await page.waitForFunction(
//         (selector, text) =>
//           document.querySelector(selector).innerText.includes(text),
//         { timeout: 5000 },
//         selector,
//         text
//       );
//     } catch (error) {
//       // console.error(error);
//       console.info(
//         `Helper function #13: failed to wait for text: ${text}, but test will proceed...`,
//         '\n' + error.name + ': ' + error.message
//       );
//     }
//   },

//   // #14
//   pressKey: async function (page, key) {
//     try {
//       await page.keyboard.press(key);
//     } catch (error) {
//       console.log(error);
//       throw new Error(`Could not press key: ${key}.`);
//     }
//   },

//   // #15
//   shouldExist: async function (page, selector) {
//     try {
//       await page.waitForSelector(selector, { visible: true });
//     } catch (error) {
//       console.log(error);
//       throw new Error(`Selector: ${selector}, does not exist.`);
//     }
//   },

//   // #16
//   shouldNotExist: async function (page, selector) {
//     try {
//       await page.waitForTimeout(() => !document.querySelector(selector));
//     } catch (error) {
//       console.log(error);
//       throw new Error(`Selector: ${selector} is visible and it should not be.`);
//     }
//   },

//   // #17 disabled button WIP
//   isDisabled: async function (page, selector) {
//     try {
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   // Using page.$()
//   // const is_disabled = await page.$('button[disabled]') !== null;

//   // // Using page.$$()
//   // const is_disabled = (await page.$$('button[disabled]')).length !== 0;

//   // // Using page.$eval()
//   // const is_disabled = await page.$eval('button[disabled]', button => button !== null).catch(error => error.toString() !== 'Error: Error: failed to find element matching selector "button[disabled]"');

//   // // Using page.$$eval()
//   // const is_disabled = await page.$$eval('button[disabled]', buttons => buttons.length !== 0);

//   // // Using page.$x()
//   // const is_disabled = (await page.$x('//button[@disabled]')).length !== 0;

//   // // Using page.evaluate()
//   // const is_disabled = await page.evaluate(() => document.querySelector('button[disabled]') !== null);
// };
