# Backup Management

Create, manage, and restore server backups.

## List Backups

**GET** `/api/client/servers/{server}/backups`

List all backups for the server.

```bash
curl -X GET "https://your-panel.com/api/client/servers/{server}/backups" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Create Backup

**POST** `/api/client/servers/{server}/backups`

Create a new backup of the server.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | No | Backup name (auto-generated if empty) |

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/backups" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"name": "Pre-update backup"}'
```

## Get Backup Details

**GET** `/api/client/servers/{server}/backups/{backup}`

Get details of a specific backup.

## Download Backup

**GET** `/api/client/servers/{server}/backups/{backup}/download`

Generate a signed URL to download the backup.

```bash
curl -X GET "https://your-panel.com/api/client/servers/{server}/backups/{backup}/download" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Restore Backup

**POST** `/api/client/servers/{server}/backups/{backup}/restore`

Restore the server from a backup.

:::warning
This will overwrite all current server files. The server must be stopped before restoring.
:::

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/backups/{backup}/restore" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Toggle Backup Lock

**POST** `/api/client/servers/{server}/backups/{backup}/lock`

Toggle the lock status of a backup (prevents deletion when locked).

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/backups/{backup}/lock" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Delete Backup

**DELETE** `/api/client/servers/{server}/backups/{backup}`

Delete a backup permanently.

```bash
curl -X DELETE "https://your-panel.com/api/client/servers/{server}/backups/{backup}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Backup Limits

Each server has limits on the number of backups that can be stored. Check your server details to see current limits. 