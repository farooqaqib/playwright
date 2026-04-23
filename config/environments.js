// ─────────────────────────────────────────────
// Environment-specific settings (URLs only)
// Selected via TEST_ENV=qa|stage|prod (default: qa)
// ─────────────────────────────────────────────

const environments = {
  qa: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    uiURL: 'https://my.qa.zurple.com',
    username: 'aqib.f2000@gmail.com',
    password: '12345'
  },

  stage: {
    baseURL: 'https://data-api.smartzip-services.com/properties/avm.json?api_key=USgnua3ykBQy4UgVJgFT',
    uiURL: 'https://my.stage01.zurple.com',
    username: 'aqib.f2000@gmail.com',
    password: '12345'
  },

  prod: {
    baseURL: 'https://api.myapp.com',   // real prod API (replace this)
    uiURL: 'https://my.zurple.com',
    username: 'aqib.f2000@gmail.com',
    password: '12345'
  },
};
const env = process.env.TEST_ENV || "qa";

export const currentEnv = environments[env];
export default environments;