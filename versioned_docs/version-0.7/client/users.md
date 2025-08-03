# User Management

Manage server subusers and their permissions.

## List Server Users

**GET** `/api/client/servers/{server}/users`

List all users (subusers) with access to the server.

```bash
curl -X GET "https://your-panel.com/api/client/servers/{server}/users" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

**Response:**
```json
{
  "object": "list",
  "data": [
    {
      "object": "server_subuser",
      "attributes": {
        "uuid": "73f233ca-99e0-47a9-bd46-efd3296d7ad9",
        "username": "subuser1",
        "email": "subuser1@example.com",
        "image": "https://gravatar.com/avatar/...",
        "2fa_enabled": false,
        "created_at": "2020-06-12T23:18:43+01:00",
        "permissions": [
          "control.console",
          "control.start",
          "control.stop",
          "file.read",
          "file.write"
        ]
      }
    }
  ]
}
```

## Create Subuser

**POST** `/api/client/servers/{server}/users`

Create a new subuser for the server.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User's email address |
| permissions | array | Yes | Array of permission strings |

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/users" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "permissions": [
      "control.console",
      "control.start",
      "control.stop",
      "file.read"
    ]
  }'
```

## Get Subuser Details

**GET** `/api/client/servers/{server}/users/{user}`

Get details of a specific subuser.

```bash
curl -X GET "https://your-panel.com/api/client/servers/{server}/users/{user}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Update Subuser Permissions

**POST** `/api/client/servers/{server}/users/{user}`

Update a subuser's permissions.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| permissions | array | Yes | Array of permission strings |

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/users/{user}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"permissions": ["control.console", "file.read"]}'
```

## Delete Subuser

**DELETE** `/api/client/servers/{server}/users/{user}`

Remove a subuser from the server.

```bash
curl -X DELETE "https://your-panel.com/api/client/servers/{server}/users/{user}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Available Permissions

**Control Permissions:**
- `control.console` - Access console
- `control.start` - Start server
- `control.stop` - Stop server  
- `control.restart` - Restart server

**File Permissions:**
- `file.create` - Create files/folders
- `file.read` - View files/folders
- `file.update` - Edit files
- `file.delete` - Delete files/folders
- `file.archive` - Create/extract archives
- `file.sftp` - SFTP access

**Database Permissions:**
- `database.create` - Create databases
- `database.read` - View databases
- `database.update` - Rotate passwords
- `database.delete` - Delete databases
- `database.view_password` - View passwords

**Other Permissions:**
- `allocation.read` - View allocations
- `allocation.update` - Modify allocations
- `backup.create` - Create backups
- `backup.read` - View backups
- `backup.delete` - Delete backups
- `schedule.create` - Create schedules
- `schedule.read` - View schedules
- `schedule.update` - Edit schedules
- `schedule.delete` - Delete schedules 