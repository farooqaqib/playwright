import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

export const test = base.extend({

  // =========================
  // UI LAYER
  // =========================
  app: async ({ page }, use) => {

    const app = {
      login: () => new LoginPage(page),
      dashboard: () => new DashboardPage(page),
    };

    await use(app);
  },


});

export { expect } from '@playwright/test';