# Server Management

import CodeTabs from '@site/src/components/CodeTabs';

Manage your servers including power states, resource monitoring, console access, and command execution.

## Source Code References

All Client API server management endpoints are implemented in the Pterodactyl Panel source code:

- **Client Controller**: [`ClientController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/ClientController.php)
- **Server Controllers**: [`ServerController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/ServerController.php)
- **Power Controller**: [`PowerController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/PowerController.php)
- **Command Controller**: [`CommandController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/CommandController.php)
- **Routes Definition**: [`api-client.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php#L45-L95)
- **Server Model**: [`Server.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/Server.php)

## List Servers

Retrieve a list of all servers you have access to.

**`GET /api/client`**

### Source Reference
- **Method**: [`ClientController@index`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/ClientController.php#L47)
- **Route**: [`GET /api/client`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php#L45)

### Example Request

<CodeTabs
  endpoint="/api/client"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const response = await axios.get('https://your-panel.com/api/client', {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log(response.data);`,
    python: `import requests

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get('https://your-panel.com/api/client', headers=headers)
data = response.json()
print(data)`,
    php: `<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://your-panel.com/api/client');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data);
?>`,
    go: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "https://your-panel.com/api/client", nil)
    
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/client"))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    csharp: `using System;
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var response = await client.GetAsync("https://your-panel.com/api/client");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`,
    ruby: `require 'net/http'
require 'json'

uri = URI('https://your-panel.com/api/client')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)
data = JSON.parse(response.body)
puts data`
  }}
/>

### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "server",
      "attributes": {
        "server_owner": true,
        "identifier": "d3aac109",
        "internal_id": 4,
        "uuid": "d3aac109-e5e0-4331-b03e-3454f7e136dc",
        "name": "Survival Server",
        "description": "A vanilla Minecraft survival server",
        "status": null,
        "is_suspended": false,
        "is_installing": false,
        "is_transferring": false,
        "node": "Node 1",
        "sftp_details": {
          "ip": "node.example.com",
          "port": 2022
        },
        "invocation": "java -Xms128M -Xmx1024M -jar server.jar",
        "docker_image": "ghcr.io/pterodactyl/yolks:java_17",
        "egg_features": [
          "eula",
          "java_version",
          "pid_limit"
        ],
        "feature_limits": {
          "databases": 2,
          "allocations": 1,
          "backups": 10
        },
        "user_permissions": [
          "control.console",
          "control.start",
          "control.stop",
          "control.restart"
        ],
        "limits": {
          "memory": 1024,
          "swap": 0,
          "disk": 5120,
          "io": 500,
          "cpu": 200,
          "threads": null
        },
        "relationships": {
          "allocations": {
            "object": "list",
            "data": [
              {
                "object": "allocation",
                "attributes": {
                  "id": 1,
                  "ip": "45.86.168.218",
                  "ip_alias": null,
                  "port": 25565,
                  "notes": null,
                  "is_default": true
                }
              }
            ]
          },
          "variables": {
            "object": "list",
            "data": [
              {
                "object": "egg_variable",
                "attributes": {
                  "name": "Server Jar File",
                  "description": "The name of the server jarfile to run the server with.",
                  "env_variable": "SERVER_JARFILE",
                  "default_value": "server.jar",
                  "server_value": "server.jar",
                  "is_editable": true,
                  "rules": "required|regex:/^([\\w\\d._-]+)(\\.jar)$/"
                }
              }
            ]
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 1,
      "count": 1,
      "per_page": 25,
      "current_page": 1,
      "total_pages": 1,
      "links": {}
    }
  }
}
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `include` | string | Comma-separated list of relationships to include (`allocations`, `variables`) |
| `page` | integer | Page number for pagination |
| `per_page` | integer | Number of servers per page (max 100) |

---

## Get Server Details

Retrieve detailed information about a specific server.

**`GET /api/client/servers/{server}`**

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | string | Server identifier (UUID or short ID) |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log(response.data);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}', headers=headers)
data = response.json()
print(data)`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data);
?>`,
    go: `package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    serverId := "d3aac109"
    client := &http.Client{}
    url := fmt.Sprintf("https://your-panel.com/api/client/servers/%s", serverId)
    req, _ := http.NewRequest("GET", url, nil)
    
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`
  }}
/>

### Example Response

```json
{
  "object": "server",
  "attributes": {
    "server_owner": true,
    "identifier": "d3aac109",
    "internal_id": 4,
    "uuid": "d3aac109-e5e0-4331-b03e-3454f7e136dc",
    "name": "Survival Server",
    "description": "A vanilla Minecraft survival server",
    "status": "running",
    "is_suspended": false,
    "is_installing": false,
    "is_transferring": false,
    "node": "Node 1",
    "sftp_details": {
      "ip": "node.example.com",
      "port": 2022
    },
    "invocation": "java -Xms128M -Xmx1024M -jar server.jar",
    "docker_image": "ghcr.io/pterodactyl/yolks:java_17",
    "egg_features": [
      "eula",
      "java_version",
      "pid_limit"
    ],
    "feature_limits": {
      "databases": 2,
      "allocations": 1,
      "backups": 10
    },
    "user_permissions": [
      "control.console",
      "control.start",
      "control.stop",
      "control.restart"
    ],
    "limits": {
      "memory": 1024,
      "swap": 0,
      "disk": 5120,
      "io": 500,
      "cpu": 200,
      "threads": null
    }
  }
}
```

---

## Server Resource Usage

Get real-time resource usage statistics for a server.

**`GET /api/client/servers/{server}/resources`**

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/resources"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/resources" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/resources\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

const stats = response.data.attributes.resources;
console.log(\`Memory: \${(stats.memory_bytes / 1024 / 1024).toFixed(2)} MB\`);
console.log(\`CPU: \${stats.cpu_absolute.toFixed(2)}%\`);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/resources', headers=headers)
data = response.json()

stats = data['attributes']['resources']
print(f"Memory: {stats['memory_bytes'] / 1024 / 1024:.2f} MB")
print(f"CPU: {stats['cpu_absolute']:.2f}%")`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/resources");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

$stats = $data['attributes']['resources'];
echo "Memory: " . round($stats['memory_bytes'] / 1024 / 1024, 2) . " MB\\n";
echo "CPU: " . round($stats['cpu_absolute'], 2) . "%\\n";
?>`
  }}
/>

### Example Response

```json
{
  "object": "stats",
  "attributes": {
    "current_state": "running",
    "is_suspended": false,
    "resources": {
      "memory_bytes": 671088640,
      "memory_limit_bytes": 1073741824,
      "cpu_absolute": 1.522,
      "disk_bytes": 2147483648,
      "network_rx_bytes": 676237,
      "network_tx_bytes": 1097738,
      "uptime": 3600000
    }
  }
}
```

### Resource Fields

| Field | Description |
|-------|-------------|
| `memory_bytes` | Current memory usage in bytes |
| `memory_limit_bytes` | Maximum memory allowed in bytes |
| `cpu_absolute` | Current CPU usage percentage |
| `disk_bytes` | Current disk usage in bytes |
| `network_rx_bytes` | Total bytes received |
| `network_tx_bytes` | Total bytes transmitted |
| `uptime` | Server uptime in milliseconds |

---

## Power Management

Control server power states including start, stop, restart, and kill operations.

### Source Reference
- **Controller**: [`PowerController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/PowerController.php)
- **Route**: [`POST /api/client/servers/{server}/power`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php#L75)
- **Service**: [`DaemonPowerRepository`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Repositories/Wings/DaemonPowerRepository.php)

### Start Server

**`POST /api/client/servers/{server}/power`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `signal` | string | Yes | Power action: `start`, `stop`, `restart`, `kill` |

#### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/power"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/power" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "signal": "restart"
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.post(\`https://your-panel.com/api/client/servers/\${serverId}/power\`, {
  signal: 'restart'
}, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Server restart initiated');`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

data = {
    'signal': 'restart'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/power', 
                        json=data, headers=headers)

if response.status_code == 204:
    print('Server restart initiated')`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/power");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['signal' => 'restart']));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 204) {
    echo "Server restart initiated\\n";
}
?>`
  }}
/>

#### Success Response (204)

Returns empty response body with status code 204.

#### Power Actions

| Action | Description |
|--------|-------------|
| `start` | Start the server |
| `stop` | Gracefully stop the server |
| `restart` | Restart the server |
| `kill` | Force kill the server process |

#### Error Responses

**Server Already Running (400)**
```json
{
  "errors": [
    {
      "code": "ConflictingServerStateException",
      "status": "400",
      "detail": "Cannot start server, server is already running."
    }
  ]
}
```

**Server Installing (400)**
```json
{
  "errors": [
    {
      "code": "ConflictingServerStateException",
      "status": "400",
      "detail": "Cannot perform power action, server is currently installing."
    }
  ]
}
```

---

## Console Access

### WebSocket Console Connection

Connect to the server console via WebSocket for real-time input/output.

**`GET /api/client/servers/{server}/websocket`**

This endpoint returns authentication details for establishing a WebSocket connection.

#### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/websocket"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/websocket" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');
const WebSocket = require('ws');

// Get WebSocket credentials
const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/websocket\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

const { token, socket } = response.data.data;

// Connect to WebSocket
const ws = new WebSocket(socket);

ws.on('open', () => {
  // Authenticate
  ws.send(JSON.stringify({
    event: 'auth',
    args: [token]
  }));
});

ws.on('message', (data) => {
  const message = JSON.parse(data);
  console.log('Console:', message);
});`,
    python: `import requests
import websocket
import json

# Get WebSocket credentials
server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/websocket', headers=headers)
data = response.json()

token = data['data']['token']
socket_url = data['data']['socket']

# Connect to WebSocket
def on_open(ws):
    auth_message = json.dumps({
        'event': 'auth',
        'args': [token]
    })
    ws.send(auth_message)

def on_message(ws, message):
    data = json.loads(message)
    print('Console:', data)

ws = websocket.WebSocketApp(socket_url,
                          on_open=on_open,
                          on_message=on_message)
ws.run_forever()`
  }}
/>

#### Example Response

```json
{
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "socket": "wss://node.example.com:8080/api/servers/d3aac109-e5e0-4331-b03e-3454f7e136dc/ws"
  }
}
```

#### WebSocket Connection

Use the returned token and socket URL to establish a WebSocket connection:

```javascript
const socket = new WebSocket('wss://node.example.com:8080/api/servers/d3aac109-e5e0-4331-b03e-3454f7e136dc/ws');

socket.addEventListener('open', function (event) {
    // Authenticate with the WebSocket
    socket.send(JSON.stringify({
        event: 'auth',
        args: ['eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...']
    }));
});

socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    console.log('Console output:', data);
});
```

#### WebSocket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `auth` | Send | Authenticate with the token |
| `send command` | Send | Execute a command on the server |
| `set state` | Send | Request server state updates |
| `console output` | Receive | Real-time console output |
| `status` | Receive | Server status changes |
| `stats` | Receive | Resource usage updates |

---

## Send Console Command

Execute a command on the server console.

**`POST /api/client/servers/{server}/command`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `command` | string | Yes | Command to execute on the server |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/command"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/command" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "command": "say Hello from the API!"
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const command = 'say Hello from the API!';

const response = await axios.post(\`https://your-panel.com/api/client/servers/\${serverId}/command\`, {
  command: command
}, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Command executed successfully');`,
    python: `import requests

server_id = 'd3aac109'
command = 'say Hello from the API!'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

data = {
    'command': command
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/command', 
                        json=data, headers=headers)

if response.status_code == 204:
    print('Command executed successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$command = 'say Hello from the API!';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/command");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['command' => $command]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 204) {
    echo "Command executed successfully\\n";
}
?>`
  }}
/>

### Success Response (204)

Returns empty response body with status code 204.

### Error Responses

**Server Offline (400)**
```json
{
  "errors": [
    {
      "code": "ConflictingServerStateException",
      "status": "400",
      "detail": "Cannot send command to stopped server."
    }
  ]
}
```

**Missing Permissions (403)**
```json
{
  "errors": [
    {
      "code": "InsufficientPermissionsException",
      "status": "403",
      "detail": "This action requires the 'control.console' permission."
    }
  ]
}
```

---

## Server Settings

### Update Server Details

Update basic server information like name and description.

**`POST /api/client/servers/{server}/settings/rename`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | New server name (max 255 characters) |
| `description` | string | No | New server description (max 500 characters) |

#### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/settings/rename" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Server Name",
    "description": "Updated server description"
  }'
```

#### Success Response (204)

Returns empty response body with status code 204.

### Reinstall Server

Trigger a server reinstallation with a fresh copy of the egg.

**`POST /api/client/servers/{server}/settings/reinstall`**

#### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/settings/reinstall" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```

#### Success Response (202)

Returns empty response body with status code 202.

:::warning Important
Reinstalling a server will **permanently delete all files** and reinstall the server from scratch. Make sure to create backups before reinstalling.
:::

### Update Docker Image

Change the Docker image used by the server.

**`PUT /api/client/servers/{server}/settings/docker-image`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `docker_image` | string | Yes | New Docker image to use for the server |

#### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/settings/docker-image"
  method="PUT"
  examples={{
    curl: `curl -X PUT "https://your-panel.com/api/client/servers/d3aac109/settings/docker-image" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "docker_image": "ghcr.io/pterodactyl/yolks:java_17"
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.put(\`https://your-panel.com/api/client/servers/\${serverId}/settings/docker-image\`, {
  docker_image: 'ghcr.io/pterodactyl/yolks:java_17'
}, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Docker image updated successfully');`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

data = {
    'docker_image': 'ghcr.io/pterodactyl/yolks:java_17'
}

response = requests.put(f'https://your-panel.com/api/client/servers/{server_id}/settings/docker-image', 
                       json=data, headers=headers)

if response.status_code == 204:
    print('Docker image updated successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/settings/docker-image");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'docker_image' => 'ghcr.io/pterodactyl/yolks:java_17'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 204) {
    echo "Docker image updated successfully\\n";
}
?>`
  }}
/>

#### Success Response (204)

Returns empty response body with status code 204.

#### Error Responses

**Invalid Docker Image (422)**
```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The selected docker image is invalid.",
      "meta": {
        "rule": "in"
      }
    }
  ]
}
```

**Missing Permissions (403)**
```json
{
  "errors": [
    {
      "code": "InsufficientPermissionsException",
      "status": "403",
      "detail": "This action requires the 'startup.docker-image' permission."
    }
  ]
}
```

:::info Available Images
The available Docker images are defined by the server's egg configuration. Use the startup configuration endpoint to see available images in the `meta.docker_images` field.
:::

---

## Common Error Codes

| Status | Code | Description |
|--------|------|-------------|
| 400 | `ConflictingServerStateException` | Server is in a state that prevents the action |
| 401 | `InvalidCredentialsException` | Invalid API key |
| 403 | `InsufficientPermissionsException` | Missing required permissions |
| 404 | `NotFoundHttpException` | Server not found or no access |
| 409 | `TooManyRequestsHttpException` | Rate limit exceeded |

## Required Permissions

Different server actions require specific permissions:

| Permission | Description |
|------------|-------------|
| `control.console` | View console output and send commands |
| `control.start` | Start the server |
| `control.stop` | Stop the server |
| `control.restart` | Restart the server |
| `control.kill` | Force kill server process |
| `admin.websocket` | Access WebSocket console |
| `settings.rename` | Update server name and description |
| `settings.reinstall` | Reinstall the server |
| `startup.read` | View startup configuration and variables |
| `startup.update` | Modify startup variables |
| `startup.docker-image` | Change Docker image |

## Startup Configuration

Retrieve and update server startup configuration including environment variables.

### Get Startup Configuration

Retrieve the current startup configuration and environment variables for a server.

**`GET /api/client/servers/{server}/startup`**

#### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/startup"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/startup" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/startup\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Startup config:', response.data);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/startup', headers=headers)
data = response.json()
print('Startup config:', data)`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/startup");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data);
?>`
  }}
/>

#### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "egg_variable",
      "attributes": {
        "name": "Server Jar File",
        "description": "The name of the server jarfile to run the server with.",
        "env_variable": "SERVER_JARFILE",
        "default_value": "server.jar",
        "server_value": "server.jar",
        "is_editable": true,
        "rules": "required|regex:/^([\\w\\d._-]+)(\\.jar)$/"
      }
    },
    {
      "object": "egg_variable",
      "attributes": {
        "name": "Server Version",
        "description": "The version of Minecraft to download and use.",
        "env_variable": "MINECRAFT_VERSION",
        "default_value": "latest",
        "server_value": "1.19.4",
        "is_editable": true,
        "rules": "required|string|between:1,20"
      }
    }
  ],
  "meta": {
    "startup_command": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
    "raw_startup_command": "java -Xms128M -Xmx1024M -jar server.jar",
    "docker_images": {
      "ghcr.io/pterodactyl/yolks:java_17": "Java 17",
      "ghcr.io/pterodactyl/yolks:java_11": "Java 11",
      "ghcr.io/pterodactyl/yolks:java_8": "Java 8"
    }
  }
}
```

### Update Startup Variable

Update a specific environment variable for the server startup configuration.

**`PUT /api/client/servers/{server}/startup/variable`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `key` | string | Yes | Environment variable name |
| `value` | string | Yes | New value for the variable |

#### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/startup/variable"
  method="PUT"
  examples={{
    curl: `curl -X PUT "https://your-panel.com/api/client/servers/d3aac109/startup/variable" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "MINECRAFT_VERSION",
    "value": "1.20.1"
  }'`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const response = await axios.put(\`https://your-panel.com/api/client/servers/\${serverId}/startup/variable\`, {
  key: 'MINECRAFT_VERSION',
  value: '1.20.1'
}, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Variable updated:', response.data);`,
    python: `import requests

server_id = 'd3aac109'
headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

data = {
    'key': 'MINECRAFT_VERSION',
    'value': '1.20.1'
}

response = requests.put(f'https://your-panel.com/api/client/servers/{server_id}/startup/variable', 
                       json=data, headers=headers)
result = response.json()
print('Variable updated:', result)`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/startup/variable");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'key' => 'MINECRAFT_VERSION',
    'value' => '1.20.1'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data);
?>`
  }}
/>

#### Example Response

```json
{
  "object": "egg_variable",
  "attributes": {
    "name": "Server Version",
    "description": "The version of Minecraft to download and use.",
    "env_variable": "MINECRAFT_VERSION",
    "default_value": "latest",
    "server_value": "1.20.1",
    "is_editable": true,
    "rules": "required|string|between:1,20"
  }
}
```

#### Variable Field Descriptions

| Field | Description |
|-------|-------------|
| `name` | Human-readable variable name |
| `description` | Description of what the variable controls |
| `env_variable` | Environment variable name used in startup command |
| `default_value` | Default value defined by the egg |
| `server_value` | Current value set for this server |
| `is_editable` | Whether the variable can be modified by users |
| `rules` | Validation rules for the variable value |

#### Error Responses

**Variable Not Found (422)**
```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The selected key is invalid.",
      "meta": {
        "rule": "in"
      }
    }
  ]
}
```

**Invalid Value (422)**
```json
{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The value field must be between 1 and 20 characters.",
      "meta": {
        "rule": "between"
      }
    }
  ]
}
```

**Variable Not Editable (400)**
```json
{
  "errors": [
    {
      "code": "BadRequestException",
      "status": "400",
      "detail": "This environment variable is not editable."
    }
  ]
}
```

---

## Next Steps

- Explore [File Management](./files) for server file operations
- Check [Database Management](./databases) for server databases
- Review [Network Management](./network) for allocation management 