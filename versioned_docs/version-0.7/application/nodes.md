# Node Management

Administrative functions for managing nodes (Wings daemons).

## List Nodes

**GET** `/api/application/nodes`

List all nodes in the panel.

**Include Parameters:**
- `allocations` - Include node allocations
- `location` - Include location information
- `servers` - Include servers on this node

**Filters:**
- `filter[uuid]` - Filter by node UUID
- `filter[name]` - Filter by node name

```bash
curl -X GET "https://your-panel.com/api/application/nodes?include=location,servers" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Get Node Details

**GET** `/api/application/nodes/{node}`

Get details of a specific node.

## Create Node

**POST** `/api/application/nodes`

Create a new node.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Node name |
| location_id | integer | Yes | Location ID |
| fqdn | string | Yes | Fully qualified domain name |
| scheme | string | Yes | Connection scheme (http/https) |
| memory | integer | Yes | Total memory (MB) |
| memory_overallocate | integer | Yes | Memory overallocation (%) |
| disk | integer | Yes | Total disk space (MB) |
| disk_overallocate | integer | Yes | Disk overallocation (%) |
| upload_size | integer | Yes | Max upload size (MB) |
| daemon_listen | integer | Yes | Daemon listen port |
| daemon_sftp | integer | Yes | SFTP port |
| daemon_base | string | Yes | Base daemon directory |

```bash
curl -X POST "https://your-panel.com/api/application/nodes" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Node 1",
    "location_id": 1,
    "fqdn": "node1.example.com",
    "scheme": "https",
    "memory": 8192,
    "memory_overallocate": 0,
    "disk": 102400,
    "disk_overallocate": 0,
    "upload_size": 100,
    "daemon_listen": 8080,
    "daemon_sftp": 2022,
    "daemon_base": "/var/lib/pterodactyl/volumes"
  }'
```

## Update Node

**PATCH** `/api/application/nodes/{node}`

Update an existing node.

## Delete Node

**DELETE** `/api/application/nodes/{node}`

Delete a node. All servers must be moved off the node first.

## Get Deployable Nodes

**GET** `/api/application/nodes/deployable`

Get a list of nodes that can have servers deployed to them.

```bash
curl -X GET "https://your-panel.com/api/application/nodes/deployable" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Get Node Configuration

**GET** `/api/application/nodes/{node}/configuration`

Get the Wings configuration for a node.

**Response:**
```json
{
  "debug": false,
  "uuid": "node-uuid-here",
  "token_id": "token-id",
  "token": "node-token",
  "api": {
    "host": "0.0.0.0",
    "port": 8080,
    "ssl": {
      "enabled": true,
      "cert": "/etc/letsencrypt/live/node.example.com/fullchain.pem",
      "key": "/etc/letsencrypt/live/node.example.com/privkey.pem"
    }
  },
  "system": {
    "data": "/var/lib/pterodactyl/volumes"
  },
  "allowed_mounts": [],
  "remote": "https://panel.example.com"
}
```

## Node Allocations

### List Node Allocations

**GET** `/api/application/nodes/{node}/allocations`

List all allocations for a node.

```bash
curl -X GET "https://your-panel.com/api/application/nodes/{node}/allocations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

### Create Allocations

**POST** `/api/application/nodes/{node}/allocations`

Create new allocations for a node.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| ip | string | Yes | IP address |
| alias | string | No | IP alias |
| ports | array | Yes | Array of ports |

```bash
curl -X POST "https://your-panel.com/api/application/nodes/{node}/allocations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "ip": "192.168.1.100",
    "ports": ["25565", "25566", "25567-25570"]
  }'
```

### Delete Allocation

**DELETE** `/api/application/nodes/{node}/allocations/{allocation}`

Delete an allocation from a node.

```bash
curl -X DELETE "https://your-panel.com/api/application/nodes/{node}/allocations/{allocation}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
``` 