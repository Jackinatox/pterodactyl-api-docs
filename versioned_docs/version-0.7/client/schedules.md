# Schedule Management

Create and manage automated tasks that run on your server.

## List Schedules

**GET** `/api/client/servers/{server}/schedules`

List all schedules for the server.

```bash
curl -X GET "https://your-panel.com/api/client/servers/{server}/schedules" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Create Schedule

**POST** `/api/client/servers/{server}/schedules`

Create a new schedule.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Schedule name |
| minute | string | Yes | Cron minute (0-59 or *) |
| hour | string | Yes | Cron hour (0-23 or *) |
| day_of_month | string | Yes | Cron day of month (1-31 or *) |
| day_of_week | string | Yes | Cron day of week (0-6 or *) |
| is_active | boolean | No | Whether schedule is active |

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/schedules" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Daily Restart",
    "minute": "0",
    "hour": "6",
    "day_of_month": "*",
    "day_of_week": "*",
    "is_active": true
  }'
```

## Get Schedule Details

**GET** `/api/client/servers/{server}/schedules/{schedule}`

Get details of a specific schedule including tasks.

```bash
curl -X GET "https://your-panel.com/api/client/servers/{server}/schedules/{schedule}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Update Schedule

**POST** `/api/client/servers/{server}/schedules/{schedule}`

Update an existing schedule.

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/schedules/{schedule}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Schedule Name"}'
```

## Execute Schedule

**POST** `/api/client/servers/{server}/schedules/{schedule}/execute`

Manually execute a schedule immediately.

```bash
curl -X POST "https://your-panel.com/api/client/servers/{server}/schedules/{schedule}/execute" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Delete Schedule

**DELETE** `/api/client/servers/{server}/schedules/{schedule}`

Delete a schedule and all its tasks.

```bash
curl -X DELETE "https://your-panel.com/api/client/servers/{server}/schedules/{schedule}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Schedule Tasks

### List Tasks

**GET** `/api/client/servers/{server}/schedules/{schedule}/tasks`

List all tasks for a schedule.

### Get Task Details

**GET** `/api/client/servers/{server}/schedules/{schedule}/tasks/{task}`

Get details of a specific task.

### Create Task

**POST** `/api/client/servers/{server}/schedules/{schedule}/tasks`

Add a task to a schedule.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| action | string | Yes | Task type (command, power, backup) |
| payload | string | Yes | Task payload |
| time_offset | integer | Yes | Delay in seconds |

**Task Types:**
- `command` - Send console command
- `power` - Power action (start, stop, restart, kill)
- `backup` - Create backup

### Update Task

**POST** `/api/client/servers/{server}/schedules/{schedule}/tasks/{task}`

Update an existing task.

### Delete Task

**DELETE** `/api/client/servers/{server}/schedules/{schedule}/tasks/{task}`

Remove a task from a schedule. 