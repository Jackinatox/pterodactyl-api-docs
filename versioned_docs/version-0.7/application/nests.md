# Nest & Egg Management

Administrative functions for managing nests (service categories) and eggs (service configurations).

## Nests

### List Nests

**GET** `/api/application/nests`

List all nests in the panel.

**Include Parameters:**
- `eggs` - Include eggs in each nest
- `servers` - Include servers using eggs from this nest

```bash
curl -X GET "https://your-panel.com/api/application/nests?include=eggs,servers" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

### Get Nest Details

**GET** `/api/application/nests/{nest}`

Get details of a specific nest.

### List Nest Eggs

**GET** `/api/application/nests/{nest}/eggs`

List all eggs in a specific nest.

**Include Parameters:**
- `nest` - Include nest information
- `servers` - Include servers using this egg
- `config` - Include egg configuration
- `script` - Include installation script
- `variables` - Include environment variables

```bash
curl -X GET "https://your-panel.com/api/application/nests/{nest}/eggs?include=variables,servers" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

## Eggs

### Get Egg Details

**GET** `/api/application/eggs/{egg}`

Get details of a specific egg.

**Include Parameters:**
- `nest` - Include nest information
- `servers` - Include servers using this egg
- `config` - Include egg configuration
- `script` - Include installation script
- `variables` - Include environment variables

```bash
curl -X GET "https://your-panel.com/api/application/eggs/{egg}?include=nest,variables,script" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

**Example Response:**
```json
{
  "object": "egg",
  "attributes": {
    "id": 1,
    "uuid": "d3f1b900-413a-4fe9-8a64-8a97e5a0f758",
    "name": "Vanilla",
    "nest": 1,
    "author": "support@pterodactyl.io",
    "description": "Minecraft Java Server",
    "docker_image": "quay.io/pterodactyl/core:java",
    "docker_images": {
      "Java 8": "quay.io/pterodactyl/core:java",
      "Java 11": "quay.io/pterodactyl/core:java-11",
      "Java 16": "quay.io/pterodactyl/core:java-16"
    },
    "config": {
      "files": {
        "server.properties": {
          "parser": "properties",
          "find": {
            "server-ip": "0.0.0.0",
            "server-port": "{{server.build.default.port}}"
          }
        }
      },
      "startup": {
        "done": ")! For help, type \"help\" or \"?\""
      },
      "stop": "stop",
      "logs": {},
      "extends": null
    },
    "startup": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
    "script": {
      "privileged": true,
      "install": "#!/bin/ash\n# Vanilla MC Installation Script\n...",
      "entry": "#!/bin/ash\ncd /home/container\n...",
      "container": "alpine:3.9",
      "extends": null
    },
    "created_at": "2020-06-13T04:26:27+00:00",
    "updated_at": "2020-06-13T04:26:27+00:00"
  }
}
```

## Environment Variables

Eggs contain environment variables that can be configured when creating servers.

**Variable Types:**
- `text` - Text input
- `boolean` - True/false checkbox
- `integer` - Numeric input

**Variable Rules:**
- `required` - Must be provided
- `nullable` - Can be empty
- `numeric` - Must be a number
- `string` - Text validation
- `regex` - Custom regex validation

**Example Variable:**
```json
{
  "object": "egg_variable",
  "attributes": {
    "id": 1,
    "name": "Server Jar File",
    "description": "The name of the server jarfile to run the server with.",
    "env_variable": "SERVER_JARFILE",
    "default_value": "server.jar",
    "user_viewable": false,
    "user_editable": false,
    "rules": "required|string|max:20"
  }
}
```

## Nest & Egg Usage

**Nests** are categories that group similar services:
- Minecraft (Java, Bedrock, etc.)
- Source Engine (CS:GO, TF2, etc.)
- Voice Servers (TeamSpeak, Discord Bots, etc.)

**Eggs** are specific service configurations within a nest:
- Minecraft Vanilla
- Minecraft Forge
- Minecraft Paper/Spigot

Each egg defines:
- Docker image to use
- Installation script
- Startup command
- Configuration files
- Environment variables 