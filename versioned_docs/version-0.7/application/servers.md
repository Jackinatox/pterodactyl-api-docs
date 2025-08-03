# Server Management

Administrative functions for managing servers in the panel.

## List Servers

**GET** `/api/application/servers`

List all servers in the panel.

**Include Parameters:**
- `allocations` - Include server allocations
- `user` - Include server owner information
- `subusers` - Include server subusers
- `pack` - Include server pack information
- `nest` - Include nest information
- `egg` - Include egg information
- `variables` - Include environment variables
- `location` - Include location information
- `node` - Include node information

**Filters:**
- `filter[uuid]` - Filter by server UUID
- `filter[name]` - Filter by server name
- `filter[external_id]` - Filter by external ID
- `filter[image]` - Filter by Docker image

```bash
curl -X GET "https://your-panel.com/api/application/servers?include=user,node,allocations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Get Server Details

**GET** `/api/application/servers/{server}`

Get details of a specific server.

**Include Parameters:**
Same as list servers endpoint.

## Get Server by External ID

**GET** `/api/application/servers/external/{external_id}`

Get server details using an external identifier.

**Include Parameters:**
Same as list servers endpoint.

```bash
curl -X GET "https://your-panel.com/api/application/servers/external/my-server-id" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Create Server

**POST** `/api/application/servers`

Create a new server.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Server name |
| user | integer | Yes | Owner user ID |
| egg | integer | Yes | Egg ID |
| docker_image | string | Yes | Docker image |
| startup | string | Yes | Startup command |
| environment | object | Yes | Environment variables |
| limits | object | Yes | Resource limits |
| feature_limits | object | Yes | Feature limits |
| allocation | object | Yes | Allocation settings |

**Limits Object:**
```json
{
  "memory": 1024,
  "swap": 0,
  "disk": 5120,
  "io": 500,
  "cpu": 100
}
```

**Feature Limits Object:**
```json
{
  "databases": 2,
  "allocations": 1,
  "backups": 1
}
```

**Allocation Object:**
```json
{
  "default": 1
}
```

## Update Server Details

**PATCH** `/api/application/servers/{server}/details`

Update server name, description, and owner.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Server name |
| user | integer | Yes | Owner user ID |
| external_id | string | No | External identifier |
| description | string | No | Server description |

```bash
curl -X PATCH "https://your-panel.com/api/application/servers/{server}/details" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Server Name",
    "user": 1,
    "description": "Updated server description"
  }'
```

## Update Server Build

**PATCH** `/api/application/servers/{server}/build`

Update server resource limits.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| allocation | integer | Yes | Primary allocation ID |
| memory | integer | Yes | Memory limit (MB) |
| swap | integer | Yes | Swap limit (MB) |
| disk | integer | Yes | Disk limit (MB) |
| io | integer | Yes | IO weight |
| cpu | integer | Yes | CPU limit (%) |
| threads | string | No | CPU threads |
| feature_limits | object | Yes | Feature limits |

```bash
curl -X PATCH "https://your-panel.com/api/application/servers/{server}/build" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "allocation": 1,
    "memory": 2048,
    "swap": 0,
    "disk": 10240,
    "io": 500,
    "cpu": 150,
    "feature_limits": {
      "databases": 2,
      "allocations": 3,
      "backups": 2
    }
  }'
```

## Update Server Startup

**PATCH** `/api/application/servers/{server}/startup`

Update server startup settings.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| startup | string | Yes | Startup command |
| environment | object | Yes | Environment variables |
| egg | integer | Yes | Egg ID |
| image | string | Yes | Docker image |
| skip_scripts | boolean | No | Skip install scripts |

```bash
curl -X PATCH "https://your-panel.com/api/application/servers/{server}/startup" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "startup": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
    "environment": {
      "SERVER_JARFILE": "server.jar",
      "VANILLA_VERSION": "latest"
    },
    "egg": 5,
    "image": "ghcr.io/pterodactyl/yolks:java_17",
    "skip_scripts": false
  }'
```

## Suspend Server

**POST** `/api/application/servers/{server}/suspend`

Suspend a server.

```bash
curl -X POST "https://your-panel.com/api/application/servers/{server}/suspend" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Unsuspend Server

**POST** `/api/application/servers/{server}/unsuspend`

Unsuspend a server.

```bash
curl -X POST "https://your-panel.com/api/application/servers/{server}/unsuspend" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Reinstall Server

**POST** `/api/application/servers/{server}/reinstall`

Reinstall a server using its egg installation script.

```bash
curl -X POST "https://your-panel.com/api/application/servers/{server}/reinstall" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Delete Server

**DELETE** `/api/application/servers/{server}`

Delete a server permanently.

## Force Delete Server

**DELETE** `/api/application/servers/{server}/force`

Force delete a server, bypassing normal deletion checks.

## Server Databases

### List Server Databases

**GET** `/api/application/servers/{server}/databases`

List all databases for a specific server.

```bash
curl -X GET "https://your-panel.com/api/application/servers/{server}/databases" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

### Get Database Details

**GET** `/api/application/servers/{server}/databases/{database}`

Get details of a specific server database.

```bash
curl -X GET "https://your-panel.com/api/application/servers/{server}/databases/{database}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

### Create Database

**POST** `/api/application/servers/{server}/databases`

Create a new database for a server.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| database | string | Yes | Database name |
| remote | string | Yes | Remote connection string (% for any) |

```bash
curl -X POST "https://your-panel.com/api/application/servers/{server}/databases" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "database": "minecraft_data",
    "remote": "%"
  }'
```

### Update Database

**PATCH** `/api/application/servers/{server}/databases/{database}`

Update database settings.

```bash
curl -X PATCH "https://your-panel.com/api/application/servers/{server}/databases/{database}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"remote": "127.0.0.1"}'
```

### Reset Database Password

**POST** `/api/application/servers/{server}/databases/{database}/reset-password`

Reset the database password.

```bash
curl -X POST "https://your-panel.com/api/application/servers/{server}/databases/{database}/reset-password" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

### Delete Database

**DELETE** `/api/application/servers/{server}/databases/{database}`

Delete a server database permanently.

```bash
curl -X DELETE "https://your-panel.com/api/application/servers/{server}/databases/{database}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
``` 