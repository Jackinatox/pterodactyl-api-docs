# Account Management

Manage your account settings, 2FA, email, password, and API keys.

## Get Account Details

**GET** `/api/client/account`

Retrieves your account information.

```bash
curl -X GET "https://your-panel.com/api/client/account" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

**Response:**
```json
{
  "object": "user",
  "attributes": {
    "id": 1,
    "admin": false,
    "username": "user123",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "language": "en"
  }
}
```

## Two-Factor Authentication

### Get 2FA Setup Details
**GET** `/api/client/account/two-factor`

Returns QR code data for setting up 2FA.

```bash
curl -X GET "https://your-panel.com/api/client/account/two-factor" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

### Enable 2FA
**POST** `/api/client/account/two-factor`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| code  | string | Yes | TOTP code from authenticator |

### Disable 2FA
**DELETE** `/api/client/account/two-factor`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| password | string | Yes | Current password |

## Update Email

**PUT** `/api/client/account/email`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | New email address |
| password | string | Yes | Current password |

## Update Password

**PUT** `/api/client/account/password`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| current_password | string | Yes | Current password |
| password | string | Yes | New password |
| password_confirmation | string | Yes | Confirm new password |

## API Keys

### List API Keys
**GET** `/api/client/account/api-keys`

```bash
curl -X GET "https://your-panel.com/api/client/account/api-keys" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

### Create API Key
**POST** `/api/client/account/api-keys`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| description | string | Yes | Key description |
| allowed_ips | array | No | Allowed IP addresses |

```bash
curl -X POST "https://your-panel.com/api/client/account/api-keys" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"description": "My API Key"}'
```

### Delete API Key
**DELETE** `/api/client/account/api-keys/{identifier}`

```bash
curl -X DELETE "https://your-panel.com/api/client/account/api-keys/{identifier}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
``` 