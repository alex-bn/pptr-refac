import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export default class Helper {
  // #
  static timeout = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
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
       **/

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

  // # ✔
  static waitForText = async (
    page: puppeteer.Page,
    selector: string,
    text: string
  ) => {
    try {
      await page.waitForSelector(selector);
      const textLookup = await page.waitForFunction(
        (selector: string, text: string) =>
          document
            .querySelector<HTMLElement>(selector)
            ?.innerText.includes(text),
        { timeout: 5000 },
        selector,
        text
      );
      if (textLookup) return text;
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
      const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click(button),
      ]);

      fileChooser.isMultiple()
        ? console.log('--\xa0process:\xa0isMultiple()\xa0returns\xa0true')
        : console.log('--\xa0process:\xa0isMultiple()\xa0returns\xa0false');

      await fileChooser.accept([file]);
    } catch (error) {
      console.log('Could not load file, keep calm and carry on.', error);
    }
  };

  // #
  static loadMultipleFiles = async (
    page: puppeteer.Page,
    button: string,
    folderPath: string
  ) => {
    try {
      // read folder
      fs.readdir(folderPath, async (err, files) => {
        if (err) {
          return console.log('Unable to read folder: ' + err);
        }
        // make a list of file paths
        let pdfArray: string[] = [];
        files.forEach(file => {
          const filePath = path.join(__dirname, `files/${file}`);
          const pdfPath = path.resolve(filePath).split('\\').join('/');
          pdfArray.push(pdfPath);
        });
        // log number of files
        console.log(`Found ${pdfArray.length} pdf/s in the test folder.`);
        // load files
        await page.waitForSelector(button);
        const [fileChooser] = await Promise.all([
          page.waitForFileChooser(),
          page.click(button),
        ]);
        const pdfFiles = await Promise.all([...pdfArray]);
        await fileChooser.accept(pdfFiles);
      });
    } catch (error) {
      console.log('Could not load file/s, keep calm and carry on.', error);
    }
  };

  // # a
  static loadPage = async (page: puppeteer.Page, url: string) => {
    try {
      await Promise.all([
        page.goto(url, { waitUntil: 'domcontentloaded' }),
        page.waitForResponse(response => response.ok()),
      ]);
    } catch (error) {
      console.log('Could not load page, keep calm and carry on.', error);
    }
  };

  // # b
  static loadUrl = async (page: puppeteer.Page, url: string) => {
    try {
      const promises = [];
      promises.push(page.waitForNavigation());
      await page.goto(url);
      await Promise.all(promises);
    } catch (error) {
      console.log('Could not load url, keep calm and carry on.', error);
    }
  };

  // #
  static type = async (
    page: puppeteer.Page,
    text: string,
    selector: string
  ) => {
    try {
      await page.waitForSelector(selector).then(async () => {
        await page.type(selector, text);
      });
    } catch (error) {
      console.log('Could not type your text, keep calm and carry on.', error);
    }
  };

  // #
  static clickElement = async (
    page: puppeteer.Page,
    selector: string,
    timeout: number = 30000
  ) => {
    await page.waitForSelector(selector, { visible: true, timeout });
    let error;
    while (timeout > 0) {
      try {
        await page.click(selector);
        return;
      } catch (e) {
        await page.waitForTimeout(100);
        timeout -= 100;
        error = e;
      }
    }
    throw error;
  };

  // # is this necessary ?
  static click = async (page: puppeteer.Page, selector: string) => {
    try {
      await Promise.all([page.waitForSelector(selector), page.click(selector)]);
    } catch (error) {
      console.log('Could not click selector, keep calm and carry on.', error);
    }
  };

  // #
  static clickAndLoad = async (page: puppeteer.Page, selector: string) => {
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click(selector),
      ]);
    } catch (error) {
      console.log('Could not click and load, keep calm and carry on.', error);
    }
  };

  // #
  static clickToSelect = async (page: puppeteer.Page, selector: string) => {
    try {
      const input = await page.$(selector);
      await input?.click({ clickCount: 3 });
    } catch (error) {
      console.log('Could not click to clear, keep calm and carry on.', error);
    }
  };

  // # is this necessary ?
  static doubleClick = async (page: puppeteer.Page, selector: string) => {
    try {
      const input = await page.$(selector);
      await input?.click({ clickCount: 2 });
    } catch (error) {
      console.log('Could not double click, keep calm and carry on.', error);
    }
  };

  // #
  static backspaceClear = async (page: puppeteer.Page, selector: string) => {
    try {
      const input = await page.$eval(selector, uiElement => {
        return (<HTMLInputElement>uiElement).value;
      });
      if (input) {
        for (let i = 0; i < input.length; i++) {
          await page.keyboard.press('Backspace', { delay: 50 });
        }
      }
    } catch (error) {
      console.log(
        `Backspace clear doesn't work for "${selector}", keep calm and carry on.`,
        error
      );
    }
  };

  // #
  static clearAll = async (page: puppeteer.Page, selector: string) => {
    try {
      await page.$eval(
        selector,
        uiElement => ((<HTMLInputElement>uiElement).value = '')
      );
    } catch (error) {
      console.log('Could not clear text, keep calm an carry on.', error);
    }
  };

  // #
  static waitTillHTMLRendered = async (
    page: puppeteer.Page,
    timeout = 30000
  ) => {
    /**
     * @see https://stackoverflow.com/questions/52497252/puppeteer-wait-until-page-is-completely-loaded
     */
    const checkDurationMsecs = 1000;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;

    while (checkCounts++ <= maxChecks) {
      let html = await page.content();
      let currentHTMLSize = html.length;

      let bodyHTMLSize = await page.evaluate(
        () => document.body.innerHTML.length
      );

      await console.log(
        'last: ',
        lastHTMLSize,
        ' <> curr: ',
        currentHTMLSize,
        ' body html size: ',
        bodyHTMLSize
      );

      if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
        countStableSizeIterations++;
      else countStableSizeIterations = 0; //reset the counter

      if (countStableSizeIterations >= minStableSizeIterations) {
        console.log('Page fully rendered..');
        break;
      }

      lastHTMLSize = currentHTMLSize;
      await page.waitForTimeout(checkDurationMsecs);
    }
  };

  static getText = async (page: puppeteer.Page, selector: string) => {
    try {
      return await page.$eval(selector, uiElement => {
        return (<HTMLElement>uiElement).innerText;
      });
    } catch (error) {
      console.log(
        `Could not get text from selector: "${selector}", keep calm and carry on.`,
        error
      );
    }
  };

  // #
  static getCount = async (page: puppeteer.Page, selector: string) => {
    try {
      return await page.$$eval(selector, items => items.length);
    } catch (error) {
      console.log(
        `Could not count selectors of type "${selector}", keep calm and carry on.`,
        error
      );
    }
  };

  // # wip
  static shouldExist = async (page: puppeteer.Page, selector: string) => {
    try {
      // true if element is visible
      return await page.$eval(selector, uiElement => {
        if (uiElement) {
          const style = getComputedStyle(uiElement);
          const rect = uiElement.getBoundingClientRect();
          console.log(uiElement);

          return (
            style.visibility !== 'hidden' &&
            !!(rect.bottom || rect.top || rect.height || rect.width)
          );
        }
      });
    } catch (error) {
      console.log(
        `Selector "${selector}" doesn't exist, keep calm and carry on.\n`,
        error
      );
    }
  };

  // # wip + error handling
  static shouldNotExist = async (page: puppeteer.Page, selector: string) => {
    try {
      if (
        (await page.waitForSelector(selector, {
          visible: true,
          hidden: true,
          timeout: 3000,
        })) === null
      ) {
        return true;
      } else {
        // return false ?
        throw console.log('Element is visible ');
      }
    } catch (error) {
      console.log(
        `Selector, "${selector}", is visible and should not be. Keep calm and carry on.`,
        error
      );
    }
  };
}
