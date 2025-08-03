# Location Management

Administrative functions for managing locations where nodes can be grouped.

## List Locations

**GET** `/api/application/locations`

List all locations in the panel.

**Include Parameters:**
- `nodes` - Include nodes in each location
- `servers` - Include servers in each location

```bash
curl -X GET "https://your-panel.com/api/application/locations?include=nodes,servers" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Get Location Details

**GET** `/api/application/locations/{location}`

Get details of a specific location.

**Include Parameters:**
- `nodes` - Include nodes in this location
- `servers` - Include servers in this location

## Create Location

**POST** `/api/application/locations`

Create a new location.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| short | string | Yes | Short identifier (unique) |
| long | string | Yes | Long description |

```bash
curl -X POST "https://your-panel.com/api/application/locations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "short": "us-east",
    "long": "US East Coast Datacenter"
  }'
```

**Example Response:**
```json
{
  "object": "location",
  "attributes": {
    "id": 1,
    "short": "us-east",
    "long": "US East Coast Datacenter",
    "updated_at": "2020-06-13T04:56:59+00:00",
    "created_at": "2020-06-13T04:56:59+00:00"
  }
}
```

## Update Location

**PATCH** `/api/application/locations/{location}`

Update an existing location.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| short | string | Yes | Short identifier (unique) |
| long | string | Yes | Long description |

```bash
curl -X PATCH "https://your-panel.com/api/application/locations/{location}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "short": "us-east-1",
    "long": "US East Coast Datacenter (Primary)"
  }'
```

## Delete Location

**DELETE** `/api/application/locations/{location}`

Delete a location. All nodes must be moved to another location first.

```bash
curl -X DELETE "https://your-panel.com/api/application/locations/{location}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

:::warning
You cannot delete a location that still has nodes assigned to it. Move all nodes to another location before deletion.
:::

## Location Usage

Locations are used to:
- Organize nodes geographically
- Group servers by region
- Apply location-specific policies
- Provide users with server location choices

When creating servers, users can choose from available locations based on the nodes in each location. 