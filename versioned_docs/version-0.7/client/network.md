# Network Management

Manage server network allocations, assign new ports, and set primary allocation.

## List Allocations

**GET** `/api/client/servers/{server}/network/allocations`

List all network allocations for the server.

```bash
curl -X GET "https://your-panel.com/api/client/servers/{server}/network/allocations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

**Response:**
```json
{
  "object": "list",
  "data": [
    {
      "object": "allocation",
      "attributes": {
        "id": 1,
        "ip": "192.168.1.100",
        "ip_alias": null,
        "port": 25565,
        "notes": "Main server port",
        "is_default": true
      }
    },
    {
      "object": "allocation",
      "attributes": {
        "id": 2,
        "ip": "192.168.1.100",
        "ip_alias": null,
        "port": 25566,
        "notes": "Secondary port",
        "is_default": false
      }
    }
  ]
}
```

## Assign New Allocation

**POST** `/api/client/servers/{server}/network/allocations`

Automatically assign a new allocation to the server (if auto-assign is enabled).

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/network/allocations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Set Allocation Notes

**POST** `/api/client/servers/{server}/network/allocations/{allocation}`

Add or update notes for an allocation.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| notes | string | Yes | Allocation notes |

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/network/allocations/{allocation}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"notes": "Votifier port"}'
```

## Set Primary Allocation

**POST** `/api/client/servers/{server}/network/allocations/{allocation}/primary`

Set an allocation as the primary server allocation.

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/network/allocations/{allocation}/primary" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Remove Allocation

**DELETE** `/api/client/servers/{server}/network/allocations/{allocation}`

Remove an allocation from the server. Cannot remove the primary allocation.

```bash
curl -X DELETE "https://your-panel.com/api/client/servers/{server}/network/allocations/{allocation}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Allocation Limits

Each server has limits on the number of allocations that can be assigned. Check your server details to see current limits. 