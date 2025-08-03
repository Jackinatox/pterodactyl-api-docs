# Server Management

Manage your servers, view details, control power, send commands, and access console.

## List Servers

**GET** `/api/client`

Lists all servers you have access to.

**Include Parameters:**
- `egg` - Include egg information
- `subusers` - Include subuser information

```bash
curl -X GET "https://your-panel.com/api/client?include=egg,subusers" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Get Server Details

**GET** `/api/client/servers/{server}`

Get detailed information about a specific server.

**Include Parameters:**
- `egg` - Include egg information  
- `subusers` - Include subuser information

## Get Server Resources

**GET** `/api/client/servers/{server}/resources`

View current resource usage (CPU, memory, disk, network).

**Response:**
```json
{
  "object": "stats",
  "attributes": {
    "current_state": "running",
    "is_suspended": false,
    "resources": {
      "memory_bytes": 588701696,
      "cpu_absolute": 15.2,
      "disk_bytes": 130156361,
      "network_rx_bytes": 694220,
      "network_tx_bytes": 337090
    }
  }
}
```

## Power Management

**POST** `/api/client/servers/{server}/power`

Control server power state.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| signal | string | Yes | Power action to perform |

**Available Signals:**
- `start` - Start the server
- `stop` - Gracefully stop the server  
- `restart` - Restart the server
- `kill` - Force kill the server process

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/power" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"signal": "start"}'
```

## Send Command

**POST** `/api/client/servers/{server}/command`

Send a command to the server console.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| command | string | Yes | Command to send |

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/command" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"command": "say Hello World!"}'
```

## WebSocket Console

**GET** `/api/client/servers/{server}/websocket`

Get WebSocket credentials for console access.

**Response:**
```json
{
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "socket": "wss://your-panel.com:8080/api/servers/{uuid}/ws"
  }
}
```

### WebSocket Commands
- `{"event":"auth","args":["TOKEN"]}` - Authenticate
- `{"event":"send stats","args":[null]}` - Request stats
- `{"event":"send logs","args":[null]}` - Request logs
- `{"event":"send command","args":["COMMAND"]}` - Send command 