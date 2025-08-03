# File Management

Manage server files - list, read, write, upload, download, and organize files.

## List Files

**GET** `/api/client/servers/{server}/files/list`

List files and directories in the specified path.

**Parameters:**
- `directory` - URL encoded path to list (default: `/`)

```bash
curl -X GET "https://your-panel.com/api/client/servers/{server}/files/list?directory=%2F" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Read File Contents

**GET** `/api/client/servers/{server}/files/contents`

Read the contents of a file.

**Parameters:**
- `file` - URL encoded path to the file

```bash
curl -X GET "https://your-panel.com/api/client/servers/{server}/files/contents?file=%2Fserver.properties" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Write File

**POST** `/api/client/servers/{server}/files/write`

Write content to a file.

**Parameters:**
- `file` - URL encoded path to the file

**Body:** Raw file content

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/files/write?file=%2Fserver.properties" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -d "server-port=25565"
```

## Download File

**GET** `/api/client/servers/{server}/files/download`

Generate a signed download URL for a file.

**Parameters:**
- `file` - URL encoded path to the file

## Upload File

**GET** `/api/client/servers/{server}/files/upload`

Generate a signed upload URL.

## Create Directory

**POST** `/api/client/servers/{server}/files/create-folder`

Create a new directory.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| root | string | Yes | Parent directory path |
| name | string | Yes | Directory name |

## Delete Files

**POST** `/api/client/servers/{server}/files/delete`

Delete files or directories.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| root | string | Yes | Parent directory path |
| files | array | Yes | Array of file/folder names |

## Rename Files

**PUT** `/api/client/servers/{server}/files/rename`

Rename or move files/directories.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| root | string | Yes | Parent directory path |
| files | array | Yes | Array of `{"from": "old", "to": "new"}` objects |

## Copy File

**POST** `/api/client/servers/{server}/files/copy`

Copy a file.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| location | string | Yes | Path to the file to copy |

## Compress Files

**POST** `/api/client/servers/{server}/files/compress`

Create a compressed archive.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| root | string | Yes | Parent directory path |
| files | array | Yes | Array of file/folder names |

## Decompress File

**POST** `/api/client/servers/{server}/files/decompress`

Extract a compressed archive.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| root | string | Yes | Parent directory path |
| file | string | Yes | Archive file name |

## Pull Remote File

**POST** `/api/client/servers/{server}/files/pull`

Pull a file from a remote URL.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| root | string | Yes | Destination directory path |
| url | string | Yes | Remote file URL |
| filename | string | No | Custom filename |

## Change Permissions

**POST** `/api/client/servers/{server}/files/chmod`

Change file or directory permissions.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| root | string | Yes | Parent directory path |
| files | array | Yes | Array of `{"file": "name", "mode": "755"}` objects | 