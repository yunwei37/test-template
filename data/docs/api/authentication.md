# Authentication

Learn how to authenticate with the API.

## Overview

The API uses bearer token authentication. You need to include an authorization header with each request.

## Getting an API Key

1. Log in to your account
2. Navigate to Settings > API Keys
3. Click "Generate New Key"
4. Copy and store the key securely

## Making Authenticated Requests

Include the API key in the Authorization header:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.example.com/v1/users
```

## JavaScript Example

```javascript
const response = await fetch('https://api.example.com/v1/users', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 401 | Unauthorized - Invalid or missing API key |
| 403 | Forbidden - API key doesn't have required permissions |
| 429 | Too Many Requests - Rate limit exceeded |

## Rate Limits

- 1000 requests per hour for authenticated users
- 100 requests per hour for unauthenticated requests 