import { ElementHandle } from 'puppeteer';

export default abstract class BaseOp {
  protected readonly BASE_URL = 'https://www.saucedemo.com';

  abstract go(): Promise<void>;

  async navigate(url: string) {
    await page.goto(`${this.BASE_URL}${url}`);
  }

  async getElementTextBySelector(selector: string): Promise<string> {
    const element = await page.$(selector);
    if (!element) {
      return '';
    }
    return page.evaluate((el: HTMLElement) => el.textContent || '', element);
  }

  async getElementText(element: ElementHandle<HTMLElement>): Promise<string> {
    return element.evaluate((el: HTMLElement) => el.textContent || '');
  }

  async autoLogin(): Promise<void> {
    await page.type('#user-name', 'standard_user');
    await page.type('#password', 'secret_sauce');
    await page.click('#login-button');
  }
}
