import CodeTabs from '@site/src/components/CodeTabs';

# Account Management

Manage your account details, API keys, authentication settings, and password.

## Get Account Details

Retrieve information about the authenticated account.

**`GET /api/client/account`**

### Example Request

<CodeTabs
  endpoint="/api/client/account"
  method="GET"
  examples={{
    curl: `curl "https://your-panel.com/api/client/account" \\
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json"`,
    javascript: `const axios = require('axios');

const response = await axios.get('https://your-panel.com/api/client/account', {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('Account details:', response.data);`,
    python: `import requests

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

response = requests.get('https://your-panel.com/api/client/account', headers=headers)
print('Account details:', response.json())`,
    php: `<?php
$client = new GuzzleHttp\\Client();

$response = $client->get('https://your-panel.com/api/client/account', [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ]
]);

$data = json_decode($response->getBody(), true);
print_r($data);
?>`,
    go: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("GET", "https://your-panel.com/api/client/account", nil)
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println("Account details:", result)
}`,
    java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/client/account"))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("Account details: " + response.body());`,
    csharp: `using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var response = await client.GetAsync("https://your-panel.com/api/client/account");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine("Account details: " + content);`,
    ruby: `require 'net/http'
require 'json'

uri = URI('https://your-panel.com/api/client/account')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'

response = http.request(request)
puts "Account details: #{JSON.parse(response.body)}"`
  }}
/>

### Example Response

```json
{
  "object": "user",
  "attributes": {
    "id": 1,
    "admin": true,
    "username": "admin",
    "email": "user@example.com",
    "first_name": "Admin",
    "last_name": "User",
    "language": "en"
  }
}
```






---

## Two-Factor Authentication

### Get 2FA QR Code

Generate a TOTP QR code image for setting up two-factor authentication.

**`GET /api/client/account/two-factor`**

#### Example Request

```bash
curl "https://your-panel.com/api/client/account/two-factor" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```


#### Example Response

```json
{
  "data": {
    "image_url_data": "otpauth://totp/Pterodactyl:admin%40example.com?secret=XHL4JKY746CH46YJCHA25JWAUDBAM24I&issuer=Pterodactyl",
    "secret": "XHL4JKY746CH46YJCHA25JWAUDBAM24I"
  }
}
```


### Enable 2FA

Enable TOTP two-factor authentication using the code from your authenticator app.

**`POST /api/client/account/two-factor`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | string | Yes | 6-digit TOTP code from authenticator app |

#### Example Request



```bash
curl -X POST "https://your-panel.com/api/client/account/two-factor" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "123456"
  }'
```



```javascript
const axios = require('axios');

const twoFactorData = {
  code: '123456'
};

const response = await axios.post('https://your-panel.com/api/client/account/two-factor', twoFactorData, {
  headers: {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
  }
});

console.log('2FA enabled successfully:', response.data);
```



```python
import requests

headers = {
    'Authorization': 'Bearer ptlc_YOUR_API_KEY',
    'Accept': 'Application/vnd.pterodactyl.v1+json',
    'Content-Type': 'application/json'
}

two_factor_data = {
    'code': '123456'
}

response = requests.post('https://your-panel.com/api/client/account/two-factor', 
                        headers=headers, json=two_factor_data)
print('2FA enabled successfully:', response.json())
```



```php
<?php
$client = new GuzzleHttp\Client();

$twoFactorData = [
    'code' => '123456'
];

$response = $client->post('https://your-panel.com/api/client/account/two-factor', [
    'headers' => [
        'Authorization' => 'Bearer ptlc_YOUR_API_KEY',
        'Accept' => 'Application/vnd.pterodactyl.v1+json',
        'Content-Type' => 'application/json'
    ],
    'json' => $twoFactorData
]);

$data = json_decode($response->getBody(), true);
print_r($data);
?>
```



```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    twoFactorData := map[string]interface{}{
        "code": "123456",
    }
    
    jsonData, _ := json.Marshal(twoFactorData)
    
    client := &http.Client{}
    req, _ := http.NewRequest("POST", "https://your-panel.com/api/client/account/two-factor", bytes.NewBuffer(jsonData))
    req.Header.Add("Authorization", "Bearer ptlc_YOUR_API_KEY")
    req.Header.Add("Accept", "Application/vnd.pterodactyl.v1+json")
    req.Header.Add("Content-Type", "application/json")
    
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println("2FA enabled successfully:", result)
}
```



```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String jsonData = """
{
  "code": "123456"
}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://your-panel.com/api/client/account/two-factor"))
    .header("Authorization", "Bearer ptlc_YOUR_API_KEY")
    .header("Accept", "Application/vnd.pterodactyl.v1+json")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("2FA enabled successfully: " + response.body());
```



```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer ptlc_YOUR_API_KEY");
client.DefaultRequestHeaders.Add("Accept", "Application/vnd.pterodactyl.v1+json");

var twoFactorData = new {
    code = "123456"
};

var json = JsonSerializer.Serialize(twoFactorData);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync("https://your-panel.com/api/client/account/two-factor", content);
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine("2FA enabled successfully: " + responseContent);
```



```ruby
require 'net/http'
require 'json'

two_factor_data = {
  code: '123456'
}

uri = URI('https://your-panel.com/api/client/account/two-factor')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer ptlc_YOUR_API_KEY'
request['Accept'] = 'Application/vnd.pterodactyl.v1+json'
request['Content-Type'] = 'application/json'
request.body = two_factor_data.to_json

response = http.request(request)
puts "2FA enabled successfully: #{JSON.parse(response.body)}"
```


#### Example Response

```json
{
  "object": "recovery_tokens",
  "attributes": {
    "tokens": [
      "MpBjHH8O08",
      "D9H0hktN6L", 
      "ho8KiUpeV8",
      "06vZEfrYPf",
      "nFRySZ2ryh",
      "7K1cTrhGoV",
      "n6xpwwlJfv",
      "hAmyCsZxYO",
      "5FiMKFyNpH",
      "IViSFoRFvW"
    ]
  }
}
```


#### Error Response (400)

```json
{
  "errors": [
    {
      "code": "TwoFactorAuthenticationTokenInvalid",
      "status": "400",
      "detail": "The token provided is not valid."
    }
  ]
}
```


### Disable 2FA

Disable two-factor authentication on the account.

**`POST /api/client/account/two-factor/disable`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `password` | string | Yes | Current account password |

#### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/account/two-factor/disable" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "password": "your-current-password"
  }'
```


#### Success Response (204)

Returns empty response body with status code 204.

#### Error Response (400)

```json
{
  "errors": [
    {
      "code": "BadRequestHttpException",
      "status": "400",
      "detail": "An error was encountered while processing this request."
    }
  ]
}
```






---

## Email Management

### Update Email Address

Update the email address associated with your account.

**`PUT /api/client/account/email`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | New email address |
| `password` | string | Yes | Current account password |

#### Example Request

```bash
curl -X PUT "https://your-panel.com/api/client/account/email" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newemail@example.com",
    "password": "your-current-password"
  }'
```


#### Success Response (201)

Returns empty response body with status code 201.

#### Error Responses

**Invalid Email Format (400)**
```json
{
  "errors": [
    {
      "code": "email",
      "detail": "The email must be a valid email address.",
      "source": {
        "field": "email"
      }
    }
  ]
}
```


**Invalid Password (400)**
```json
{
  "errors": [
    {
      "code": "InvalidPasswordProvidedException",
      "status": "400",
      "detail": "The password provided was invalid for this account."
    }
  ]
}
```










---

## Password Management

### Update Password

Change your account password.

**`PUT /api/client/account/password`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `current_password` | string | Yes | Current account password |
| `password` | string | Yes | New password |
| `password_confirmation` | string | Yes | Confirm new password |

#### Example Request

```bash
curl -X PUT "https://your-panel.com/api/client/account/password" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "current_password": "old-password",
    "password": "new-secure-password",
    "password_confirmation": "new-secure-password"
  }'
```


#### Success Response (204)

Returns empty response body with status code 204.









---

## API Keys

### List API Keys

Retrieve a list of all API keys associated with your account.

**`GET /api/client/account/api-keys`**

#### Example Request

```bash
curl "https://your-panel.com/api/client/account/api-keys" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```


#### Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "api_key",
      "attributes": {
        "identifier": "wwQ5DJ6X1XaFznQS",
        "description": "API Documentation",
        "allowed_ips": [],
        "last_used_at": "2020-06-03T15:04:47+01:00",
        "created_at": "2020-05-18T00:12:43+01:00"
      }
    }
  ]
}
```


### Create API Key

Generate a new API key with optional IP restrictions.

**`POST /api/client/account/api-keys`**

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | Yes | Description/note for the API key |
| `allowed_ips` | array | No | List of allowed IP addresses |

#### Example Request

```bash
curl -X POST "https://your-panel.com/api/client/account/api-keys" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "My Application API Key",
    "allowed_ips": ["127.0.0.1", "192.168.1.100"]
  }'
```


#### Example Response

```json
{
  "object": "api_key",
  "attributes": {
    "identifier": "yjAZbHMyKrv9YRZ0",
    "description": "My Application API Key",
    "allowed_ips": [
      "127.0.0.1",
      "192.168.1.100"
    ],
    "last_used_at": null,
    "created_at": "2020-08-17T04:44:42+01:00"
  },
  "meta": {
    "secret_token": "ptlc_wiHiMbmgjLOkA2fPzRD6KdMe7Q9Cqaka"
  }
}
```


:::warning Important
The `secret_token` in the `meta` object is only returned once during creation. Store it securely as it cannot be retrieved again.
:::

### Delete API Key

Delete a specific API key by its identifier.

**`DELETE /api/client/account/api-keys/{identifier}`**

#### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `identifier` | string | The API key identifier |

#### Example Request

```bash
curl -X DELETE "https://your-panel.com/api/client/account/api-keys/yjAZbHMyKrv9YRZ0" \
  -H "Authorization: Bearer ptlc_YOUR_API_KEY" \
  -H "Accept: Application/vnd.pterodactyl.v1+json" \
  -H "Content-Type: application/json"
```


#### Success Response (204)

Returns empty response body with status code 204.

#### Error Response (404)

```json
{
  "errors": [
    {
      "code": "NotFoundHttpException",
      "status": "404",
      "detail": "An error was encountered while processing this request."
    }
  ]
}
```










---

## Common Error Codes

| Status | Code | Description |
|--------|------|-------------|
| 400 | `ValidationException` | Request validation failed |
| 401 | `InvalidCredentialsException` | Invalid API key |
| 403 | `InsufficientPermissionsException` | Insufficient permissions |
| 422 | `UnprocessableEntityHttpException` | Invalid request data |

## Source References

**Controller**: [`AccountController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/AccountController.php)  
**API Keys Controller**: [`ClientApiKeyController`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Http/Controllers/Api/Client/ClientApiKeyController.php)  
**Routes**: [`api-client.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/routes/api-client.php) - Account endpoints  
**Account Model**: [`User.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/User.php)  
**API Key Model**: [`ApiKey.php`](https://github.com/pterodactyl/panel/blob/1.0-develop/app/Models/ApiKey.php)

## Next Steps

- Explore [Server Management](./servers) endpoints
- Review [Authentication](../../authentication) for API key security
- Check [Rate Limiting](../../rate-limiting) guidelines 
