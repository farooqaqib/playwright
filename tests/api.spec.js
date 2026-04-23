/*import { test, expect } from '@playwright/test';

test('Basic API Test', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data.id).toBe(1);
  console.log('Test passed with data:', data);
});


*/

import { test, expect } from '@playwright/test';
import { apiCall } from '../api/apiHelper.js';
import environments from '../config/environments.js';
import { currentEnv } from '../config/environments.js';

/*
test('GET users', async ({ request }) => {

  const res = await apiCall({
    request,
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/users'
  });

  expect(res.status).toBe(200);
});*/





test('GET AVM ', async ({ request }) => {

  const res = await apiCall({
    request,
    method: 'get',
    url:  currentEnv.baseURL,
    auth: {
      type: 'basic',
      username: '8cbf504e',
      password: 'LgXslTGttBrSqGL9Ovhv'
    },
    params: { street_address: '108 NICHOLSON DR', city: 'DAVENPORT', state: 'FL' }
    
  });

  await expect(res.status).toBe(200);
await expect(res.body.data.avm_high).toBe(257574);
  
}

);

console.log('AVM test completed');


