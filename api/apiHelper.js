export async function apiCall({
  request,
  method = 'get',
  url,
  data = null,
  params = null,
  headers = {},
  auth = {}
}) {

  const finalHeaders = buildHeaders(auth, headers);

  let response;

  switch (method.toLowerCase()) {

    case 'get':
      response = await request.get(url, {
        headers: finalHeaders,
        params
      });
      break;

    case 'post':
      response = await request.post(url, {
        data,
        headers: finalHeaders
      });
      break;

    case 'put':
      response = await request.put(url, {
        data,
        headers: finalHeaders
      });
      break;

    case 'patch':
      response = await request.patch(url, {
        data,
        headers: finalHeaders
      });
      break;

    case 'delete':
      response = await request.delete(url, {
        headers: finalHeaders,
        params
      });
      break;

    default:
      throw new Error(`Unsupported method: ${method}`);
  }

  let body = null;

  try {
    body = await response.json();
    console.log(`API Response [${method.toUpperCase()}] ${url}:`, body);
  } catch (e) {
    // non-json response
  }

  return {
    status: response.status(),
    body
  };
}


/* =========================
   AUTH HANDLER (CLEAN)
========================= */
function buildHeaders(auth, extraHeaders = {}) {

  let authHeader = {};

  switch (auth.type) {

    case 'bearer':
      authHeader = {
        Authorization: `Bearer ${auth.token}`
      };
      break;

    case 'basic':
      const encoded = Buffer.from(
        `${auth.username}:${auth.password}`
      ).toString('base64');

      authHeader = {
        Authorization: `Basic ${encoded}`
      };
      break;

    case 'apikey':
      authHeader = {
        [auth.keyName || 'x-api-key']: auth.key
      };
      break;

    default:
      authHeader = {};
  }

  return {
    'Content-Type': 'application/json',
    ...authHeader,
    ...extraHeaders
  };
}