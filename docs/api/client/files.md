# File Management

import CodeTabs from '@site/src/components/CodeTabs';

Manage server files and directories including listing, reading, uploading, downloading, and manipulating files.

## List Directory Contents

Retrieve the contents of a server directory.

**`GET /api/client/servers/{server}/files/list`**

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `directory` | string | Directory path to list (default: `/`) |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/list"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/files/list?directory=%2F" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const directory = '/';

const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/files/list\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  },
  params: {
    directory: directory
  }
});

console.log('Files:', response.data.data);`,
    python: `import requests
from urllib.parse import quote

server_id = 'd3aac109'
directory = '/'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

params = {
    'directory': directory
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/files/list', 
                       headers=headers, params=params)
data = response.json()
print('Files:', data['data'])`,
    php: `<?php
$serverId = 'd3aac109';
$directory = '/';
$ch = curl_init();

$url = "https://your-panel.com/api/client/servers/{$serverId}/files/list?" . 
       http_build_query(['directory' => $directory]);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data['data']);
?>`
  }}
/>

### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "file_object",
      "attributes": {
        "name": "server.jar",
        "mode": "-rw-r--r--",
        "mode_bits": "0644",
        "size": 47698923,
        "is_file": true,
        "is_symlink": false,
        "mimetype": "application/java-archive",
        "created_at": "2024-01-15T14:30:25+00:00",
        "modified_at": "2024-01-15T14:30:25+00:00"
      }
    },
    {
      "object": "file_object",
      "attributes": {
        "name": "logs",
        "mode": "drwxr-xr-x",
        "mode_bits": "0755",
        "size": 4096,
        "is_file": false,
        "is_symlink": false,
        "mimetype": "inode/directory",
        "created_at": "2024-01-15T14:30:25+00:00",
        "modified_at": "2024-01-15T14:30:25+00:00"
      }
    },
    {
      "object": "file_object",
      "attributes": {
        "name": "world",
        "mode": "drwxr-xr-x",
        "mode_bits": "0755",
        "size": 4096,
        "is_file": false,
        "is_symlink": false,
        "mimetype": "inode/directory",
        "created_at": "2024-01-15T14:30:25+00:00",
        "modified_at": "2024-01-15T14:30:25+00:00"
      }
    }
  ]
}
```

---

## Read File Contents

Read the contents of a specific file.

**`GET /api/client/servers/{server}/files/contents`**

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | string | Path to the file to read |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/contents"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/files/contents?file=%2Fserver.properties" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const filePath = '/server.properties';

const response = await axios.get(\`https://your-panel.com/api/client/servers/\${serverId}/files/contents\`, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  },
  params: {
    file: filePath
  }
});

console.log('File contents:', response.data);`,
    python: `import requests

server_id = 'd3aac109'
file_path = '/server.properties'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

params = {
    'file': file_path
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/files/contents', 
                       headers=headers, params=params)
print('File contents:', response.text)`,
    php: `<?php
$serverId = 'd3aac109';
$filePath = '/server.properties';
$ch = curl_init();

$url = "https://your-panel.com/api/client/servers/{$serverId}/files/contents?" . 
       http_build_query(['file' => $filePath]);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
curl_close($ch);

echo "File contents: " . $response;
?>`
  }}
/>

### Example Response (Plain Text)

```
# Minecraft server properties
server-port=25565
gamemode=survival
max-players=20
online-mode=true
difficulty=normal
spawn-protection=16
white-list=false
generate-structures=true
allow-flight=false
```

---

## Write File Contents

Create or update a file with new content.

**`POST /api/client/servers/{server}/files/write`**

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | string | Path to the file to write |

### Request Body

Send the file content as raw text in the request body.

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/write"
  method="POST"
  examples={{
    curl: `curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/write?file=%2Fserver.properties" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: text/plain" \\
  -d "# Minecraft server properties
server-port=25565
gamemode=survival
max-players=30
online-mode=true
difficulty=hard"`,
    javascript: `const axios = require('axios');

const serverId = 'd3aac109';
const filePath = '/server.properties';
const content = \`# Minecraft server properties
server-port=25565
gamemode=survival
max-players=30
online-mode=true
difficulty=hard\`;

const response = await axios.post(
  \`https://your-panel.com/api/client/servers/\${serverId}/files/write\`,
  content,
  {
    headers: {
      'Authorization': 'Bearer ptlc_YOUR_API_KEY',
      'Accept': 'Application/vnd.pterodactyl.v1+json',
      'Content-Type': 'text/plain'
    },
    params: {
      file: filePath
    }
  }
);

console.log('File updated successfully');`,
    python: `import requests

server_id = 'd3aac109'
file_path = '/server.properties'
content = """# Minecraft server properties
server-port=25565
gamemode=survival
max-players=30
online-mode=true
difficulty=hard"""

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'text/plain'
}

params = {
    'file': file_path
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/files/write',
                        data=content, headers=headers, params=params)

if response.status_code == 204:
    print('File updated successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$filePath = '/server.properties';
$content = "# Minecraft server properties
server-port=25565
gamemode=survival
max-players=30
online-mode=true
difficulty=hard";

$ch = curl_init();

$url = "https://your-panel.com/api/client/servers/{$serverId}/files/write?" . 
       http_build_query(['file' => $filePath]);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json',
    'Content-Type: text/plain'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 204) {
    echo "File updated successfully\\n";
}
?>`
  }}
/>

### Success Response (204)

Returns empty response body with status code 204.

---

## Upload Files

Upload files to the server via multipart form data.

**`GET /api/client/servers/{server}/files/upload`**

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/upload"
  method="GET"
  examples={{
    curl: `curl -X GET "https://your-panel.com/api/client/servers/d3aac109/files/upload" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -F "files[]=@/path/to/local/file.txt" \\
  -F "directory=/"`,
    javascript: `const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const serverId = 'd3aac109';
const formData = new FormData();

// Add file to upload
formData.append('files[]', fs.createReadStream('/path/to/local/file.txt'));
formData.append('directory', '/');

const response = await axios.post(
  \`https://your-panel.com/api/client/servers/\${serverId}/files/upload\`,
  formData,
  {
    headers: {
      'Authorization': 'Bearer ptlc_YOUR_API_KEY',
      'Accept': 'Application/vnd.pterodactyl.v1+json',
      ...formData.getHeaders()
    }
  }
);

console.log('File uploaded successfully');`,
    python: `import requests

server_id = 'd3aac109'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

files = {
    'files[]': open('/path/to/local/file.txt', 'rb')
}

data = {
    'directory': '/'
}

response = requests.post(f'https://your-panel.com/api/client/servers/{server_id}/files/upload',
                        files=files, data=data, headers=headers)

if response.status_code == 200:
    print('File uploaded successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$ch = curl_init();

$postFields = [
    'files[]' => new CURLFile('/path/to/local/file.txt'),
    'directory' => '/'
];

curl_setopt($ch, CURLOPT_URL, "https://your-panel.com/api/client/servers/{$serverId}/files/upload");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    echo "File uploaded successfully\\n";
}
?>`
  }}
/>

### Upload Limits

| Limit | Value |
|-------|-------|
| Maximum file size | 100 MB per file |
| Maximum files per request | 10 files |
| Allowed file types | All types (configurable by admin) |

---

## Download File

Download a file from the server.

**`GET /api/client/servers/{server}/files/download`**

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | string | Path to the file to download |

### Example Request

<CodeTabs
  endpoint="/api/client/servers/{server}/files/download"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/servers/d3aac109/files/download?file=%2Fbackups%2Fworld.zip" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -o "world.zip"`,
    javascript: `const axios = require('axios');
const fs = require('fs');

const serverId = 'd3aac109';
const filePath = '/backups/world.zip';

const response = await axios.get(
  \`https://your-panel.com/api/client/servers/\${serverId}/files/download\`,
  {
    headers: {
      'Authorization': 'Bearer ptlc_YOUR_API_KEY',
      'Accept': 'Application/vnd.pterodactyl.v1+json'
    },
    params: {
      file: filePath
    },
    responseType: 'stream'
  }
);

// Save to file
response.data.pipe(fs.createWriteStream('world.zip'));
console.log('File download started');`,
    python: `import requests

server_id = 'd3aac109'
file_path = '/backups/world.zip'

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json'
}

params = {
    'file': file_path
}

response = requests.get(f'https://your-panel.com/api/client/servers/{server_id}/files/download',
                       headers=headers, params=params, stream=True)

with open('world.zip', 'wb') as f:
    for chunk in response.iter_content(chunk_size=8192):
        f.write(chunk)

print('File downloaded successfully')`,
    php: `<?php
$serverId = 'd3aac109';
$filePath = '/backups/world.zip';
$ch = curl_init();

$url = "https://your-panel.com/api/client/servers/{$serverId}/files/download?" . 
       http_build_query(['file' => $filePath]);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ptlc_YOUR_API_KEY',
    'Accept: Application/vnd.pterodactyl.v1+json'
]);

$response = curl_exec($ch);
curl_close($ch);

file_put_contents('world.zip', $response);
echo "File downloaded successfully\\n";
?>`
  }}
/>

---

## Create Directory

Create a new directory on the server.

**`POST /api/client/servers/{server}/files/create-folder`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Parent directory path |
| `name` | string | Yes | Directory name to create |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/create-folder" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "/",
    "name": "plugins"
  }'
```

### Success Response (204)

Returns empty response body with status code 204.

---

## Copy Files

Copy files or directories to a new location.

**`POST /api/client/servers/{server}/files/copy`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `location` | string | Yes | Source file/directory path |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/copy" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "location": "/world"
  }'
```

Creates a copy of the file/directory with "_copy" appended to the name.

### Success Response (204)

Returns empty response body with status code 204.

---

## Rename Files

Rename or move files and directories.

**`PUT /api/client/servers/{server}/files/rename`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Parent directory |
| `files` | array | Yes | Array of rename operations |

### Files Array Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `from` | string | Yes | Current filename |
| `to` | string | Yes | New filename |

### Example Request

```bash
curl -X PUT "https://your-panel.com/api/client/servers/d3aac109/files/rename" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "/",
    "files": [
      {
        "from": "old_name.txt",
        "to": "new_name.txt"
      }
    ]
  }'
```

### Success Response (204)

Returns empty response body with status code 204.

---

## Delete Files

Delete files or directories from the server.

**`POST /api/client/servers/{server}/files/delete`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Parent directory |
| `files` | array | Yes | Array of filenames to delete |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/delete" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "/",
    "files": [
      "unnecessary_file.txt",
      "old_backup.zip"
    ]
  }'
```

### Success Response (204)

Returns empty response body with status code 204.

:::warning Permanent Deletion
File deletion is permanent and cannot be undone. Always ensure you have backups before deleting important files.
:::

---

## Compress Files

Create an archive (ZIP/TAR) from files and directories.

**`POST /api/client/servers/{server}/files/compress`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Root directory |
| `files` | array | Yes | Files/directories to compress |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/compress" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "/",
    "files": [
      "world",
      "plugins"
    ]
  }'
```

### Example Response

```json
{
  "object": "file_object",
  "attributes": {
    "name": "archive-2024-01-15-143025.tar.gz",
    "mode": "-rw-r--r--",
    "mode_bits": "0644",
    "size": 125829120,
    "is_file": true,
    "is_symlink": false,
    "mimetype": "application/gzip",
    "created_at": "2024-01-15T14:30:25+00:00",
    "modified_at": "2024-01-15T14:30:25+00:00"
  }
}
```

---

## Decompress Files

Extract files from an archive.

**`POST /api/client/servers/{server}/files/decompress`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Directory containing the archive |
| `file` | string | Yes | Archive filename |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/decompress" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "/",
    "file": "backup.zip"
  }'
```

### Success Response (204)

Returns empty response body with status code 204.

### Supported Archive Types

| Extension | Format | Description |
|-----------|--------|-------------|
| `.zip` | ZIP | Most common format |
| `.tar` | TAR | Uncompressed tarball |
| `.tar.gz` | TAR+GZIP | Compressed tarball |
| `.tar.bz2` | TAR+BZIP2 | Compressed tarball |

---

## Change File Permissions

Modify file or directory permissions (chmod).

**`POST /api/client/servers/{server}/files/chmod`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `root` | string | Yes | Parent directory |
| `files` | array | Yes | Array of permission changes |

### Files Array Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | string | Yes | Filename |
| `mode` | string | Yes | Octal permission mode (e.g., "755", "644") |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/chmod" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "root": "/",
    "files": [
      {
        "file": "start.sh",
        "mode": "755"
      },
      {
        "file": "config.yml",
        "mode": "644"
      }
    ]
  }'
```

### Success Response (204)

Returns empty response body with status code 204.

### Common Permission Modes

| Mode | Description | Symbolic |
|------|-------------|----------|
| `755` | rwxr-xr-x | Full access for owner, read+execute for others |
| `644` | rw-r--r-- | Read+write for owner, read-only for others |
| `600` | rw------- | Read+write for owner only |
| `777` | rwxrwxrwx | Full access for everyone (not recommended) |

---

## Pull Remote File

Download a file from a URL directly to the server.

**`POST /api/client/servers/{server}/files/pull`**

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | URL of the file to download |
| `directory` | string | Yes | Directory to save the file |
| `filename` | string | No | Custom filename (optional) |

### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/servers/d3aac109/files/pull" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://piston-data.mojang.com/v1/objects/8dd1a28015f51b1803213892b50b7b4fc76e594d/server.jar",
    "directory": "/",
    "filename": "server.jar"
  }'
```

### Success Response (204)

Returns empty response body with status code 204.

### Remote Pull Limitations

- Maximum file size: 1 GB
- Timeout: 5 minutes
- Only HTTP/HTTPS URLs allowed
- Some panel configurations may restrict certain domains

---

## Required Permissions

| Permission | Description |
|------------|-------------|
| `file.read` | View file contents and directory listings |
| `file.read-content` | Read individual file contents |
| `file.create` | Create new files and directories |
| `file.update` | Modify existing files |
| `file.delete` | Delete files and directories |
| `file.archive` | Create and extract archives |
| `file.sftp` | Access files via SFTP |

## Security Best Practices

1. **File Size Limits**: Be aware of upload and download limits
2. **Path Traversal**: The API prevents access outside the server directory
3. **File Types**: Some file extensions may be restricted by server configuration
4. **Permissions**: Always use the minimum required file permissions
5. **Backups**: Create backups before making bulk changes

## Source References

**Controller**: [`FileController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/Servers/FileController.php)  
**Routes**: [`api-client.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php) - File management endpoints  
**Wings Integration**: [Wings Server Code](https://github.com/pterodactyl/wings/tree/develop/server) - File operations

## Next Steps

- Learn about [Database Management](./databases) for server databases  
- Explore [Backup Management](./backups) for automated backups
- Check [Scheduled Tasks](./schedules) for automated file operations 