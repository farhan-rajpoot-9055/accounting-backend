# Backend Architecture

## Structure
The backend follows Laravel conventions with modular organization.

```
apps/backend/
├── app/
│   ├── Core/             # Core/shared functionality
│   │   ├── Concerns/     # Traits
│   │   ├── Enums/        # Enums
│   │   ├── Http/         # Core HTTP classes
│   │   ├── Models/       # Base models
│   │   ├── Policies/     # Base policies
│   │   ├── Services/     # Core services
│   │   └── Traits/       # Shared traits
│   ├── Http/
│   │   ├── Controllers/  # API controllers
│   │   ├── Middleware/   # Middleware
│   │   ├── Requests/     # Form requests
│   │   └── Resources/    # API resources
│   ├── Models/           # Global models (User, etc.)
│   ├── Modules/          # Feature modules
│   └── Providers/        # Service providers
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── routes/
│   ├── api.php
│   └── web.php
└── tests/
```

## Core Principles
- **Thin Controllers**: Controllers delegate to Actions/Services
- **Form Requests**: All validation in Form Request classes
- **API Resources**: Consistent API response formatting
- **Policies**: Authorization logic in Policy classes
- **Actions**: Single-purpose business logic classes
- **Services**: Complex business logic spanning multiple models
- **Jobs**: Long-running tasks queued
- **Events/Listeners**: Decoupled side effects

## Request Lifecycle
1. **Middleware**: CORS, auth, tenant context, rate limiting
2. **Form Request**: Validation and authorization
3. **Controller**: Route to appropriate action/service
4. **Action/Service**: Business logic with transactions
5. **Model**: Database interaction
6. **API Resource**: Format response
7. **Exception Handling**: Consistent error responses

## API Conventions
- **Base Path**: `/api/v1`
- **RESTful**: Standard HTTP methods (GET, POST, PUT/PATCH, DELETE)
- **JSON**: All requests and responses
- **Pagination**: Cursor or page-based pagination
- **Filtering/Sorting**: Via query parameters
- **Versioning**: URL versioning

## Validation
- **Form Requests**: All input validation
- **Rules**: Custom validation rules where needed
- **Authorization**: Form Request can authorize or use Policies
- **Sanitization**: Laravel handles, additional where needed

## Authorization
- **Gates**: Simple authorization checks
- **Policies**: Model-based authorization
- **Middleware**: Route-level checks
- **Permissions**: Role-based with granular permissions
- **Tenant Scoping**: Always enforced

## Database Patterns
- **Migrations**: All schema changes via migrations
- **Factories**: For testing
- **Seeders**: For development/demo data
- **Transactions**: DB::transaction() for multi-step operations
- **Eager Loading**: Prevent N+1 queries
- **Indexes**: On foreign keys and common query columns
- **Soft Deletes**: Where appropriate for audit trails

## Error Handling
- **Exceptions**: Custom exceptions for business logic
- **Handler**: Consistent JSON error responses
- **Validation Errors**: 422 with field errors
- **Authorization**: 403
- **Not Found**: 404
- **Server Errors**: 500 (no stack traces in production)

## Logging
- **Structured Logging**: JSON format
- **Context**: Include user_id, tenant_id, request_id
- **Sensitive Data**: Never log passwords, tokens, card data
- **Channels**: Daily logs, stack for errors

## Queues & Jobs
- **Redis**: Queue driver
- **Jobs**: Implement ShouldQueue
- **Failed Jobs**: Track and retry
- **Batches**: For bulk operations
- **Tenant Context**: Pass tenant context to jobs

## Caching
- **Redis**: Cache driver
- **Tags**: For cache invalidation
- **Config/Routes**: Cached in production
- **Query Caching**: Selective use

## File Storage
- **Disks**: local, s3 configured
- **Tenant Paths**: `tenants/{tenant_id}/...`
- **Validation**: Mime type, size
- **Security**: No direct public access to sensitive files

## Testing
- **Feature Tests**: HTTP endpoint testing
- **Unit Tests**: Business logic testing
- **Database**: SQLite in-memory or PostgreSQL for tests
- **Factories**: For test data
- **Traits**: For common test setup (acting as user, tenant context)

## Security Measures
- **Mass Assignment**: Use $fillable or $guarded carefully
- **SQL Injection**: Eloquent/Query Builder parameterized
- **XSS**: API returns JSON, frontend handles
- **CSRF**: Sanctum SPA protection
- **Rate Limiting**: On auth and sensitive endpoints
- **Encryption**: Use Laravel encryption for sensitive data
- **Headers**: Security headers via middleware
