import BaseOp from './BasePo';

class LoginPo extends BaseOp {
  private readonly usernameInput = '#user-name';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login-button';
  private readonly errorMessageContainer = '.error-message-container';

  async go() {
    await this.navigate('/');
  }

  async login(username: string, password: string) {
    await page.type(this.usernameInput, username);
    await page.type(this.passwordInput, password);
    await page.click(this.loginButton);
  }

  async getErrorMEssage(): Promise<string> {
    return this.getElementTextBySelector(this.errorMessageContainer);
  }
}

export default new LoginPo();
