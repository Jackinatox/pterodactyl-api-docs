# 🚀 Pterodactyl API Documentation

[![Build Status](https://img.shields.io/github/actions/workflow/status/netvpx/pterodactyl-api-docs/build.yml?branch=main&style=flat-square)](https://github.com/netvpx/pterodactyl-api-docs/actions)
[![Documentation](https://img.shields.io/badge/docs-live-blue?style=flat-square)](https://pterodactyl-api-docs.netvpx.com)
[![API Tests](https://img.shields.io/badge/API%20tests-38%2F38%20passing-green?style=flat-square)](#api-testing)
[![Contributors](https://img.shields.io/github/contributors/netvpx/pterodactyl-api-docs?style=flat-square)](https://github.com/netvpx/pterodactyl-api-docs/graphs/contributors)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

**Complete API documentation and testing suite for Pterodactyl Panel v1.0+**

Maintained by [NETVPX](https://netvpx.com) and shared freely with the Pterodactyl community. This comprehensive documentation covers all API endpoints with multi-language examples, interactive testing, and detailed implementation guides.

📖 **[View Live Documentation →](https://pterodactyl-api-docs.netvpx.com)**

## 🎯 About This Project

This is the **most comprehensive Pterodactyl API documentation** available, featuring detailed coverage of all Pterodactyl Panel v1.0+ endpoints with production-ready examples.

### 🏢 API Coverage

- **👥 Client API** (18 endpoints) - End-user server management, files, databases, backups, scheduling
- **🔧 Application API** (15+ endpoints) - Administrative panel management, users, nodes, servers
- **🔌 WebSocket API** (5 endpoints) - Real-time console access, server statistics, live monitoring

### ✨ What Makes This Special

- **💯 Production-Tested**: All 38 endpoints tested against live Pterodactyl installations
- **🌍 Multi-Language**: Code examples in 8 programming languages for every endpoint
- **🔄 Always Updated**: Continuously verified against Pterodactyl's latest development branch
- **🚪 Open Source**: Community-driven with easy contribution workflow

## 🚀 Key Features

### 📚 Documentation Excellence
- **Modern Stack**: Built with [Docusaurus 3](https://docusaurus.io/) + TypeScript
- **Version Switcher**: Support for multiple API versions (v1.0+ current, v0.7 legacy)
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile
- **Instant Search**: Fast local search with auto-complete
- **Interactive Examples**: Tabbed code samples with copy-to-clipboard
- **Live Testing**: Every endpoint verified against real Pterodactyl panels

### 🌍 Multi-Language Support
**8 Programming Languages** for every API endpoint:
- 📝 **cURL** - Command line HTTP client
- 🟡 **JavaScript** - Node.js and browser examples  
- 🐍 **Python** - Using requests library
- 🐘 **PHP** - cURL and Guzzle implementations
- 🔵 **Go** - Native HTTP client
- ☕ **Java** - OkHttp library
- 🔷 **C#** - HttpClient implementation
- 🔴 **Ruby** - Net::HTTP examples

### 🧪 Comprehensive Testing Suite
- **38/38 Tests Passing**: Complete endpoint coverage
- **Live API Validation**: Tests run against actual Pterodactyl installations
- **Multiple Test Modes**: Safe (read-only), partial, and full destructive testing
- **Automated Cleanup**: Test resources automatically cleaned up
- **CI/CD Integration**: GitHub Actions with comprehensive reporting

### 🤝 Open Source Community
- **Fork-First Workflow**: Clear contribution guidelines
- **Issue Templates**: Bug reports and feature requests
- **PR Templates**: Structured review process
- **Active Maintenance**: Regular updates and community support
- **💬 Community Discussion**: Integrated Giscus commenting system for documentation feedback

## 🛠️ Quick Start

### 🔍 Using the Documentation

**🌐 View Online**: [pterodactyl-api-docs.netvpx.com](https://pterodactyl-api-docs.netvpx.com)

**📝 Quick API Reference**:
- [Client API Overview](https://pterodactyl-api-docs.netvpx.com/docs/api/client) - User server management
- [Application API Overview](https://pterodactyl-api-docs.netvpx.com/docs/api/application) - Admin panel management  
- [WebSocket API](https://pterodactyl-api-docs.netvpx.com/docs/api/websocket) - Real-time console access
- [Authentication Guide](https://pterodactyl-api-docs.netvpx.com/docs/authentication) - API keys and security

### 💻 Local Development

**Prerequisites:**
- Node.js 20.0+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn package manager

```bash
# 1. Fork the repository on GitHub first!
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/pterodactyl-api-docs.git
cd pterodactyl-api-docs

# 3. Install dependencies
npm install

# 4. Start development server
npm start
# → Opens http://localhost:3000

# 5. Build for production
npm run build
# → Generates static files in build/ directory
```

### 🧪 API Testing Setup

```bash
# 1. Copy test configuration
cp .env.test.example .env.test

# 2. Configure your Pterodactyl panel details
nano .env.test

# 3. Run comprehensive API tests
cd tests && npm test
# → Tests all 38 endpoints with detailed reporting
```

## 🧪 API Testing

### 💯 Comprehensive Test Coverage

**38/38 endpoints tested** against live Pterodactyl installations with detailed validation:

| API Type | Endpoints | Status | Coverage |
|----------|-----------|--------|----------|
| Client API | 18 tests | ✅ Passing | Account, servers, files, databases, backups, scheduling, network, users |
| Application API | 15 tests | ✅ Passing | Users, servers, nodes, locations, nests/eggs, error handling |
| WebSocket API | 5 tests | ✅ Passing | Authentication, connections, token management |

### 🚀 Test Suite Features

- **🔥 Live API Validation**: Tests against real Pterodactyl panels
- **🛡️ Safe Mode**: Read-only tests for production environments
- **🔄 Auto Cleanup**: Test resources automatically cleaned up
- **📊 Performance Metrics**: Response time monitoring
- **📝 Detailed Logging**: Full request/response analysis
- **🐛 Schema Validation**: Ensures API responses match documented formats

### 🏃‍♂️ Running Tests

```bash
# Quick test run (safe mode - read only)
npm test -- --testNamePattern="list"

# Full destructive test suite
SAFE_MODE=false npm test

# Test specific endpoints
npm test -- --testNamePattern="servers"
```

### 🤖 CI/CD Integration

**GitHub Actions** automatically:
- ✅ Build documentation on every commit
- 🧪 Run test suite on pull requests  
- 📊 Generate coverage reports
- 🛡️ Scan for security vulnerabilities
- 🚀 Deploy to production on main branch

## Project Structure

```
├── docs/                   # Documentation content
│   ├── intro.md           # Introduction page
│   ├── authentication.md  # Authentication guide
│   ├── rate-limiting.md   # Rate limiting information
│   ├── error-handling.md  # Error handling guide
│   ├── contributing.md    # Contribution guidelines (within docs)
│   └── api/               # API documentation
│       ├── client/        # Client API endpoints
│       ├── application/   # Application API endpoints
│       └── websocket.md   # WebSocket API documentation
├── tests/                 # Enhanced API testing suite
├── static/                # Static assets (images, favicons, etc.)
├── src/                   # React components and styling
├── .github/               # GitHub templates and workflows
│   ├── ISSUE_TEMPLATE/    # Bug report and improvement templates
│   ├── workflows/         # GitHub Actions (build.yml)
│   └── pull_request_template.md
├── docusaurus.config.ts   # Docusaurus configuration
├── sidebars.ts           # Sidebar configuration
├── CONTRIBUTING.md        # Contribution guidelines
├── LICENSE               # MIT License
└── package.json          # Dependencies and scripts
```

## Multi-Language Support

All API endpoints include examples in **8 programming languages**:

- **cURL** - Command line HTTP client
- **JavaScript** - Node.js and browser examples  
- **Python** - Using requests library
- **PHP** - Using cURL and Guzzle
- **Go** - Native HTTP client
- **Java** - Using OkHttp
- **C#** - Using HttpClient
- **Ruby** - Using Net::HTTP

Examples are presented in an interactive tabbed interface for easy language switching.

## API Documentation Coverage

### Client API
- Account management and authentication
- Server power controls and resource monitoring
- File management and operations
- Database creation and management
- Scheduled task automation
- Network allocation management
- User permissions and subuser management
- Backup management

### Application API
- User administration
- Server creation and management
- Node and location management
- Nest and egg configuration
- System-wide settings

### WebSocket API
- Real-time server console access
- Live server statistics
- Event-based communication

## Contributing

We welcome contributions from the community! This project is open source and we encourage developers to help improve the documentation.

### Quick Contribution

For small fixes:
1. Click "Edit this page" on any documentation page
2. Make your changes in GitHub
3. Submit a pull request

### Larger Contributions

For significant changes:
1. Read our [Contributing Guidelines](CONTRIBUTING.md)
2. Check out our [documentation contribution guide](https://pterodactyl-api-docs.netvpx.com/docs/contributing)
3. Fork the repository
4. Create a feature branch
5. Make your changes and test locally
6. Submit a pull request using our template

### Community Standards

- All code examples must be tested and working
- Follow the established multi-language format
- Use CodeTabs component for code examples
- Maintain NETVPX branding and style consistency

## Automated Testing & CI/CD

- **GitHub Actions** automatically build and test documentation
- **Pull Request Templates** ensure quality contributions
- **Issue Templates** for bug reports and improvements
- **Local Testing** with comprehensive API test suite

## Support

For support with this documentation:

- **GitHub Issues**: [Report bugs or request improvements](https://github.com/netvpx/pterodactyl-api-docs/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/netvpx/pterodactyl-api-docs/discussions)
- **NETVPX Support**: [https://netvpx.com/support](https://netvpx.com/support)
- **Pterodactyl Community**: [Discord](https://discord.gg/pterodactyl)

## Related Links

- **Pterodactyl Panel**: [https://pterodactyl.io/](https://pterodactyl.io/)
- **Pterodactyl GitHub**: [https://github.com/pterodactyl/panel](https://github.com/pterodactyl/panel)
- **NETVPX**: [https://netvpx.com/](https://netvpx.com/)
- **Docusaurus**: [https://docusaurus.io/](https://docusaurus.io/)

## Recognition

Special thanks to all contributors who help make this documentation better for the Pterodactyl community!

## License

This documentation is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

The Pterodactyl Panel software is licensed under the MIT License by the Pterodactyl Software team.

---

**Maintained with ❤️ by [NETVPX](https://netvpx.com) and shared freely with the Pterodactyl community.**