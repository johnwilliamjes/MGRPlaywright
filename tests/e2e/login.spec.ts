/**
 * @fileoverview Login tests
 * @author [@gianfranco-maggi](https://github.com/gianfranco-maggi)
 * @description This file contains the tests for the login page
 * @version 1.0.0
 * @since 2026-08-09
 * @requires ../fixtures/orangehrm.fixture
 * @requires ../data/credentials
 */
import { test, expect } from '../fixtures/orangehrm.fixture';
import { adminCredentials } from '../data/credentials';

test.describe('Login', () => {
  test('valid Admin login should land on Dashboard', async ({ page, loginPage }) => {
    const { username, password } = adminCredentials();
    await loginPage.goto();
    await expect.poll(async () => loginPage.isLoginPageDisplayed()).toBeTruthy();

    const dashboardPage = await loginPage.loginAs(username, password);

    await expect.poll(async () => dashboardPage.isDashboardDisplayed()).toBeTruthy();
    await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toHaveText('Dashboard');
    await expect.poll(async () => dashboardPage.isUserMenuDisplayed()).toBeTruthy();
    await expect.poll(async () => dashboardPage.isTimeAtWorkWidgetDisplayed()).toBeTruthy();
  });
});
