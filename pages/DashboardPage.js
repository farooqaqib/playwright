import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
    constructor(page) {
        super(page);   // ✅ MUST CALL PARENT
      }


    async Dashboardloaded(){

        return await this.page.url().includes('dashboard');
    }
}