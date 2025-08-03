# Database Management

Manage server databases - create, list, rotate passwords, and delete databases.

## List Databases

**GET** `/api/client/servers/{server}/databases`

List all databases for a server.

**Include Parameters:**
- `password` - Include database passwords in response

```bash
curl -X GET "https://your-panel.com/api/client/servers/{server}/databases?include=password" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

**Response:**
```json
{
  "object": "list",
  "data": [
    {
      "object": "server_database",
      "attributes": {
        "id": "bEY4yAD5",
        "host": {
          "address": "127.0.0.1",
          "port": 3306
        },
        "name": "s1_database",
        "username": "u1_username",
        "connections_from": "%",
        "max_connections": 0
      }
    }
  ]
}
```

## Get Database Details

**GET** `/api/client/servers/{server}/databases/{database}`

Get details of a specific database.

```bash
curl -X GET "https://your-panel.com/api/client/servers/{server}/databases/{database}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Create Database

**POST** `/api/client/servers/{server}/databases`

Create a new database for the server.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| database | string | Yes | Database name |
| remote | string | Yes | Remote access (usually `%`) |

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/databases" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "database": "my_database",
    "remote": "%"
  }'
```

## Rotate Database Password

**POST** `/api/client/servers/{server}/databases/{database}/rotate-password`

Generate a new password for the database user.

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/databases/{database}/rotate-password" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

**Response:**
```json
{
  "object": "server_database",
  "attributes": {
    "id": "bEY4yAD5",
    "host": {
      "address": "127.0.0.1",
      "port": 3306
    },
    "name": "s1_database",
    "username": "u1_username",
    "connections_from": "%",
    "max_connections": 0,
    "relationships": {
      "password": {
        "object": "database_password",
        "attributes": {
          "password": "newRandomPassword123"
        }
      }
    }
  }
}
```

## Delete Database

**DELETE** `/api/client/servers/{server}/databases/{database}`

Delete a database from the server.

```bash
curl -X DELETE "https://your-panel.com/api/client/servers/{server}/databases/{database}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Database Limits

Each server has limits on the number of databases that can be created. Check your server details to see current limits. 