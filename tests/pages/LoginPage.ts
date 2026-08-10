import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { DashboardPage } from './DashboardPage';

export class LoginPage extends BasePage {
  private readonly heading: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly invalidCredentialsAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Login' });
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.invalidCredentialsAlert = page.locator('.oxd-alert-content-text');
  }

  async goto(): Promise<this> {
    await this.page.goto('/');
    return this;
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return this.heading.isVisible();
  }

  async enterUsername(username: string): Promise<this> {
    await this.usernameInput.fill(username);
    return this;
  }

  async enterPassword(password: string): Promise<this> {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLogin(): Promise<DashboardPage> {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async loginAs(username: string, password: string): Promise<DashboardPage> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    return this.clickLogin();
  }

  async getInvalidCredentialsMessage(): Promise<string> {
    return (await this.invalidCredentialsAlert.textContent())?.trim() ?? '';
  }
}
