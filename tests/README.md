# Pterodactyl API Testing Suite

A focused testing suite that validates documented API endpoints against a live Pterodactyl panel environment.

## 🎯 Purpose

This test suite ensures that:
- All documented API endpoints work as described
- API responses match the documented schemas
- Error handling works correctly
- Examples in the documentation are accurate

## 🚀 Quick Start

### 1. Environment Setup

Copy the environment template:
```bash
cp .env.test.example .env.test
```

Edit `.env.test` with your panel details:
```bash
# Required
PTERODACTYL_URL=https://your-panel.com
CLIENT_API_KEY=ptlc_your_client_api_key

# Optional (for admin endpoint testing)
APPLICATION_API_KEY=ptla_your_application_api_key

# Recommended for production panels
SAFE_MODE=true
```

### 2. Run Tests

```bash
# Safe mode (read-only operations)
npm run test:api:safe

# Full testing (includes create/delete operations)
npm run test:api:full

# Specific API tests
npm run test:api:client
npm run test:api:application
npm run test:api:websocket
```

## 🔧 Test Modes

### Safe Mode
- **Read-only operations** only (GET requests)
- **No data modification** or server control
- **Safe for production** panels
- Enable with: `SAFE_MODE=true`

### Full Mode  
- **All API operations** including POST/PUT/DELETE
- **Automatic cleanup** of test data
- **Requires caution** on production panels
- Enable with: `SAFE_MODE=false`

### Partial Mode
- **Read operations** + some safe write operations
- **Skips destructive** operations like server deletion
- Enable with: `SKIP_DESTRUCTIVE=true`

## 📊 Test Coverage

### Client API (`client-api.test.ts`)
- ✅ Account Management (profile, API keys, 2FA)
- ✅ Server Management (list, details, resources)
- ✅ File Operations (list, upload URLs)
- ✅ Database Management (list, create)
- ✅ Network/Allocations (list, manage)
- ✅ User Management (subusers, permissions)
- ✅ Backup Operations (list, create, manage)
- ✅ Schedule Management (list, create, execute)
- ✅ Error Handling (404s, validation errors)

### Application API (`application-api.test.ts`)
- ✅ User Administration (CRUD operations)
- ✅ Server Administration (list, details, databases)
- ✅ Node Management (list, details, configuration)
- ✅ Location Management (list, CRUD)
- ✅ Nest & Egg Management (list, details)
- ✅ Error Handling (admin-specific errors)

### WebSocket API (`websocket-api.test.ts`)
- ✅ Token Generation & Validation
- ✅ WebSocket Connection Testing
- ✅ Authentication Flow
- ✅ Token Expiration Validation
- ✅ Invalid Token Handling

## 🛠️ Configuration Options

### Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `PTERODACTYL_URL` | Yes | Panel URL | - |
| `CLIENT_API_KEY` | Yes | Client API key (ptlc_*) | - |
| `APPLICATION_API_KEY` | No | Admin API key (ptla_*) | - |
| `TEST_SERVER_ID` | No | Existing server ID for testing | Auto-discovered |
| `SAFE_MODE` | No | Enable safe mode | `false` |
| `SKIP_DESTRUCTIVE` | No | Skip destructive operations | `false` |
| `VERBOSE` | No | Enable detailed logging | `false` |
| `TEST_TIMEOUT` | No | Request timeout (ms) | `30000` |
| `RETRY_ATTEMPTS` | No | Retry failed requests | `2` |

### Test Data Auto-Discovery

The test suite automatically discovers:
- Available servers for testing
- Existing users and permissions
- Node and location configurations
- Available nests and eggs

## 🧹 Automatic Cleanup

In Full Mode, the test suite automatically cleans up:
- Created API keys
- Test user accounts  
- Test databases
- Test schedules
- Test backups
- Uploaded files

Cleanup runs:
- After each test completes
- On test suite completion
- On process termination (SIGINT/SIGTERM)

## 📝 Test Results

### Success Indicators
- ✅ All endpoints respond correctly
- ✅ Response schemas match documentation
- ✅ Error handling works as expected
- ✅ Authentication and permissions work

### Common Issues
- ❌ **Connection Failed**: Check panel URL and network access
- ❌ **401 Unauthorized**: Verify API key format and permissions
- ❌ **403 Forbidden**: API key lacks required permissions
- ❌ **404 Not Found**: Resource doesn't exist (check server/user IDs)
- ❌ **422 Validation**: Request data doesn't meet API requirements

## 🔍 Debugging

### Enable Verbose Logging
```bash
VERBOSE=true npm run test:api
```

### Test Specific Endpoints
```bash
# Test only account endpoints
npx jest --testNamePattern="Account Management"

# Test only server operations  
npx jest --testNamePattern="Server Management"

# Test with custom timeout
TEST_TIMEOUT=60000 npm run test:api
```

### Check API Key Permissions
```bash
# Test API key permissions
curl -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Accept: Application/vnd.pterodactyl.v1+json" \
     https://your-panel.com/api/client/account
```

## 🤝 Contributing

1. **Test New Endpoints**: Add tests for new API endpoints
2. **Improve Error Handling**: Add tests for edge cases
3. **Schema Validation**: Enhance response validation
4. **Documentation**: Keep tests aligned with API docs

### Adding New Tests

```typescript
test('GET /api/client/new-endpoint - description', async () => {
  logTestProgress('Testing new endpoint');
  
  const response = await clientApi.get('/api/client/new-endpoint');
  
  expectSuccessfulResponse(response);
  expect(response.data).toHaveProperty('expected_field');
});
```

## 📚 Related Documentation

- [Pterodactyl API Documentation](../docs/intro.md)
- [Authentication Guide](../docs/authentication.md)
- [Rate Limiting](../docs/rate-limiting.md)
- [Error Handling](../docs/error-handling.md)