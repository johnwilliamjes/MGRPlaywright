import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PimPage extends BasePage {
  private readonly header: Locator;
  private readonly employeeListTab: Locator;
  private readonly employeeNameInput: Locator;
  private readonly searchButton: Locator;
  private readonly resetButton: Locator;
  private readonly recordsFoundLabel: Locator;
  private readonly tableRows: Locator;
  private readonly addButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('h6.oxd-topbar-header-breadcrumb-module');
    this.employeeListTab = page.getByRole('link', { name: 'Employee List' });
    this.employeeNameInput = page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Name' })
      .getByRole('textbox');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.recordsFoundLabel = page.getByText(/Records Found/);
    this.tableRows = page.locator('.oxd-table-body .oxd-table-card');
    this.addButton = page.getByRole('button', { name: 'Add' });
  }

  async isPimPageDisplayed(): Promise<boolean> {
    const visible = await this.header.isVisible();
    if (!visible) return false;
    const text = (await this.header.textContent())?.trim() ?? '';
    return text.toLowerCase() === 'pim';
  }

  async openEmployeeList(): Promise<this> {
    await this.employeeListTab.click();
    await this.employeeNameInput.waitFor({ state: 'visible' });
    return this;
  }

  async getRecordsFoundText(): Promise<string> {
    return (await this.recordsFoundLabel.textContent())?.trim() ?? '';
  }

  async getEmployeeRowCount(): Promise<number> {
    return this.tableRows.count();
  }

  async isAddButtonDisplayed(): Promise<boolean> {
    return this.addButton.isVisible();
  }

  async isSearchFormDisplayed(): Promise<boolean> {
    return (
      (await this.employeeNameInput.isVisible()) &&
      (await this.searchButton.isVisible()) &&
      (await this.resetButton.isVisible())
    );
  }
}
