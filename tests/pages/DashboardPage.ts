import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { PimPage } from './PimPage';

export class DashboardPage extends BasePage {
  private readonly header: Locator;
  private readonly userMenu: Locator;
  private readonly timeAtWorkWidget: Locator;
  private readonly pimMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('h6.oxd-topbar-header-breadcrumb-module');
    this.userMenu = page.locator('.oxd-userdropdown-tab');
    this.timeAtWorkWidget = page.getByText('Time at Work', { exact: true });
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
  }

  async isDashboardDisplayed(): Promise<boolean> {
    const visible = await this.header.isVisible();
    if (!visible) return false;
    const text = (await this.header.textContent())?.trim() ?? '';
    return text.toLowerCase() === 'dashboard';
  }

  async getHeaderText(): Promise<string> {
    return (await this.header.textContent())?.trim() ?? '';
  }

  async isUserMenuDisplayed(): Promise<boolean> {
    return this.userMenu.isVisible();
  }

  async isTimeAtWorkWidgetDisplayed(): Promise<boolean> {
    return this.timeAtWorkWidget.isVisible();
  }

  async navigateToPim(): Promise<PimPage> {
    await this.pimMenu.click();
    return new PimPage(this.page);
  }
}
