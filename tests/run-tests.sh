#!/bin/bash

# Pterodactyl API Testing Suite Runner
# Usage: ./run-tests.sh [mode] [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if .env.test exists
check_env_file() {
    if [ ! -f ".env.test" ]; then
        print_error ".env.test file not found!"
        print_status "Please copy .env.test.example to .env.test and configure it:"
        echo "  cp .env.test.example .env.test"
        echo "  # Edit .env.test with your panel details"
        exit 1
    fi
}

# Function to validate required environment variables
validate_env() {
    source .env.test
    
    if [ -z "$PTERODACTYL_URL" ]; then
        print_error "PTERODACTYL_URL not set in .env.test"
        exit 1
    fi
    
    if [ -z "$CLIENT_API_KEY" ]; then
        print_error "CLIENT_API_KEY not set in .env.test"
        exit 1
    fi
    
    if [[ ! $CLIENT_API_KEY == ptlc_* ]]; then
        print_error "CLIENT_API_KEY must start with 'ptlc_'"
        exit 1
    fi
    
    print_success "Environment configuration valid"
}

# Function to test API connection
test_connection() {
    print_status "Testing API connection..."
    
    source .env.test
    
    response=$(curl -s -w "%{http_code}" -o /dev/null \
        -H "Authorization: Bearer $CLIENT_API_KEY" \
        -H "Accept: Application/vnd.pterodactyl.v1+json" \
        "$PTERODACTYL_URL/api/client/account" || echo "000")
    
    if [ "$response" -eq 200 ]; then
        print_success "API connection successful"
    elif [ "$response" -eq 401 ]; then
        print_error "API authentication failed - check your CLIENT_API_KEY"
        exit 1
    elif [ "$response" -eq 000 ]; then
        print_error "Could not connect to panel - check your PTERODACTYL_URL"
        exit 1
    else
        print_warning "API responded with status $response - continuing anyway"
    fi
}

# Function to show usage
show_usage() {
    echo "Pterodactyl API Testing Suite"
    echo ""
    echo "Usage: $0 [MODE] [OPTIONS]"
    echo ""
    echo "MODES:"
    echo "  safe      Run only safe (read-only) tests"
    echo "  full      Run all tests including create/delete operations"
    echo "  client    Run only Client API tests"
    echo "  app       Run only Application API tests"
    echo "  websocket Run only WebSocket API tests"
    echo ""
    echo "OPTIONS:"
    echo "  --verbose Enable verbose logging"
    echo "  --watch   Run tests in watch mode"
    echo "  --help    Show this help message"
    echo ""
    echo "EXAMPLES:"
    echo "  $0 safe                    # Safe mode testing"
    echo "  $0 full --verbose          # Full testing with detailed logs"
    echo "  $0 client --watch          # Watch Client API tests"
    echo ""
    echo "ENVIRONMENT:"
    echo "  Configure .env.test with your panel details"
    echo "  See .env.test.example for configuration options"
}

# Main execution
main() {
    local mode="${1:-safe}"
    local verbose=""
    local watch=""
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --verbose)
                verbose="VERBOSE=true"
                shift
                ;;
            --watch)
                watch="--watch"
                shift
                ;;
            --help)
                show_usage
                exit 0
                ;;
            safe|full|client|app|websocket)
                mode="$1"
                shift
                ;;
            *)
                print_error "Unknown option: $1"
                show_usage
                exit 1
                ;;
        esac
    done
    
    print_status "Starting Pterodactyl API Testing Suite"
    print_status "Mode: $mode"
    
    # Change to tests directory
    cd "$(dirname "$0")"
    
    # Check prerequisites
    check_env_file
    validate_env
    test_connection
    
    # Set test command based on mode
    case $mode in
        safe)
            print_status "Running SAFE MODE tests (read-only operations)"
            print_warning "Safe mode enabled - no data will be created or modified"
            env_vars="SAFE_MODE=true $verbose"
            ;;
        full)
            print_status "Running FULL MODE tests (all operations)"
            print_warning "Full mode enabled - test data will be created and cleaned up"
            env_vars="SAFE_MODE=false $verbose"
            ;;
        client)
            print_status "Running Client API tests"
            env_vars="$verbose"
            test_file="client-api.test.ts"
            ;;
        app)
            print_status "Running Application API tests"
            if [ -z "$APPLICATION_API_KEY" ]; then
                print_error "APPLICATION_API_KEY not set - Application API tests require admin privileges"
                exit 1
            fi
            env_vars="$verbose"
            test_file="application-api.test.ts"
            ;;
        websocket)
            print_status "Running WebSocket API tests"
            env_vars="$verbose"
            test_file="websocket-api.test.ts"
            ;;
    esac
    
    # Run tests
    print_status "Executing tests..."
    echo ""
    
    if [ -n "$test_file" ]; then
        env $env_vars jest $test_file $watch
    else
        env $env_vars jest $watch
    fi
    
    if [ $? -eq 0 ]; then
        echo ""
        print_success "All tests completed successfully!"
    else
        echo ""
        print_error "Some tests failed. Check the output above for details."
        exit 1
    fi
}

# Run main function with all arguments
main "$@"