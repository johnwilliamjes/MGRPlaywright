import { test, expect } from '../fixtures/orangehrm.fixture';
import { adminCredentials } from '../data/credentials';

test.describe('PIM Employee List', () => {
  test('after login, navigate to PIM and verify Employee List', async ({ loginPage }) => {
    const { username, password } = adminCredentials();
    await loginPage.goto();

    const dashboardPage = await loginPage.loginAs(username, password);
    await expect.poll(async () => dashboardPage.isDashboardDisplayed()).toBeTruthy();

    const pimPage = await (await dashboardPage.navigateToPim()).openEmployeeList();

    await expect.poll(async () => pimPage.isPimPageDisplayed()).toBeTruthy();
    await expect.poll(async () => pimPage.isSearchFormDisplayed()).toBeTruthy();
    await expect.poll(async () => pimPage.isAddButtonDisplayed()).toBeTruthy();
    await expect.poll(async () => (await pimPage.getRecordsFoundText()).includes('Records Found')).toBeTruthy();
    await expect.poll(async () => pimPage.getEmployeeRowCount()).toBeGreaterThan(0);
  });
});
