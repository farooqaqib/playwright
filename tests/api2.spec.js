import { test, expect } from '@playwright/test';
import { apiCall, getOAuth2Token } from '../api/apiHelper.js';
import { currentEnv } from '../config/environments.js';


// ─────────────────────────────────────────────────────────────
// BASIC AUTH
// ─────────────────────────────────────────────────────────────
test('GET AVM', async ({ request }) => {

  const res = await apiCall({
    request,
    method: 'get',
    url: currentEnv.baseURL,
    auth: {
      type: 'basic',
      username: process.env.API_USER,
      password: process.env.API_PASS
    },
    params: { street_address: '108 NICHOLSON DR', city: 'DAVENPORT', state: 'FL' }
  });

  expect(res.status).toBe(200);
  expect(res.body.data.avm_high).toBe(257574);
});

// ─────────────────────────────────────────────────────────────
// BEARER — static / long-lived token from env var
// ─────────────────────────────────────────────────────────────

/*
test('GET post - bearer token (static)', async ({ request }) => {

  const res = await apiCall({
    request,
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    auth: {
      type: 'bearer',
      token: process.env.STATIC_TOKEN
    }
  });

  expect(res.status).toBe(200);
  expect(res.body.id).toBe(1);
});
*/
// ─────────────────────────────────────────────────────────────
// OAUTH2 — dynamic token fetch via client credentials
// ─────────────────────────────────────────────────────────────


test('GET post - oauth2 (dynamic token fetch)', async ({ request }) => {
    console.log('\n--- First request (should fetch new token) ---');

   const res = await apiCall({
    request,
    method: 'get',
    url: "https://listings.constellation1apis.com/OData/Property?$expand=Member&$top=1&$ignorenulls=true&$filter=(OriginatingSystemName eq 'CentralVirginia') and MlsStatus eq 'Active'",
    auth: {
      type: 'oauth2',
      tokenUrl: 'https://authenticate.constellation1apis.com/oauth2/token',
      clientId: '3ab70bbjh7htc1f88ka1mglhts',
      clientSecret: '16lcp3jad9ru0mdrk6scemqmmdkbg0i5bfcakgnlg45vk2nngmk1',
      scope: 'read:api'
    }
  });

    expect(res.status).toBe(200);
});


  test('GET post - oauth2 (Cached token fetch)', async ({ request }) => {
    console.log('\n--- Second request (should fetch new token) ---');

  const res2 = await apiCall({
    request,
    method: 'get',
    url: "https://listings.constellation1apis.com/OData/Property?$expand=Member&$top=2&$ignorenulls=true&$filter=(OriginatingSystemName eq 'CentralVirginia') and MlsStatus eq 'Active'",
    auth: {
      type: 'oauth2',
      tokenUrl: 'https://authenticate.constellation1apis.com/oauth2/token',
      clientId: '3ab70bbjh7htc1f88ka1mglhts',
      clientSecret: '16lcp3jad9ru0mdrk6scemqmmdkbg0i5bfcakgnlg45vk2nngmk1',
      scope: 'read:api'
    }
  });


  expect(res2.status).toBe(200);
});


