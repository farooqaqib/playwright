

const tokenCache = {};
let authHeader = {};

/* =========================
   MAIN API CALL
========================= */
export async function apiCall({
  request,
  method = 'get',
  url,
  data = null,
  params = null,
  headers = {},
  auth = {}
}) {

  const finalHeaders = await buildHeaders(request, auth, headers);

  
  let response;

  switch (method.toLowerCase()) {

    case 'get':
      response = await request.get(url, { headers: finalHeaders, params });
    
      break;

    case 'post':
      response = await request.post(url, { data, headers: finalHeaders });
      break;

    case 'put':
      response = await request.put(url, { data, headers: finalHeaders });
      break;

    case 'patch':
      response = await request.patch(url, { data, headers: finalHeaders });
      break;

    case 'delete':
      response = await request.delete(url, { headers: finalHeaders, params });
      break;

    default:
      throw new Error(`Unsupported method: ${method}`);
  }

  let body = null;

  try {
    body = await response.json();
  } catch (_) {
    // ignore non-json responses
  }

  return {
    status: response.status(),
    body
  };
}


/* =========================
   AUTH HANDLER 
========================= */
async function buildHeaders(request, auth, extraHeaders = {}) {

  //let authHeader = {};

  switch (auth.type) {

    // ---------------- OAuth2 / Bearer ----------------
    case 'oauth2':
    case 'bearer': {
      const token = await getOAuth2Token(request, auth);

      authHeader = {
        Authorization: `Bearer ${token}`
      };
      break;
    }

    // ---------------- Basic Auth ----------------
    case 'basic': {
      const encoded = Buffer.from(
        `${auth.username}:${auth.password}`
      ).toString('base64');

      authHeader = {
        Authorization: `Basic ${encoded}`
      };
      break;
    }

    // ---------------- API Key ----------------
    case 'apikey': {
      authHeader = {
        [auth.keyName || 'x-api-key']: auth.key
      };
      break;
    }

    // ---------------- No Auth ----------------
    case 'none':
    default:
      authHeader = {};
  }

  return {
    'Content-Type': 'application/json',
    ...authHeader,
    ...extraHeaders
  };
}


/* =========================
   OAUTH2 TOKEN (WITH CACHE)
========================= */
export async function getOAuth2Token(
  request,
  { tokenUrl, clientId, clientSecret, scope }
) {

  const cacheKey = `${clientId}:${scope || ''}`;
  const cached = tokenCache[cacheKey];

  console.log('[BEFORE] cacheKey:', cacheKey);
  console.log('[BEFORE] cached value:', tokenCache[cacheKey]);

  // return cached token if valid
  if (cached && Date.now() < cached.expiresAt - 60000) {
    console.log('[OAuth2] Using cached token');
    return cached.token;
  }

  const response = await request.post(tokenUrl, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      ...(scope && { scope })
    }
  });

  if (!response.ok()) {
    throw new Error(
      `OAuth2 failed: ${response.status()} ${await response.text()}`
    );
  }

  const json = await response.json();

  if (!json.access_token) {
    throw new Error('No access_token in OAuth response');
  }

  // store in cache
  tokenCache[cacheKey] = {
    token: json.access_token,
    expiresAt: Date.now() + (json.expires_in || 3600) * 1000
  };

  console.log('[AFTER] cacheKey:', cacheKey);
  console.log('[AFTER] cached value:', tokenCache[cacheKey]);

  return json.access_token;
}