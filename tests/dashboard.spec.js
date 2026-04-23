// tests/dashboard/dashboard.spec.js


import { test, expect } from '../fixtures/testFixtures.js';


test('dashboard loads correctly @regression', async ({ app }) => {

  const login = app.login();
  await login.openLoginPage();
  await login.login('user', 'pass');

  const dashboard = app.dashboard();
  await dashboard.Dashboardloaded();

  await expect(
    dashboard.getByRole('heading', { name: 'Engaged Leads' })
  ).toBeVisible();

});