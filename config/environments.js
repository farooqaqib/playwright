// ─────────────────────────────────────────────
// Environment-specific settings (URLs only)
// Selected via TEST_ENV=qa|stage|prod (default: qa)
// ─────────────────────────────────────────────

const environments = {

  qa: {
    baseURL: 'https://jsonplaceholder.typicode.com',   // public test API for QA
    uiURL: 'https://my.zurple.com',
  },

  stage: {
    baseURL: 'https://data-api.smartzip-services.com/properties/avm.json?api_key=USgnua3ykBQy4UgVJgFT'
  },

  prod: {
    baseURL: 'https://jsonplaceholder.typicode.com',   // replace with real Prod API
    uiURL: 'https://my.zurple.com',
  },

};
const env = process.env.TEST_ENV || "qa";

export const currentEnv = environments[env];
export default environments;