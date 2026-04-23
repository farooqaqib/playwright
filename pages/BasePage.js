export class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    /* ---------------- NAVIGATION ---------------- */
  
    async goto(path) {
      await this.page.goto(path);
    }
  
    async reload() {
      await this.page.reload();
    }
  
    async waitForURL(url) {
      await this.page.waitForURL(url);
    }
  
    /* ---------------- ELEMENT ACTIONS ---------------- */
  
    locator(selector) {
      return this.page.locator(selector);
    }
  
    async click(selector) {
      await this.page.locator(selector).click();
    }
  
    async doubleClick(selector) {
      await this.page.locator(selector).dblclick();
    }
  
    async fill(selector, value) {
      await this.page.locator(selector).fill(value);
    }
  
    async type(selector, value) {
      await this.page.locator(selector).type(value);
    }
  
    async press(selector, key) {
      await this.page.locator(selector).press(key);
    }
  
    async hover(selector) {
      await this.page.locator(selector).hover();
    }
  
    async check(selector) {
      await this.page.locator(selector).check();
    }
  
    async uncheck(selector) {
      await this.page.locator(selector).uncheck();
    }
  
    async upload(selector, filePath) {
      await this.page.setInputFiles(selector, filePath);
    }
  
    async selectByText(selector, text) {
      await this.page.locator(selector).selectOption({ label: text });
    }
  
    async selectByValue(selector, value) {
      await this.page.locator(selector).selectOption(value);
    }
  
    /* ---------------- WAIT HELPERS ---------------- */
  
    async waitForVisible(selector) {
      await this.page.locator(selector).waitFor({ state: 'visible' });
    }
  
    async waitForHidden(selector) {
      await this.page.locator(selector).waitFor({ state: 'hidden' });
    }
  
    async waitForEnabled(selector) {
      await this.page.waitForSelector(selector, { state: 'attached' });
    }
  
    /* ---------------- ASSERTION HELPERS ---------------- */
  
    async isVisible(selector) {
      return await this.page.locator(selector).isVisible();
    }

    getByRole(role, options = {}) {
        return this.page.getByRole(role, options);
      }
  
    async isHidden(selector) {
      return await this.page.locator(selector).isHidden();
    }
  
    async isEnabled(selector) {
      return await this.page.locator(selector).isEnabled();
    }
  
    async getText(selector) {
      return await this.page.locator(selector).textContent();
    }
  
    async getValue(selector) {
      return await this.page.locator(selector).inputValue();
    }
  
    /* ---------------- ADVANCED UTILITIES ---------------- */
  
    async screenshot(name = 'screenshot') {
      await this.page.screenshot({ path: `screenshots/${name}.png` });
    }
  
    async pause() {
      await this.page.pause();
    }
  
    async getCount(selector) {
      return await this.page.locator(selector).count();
    }
  
    async scrollIntoView(selector) {
      await this.page.locator(selector).scrollIntoViewIfNeeded();
    }
  }