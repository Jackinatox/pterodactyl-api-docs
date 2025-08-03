# User Management

Administrative functions for managing panel users.

## List Users

**GET** `/api/application/users`

List all users in the panel.

**Include Parameters:**
- `servers` - Include user's servers

**Filters:**
- `filter[email]` - Filter by email
- `filter[uuid]` - Filter by UUID
- `filter[username]` - Filter by username
- `filter[external_id]` - Filter by external ID

**Sort Options:**
- `sort=id` - Sort by ID
- `sort=uuid` - Sort by UUID  
- `sort=-created_at` - Sort by creation date (newest first)

```bash
curl -X GET "https://your-panel.com/api/application/users?include=servers&sort=-created_at" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Get User Details

**GET** `/api/application/users/{user}`

Get details of a specific user.

**Include Parameters:**
- `servers` - Include user's servers

## Get User by External ID

**GET** `/api/application/users/external/{external_id}`

Get user details using an external identifier.

**Include Parameters:**
- `servers` - Include user's servers

```bash
curl -X GET "https://your-panel.com/api/application/users/external/my-external-id" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Create User

**POST** `/api/application/users`

Create a new user.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User's email address |
| username | string | Yes | Username |
| first_name | string | Yes | First name |
| last_name | string | Yes | Last name |
| external_id | string | No | External identifier |
| password | string | No | Password (generated if empty) |
| root_admin | boolean | No | Admin privileges (default: false) |
| language | string | No | Language code (default: en) |

```bash
curl -X POST "https://your-panel.com/api/application/users" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "newuser",
    "first_name": "John",
    "last_name": "Doe",
    "root_admin": false
  }'
```

## Update User

**PATCH** `/api/application/users/{user}`

Update an existing user.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User's email address |
| username | string | Yes | Username |
| first_name | string | Yes | First name |
| last_name | string | Yes | Last name |
| external_id | string | No | External identifier |
| password | string | No | New password |
| root_admin | boolean | No | Admin privileges |
| language | string | No | Language code |

## Delete User

**DELETE** `/api/application/users/{user}`

Delete a user from the panel.

```bash
curl -X DELETE "https://your-panel.com/api/application/users/{user}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

 