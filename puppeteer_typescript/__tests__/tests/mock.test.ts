import helper from '../helpers/functions';

describe('test', () => {
  it.skip('should load google homepage', async () => {
    await page.goto('https://google.com', { waitUntil: 'load' });

    const agree = await page.$('#L2AGLb > div');
    await agree?.click();
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    const title = await page.title();
    expect(title).toEqual('Google');
    await page.screenshot({
      path: `${__dirname}/screenshots/${Date.now()}-google.png`,
    });
  });

  it.skip('should take a screenshot of the wiki home page', async () => {
    await page.goto('https://wikipedia.com', { waitUntil: 'load' });
    await page.screenshot({
      path: `${__dirname}/screenshots/${Date.now()}-wiki.png`,
    });
  });

  it('should upload a file and receive confirmation', async () => {
    await page.goto('https://the-internet.herokuapp.com/upload', {
      waitUntil: 'domcontentloaded',
    });
    await helper.loadFile(page, '#file-upload', `${__dirname}/files/pdf.pdf`);
    await page.click('#file-submit');
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await helper.timeout(1250);
    await helper.waitForText(page, 'body', 'File Uploaded!').then(text => {
      expect(text).toBe('File Uploaded!');
    });
  });
});
