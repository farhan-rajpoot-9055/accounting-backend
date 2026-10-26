# Security Model

## Core Security Principles
- **Defense in Depth**: Multiple layers of security
- **Least Privilege**: Users only get minimum required permissions
- **Deny by Default**: No access unless explicitly granted
- **Zero Trust**: Never trust client input
- **Secure by Design**: Security built in, not bolted on

## Authentication
| Method | Status | Notes |
|--------|--------|-------|
| Email/Password | Required | With secure password requirements |
| Email Verification | Required | Verify email on registration |
| Password Reset | Required | Secure token-based reset |
| Session Management | Required | Secure session handling |
| Remember Me | Optional | Secure implementation |
| MFA | Extension Point | TOTP-based MFA ready for implementation |
| Social Auth | Future | Not in initial scope |

### Password Requirements
- Minimum 8 characters
- Mix of letters, numbers, symbols (configurable)
- Check against common passwords
- Hash with bcrypt/Argon2
- Never store plaintext

## Authorization

### Permission Model
- **Permissions**: Granular actions (view, create, update, delete, approve, post, export, etc.)
- **Roles**: Collections of permissions
- **User Roles**: Assigned to users within tenant context
- **Direct Permissions**: Additional permissions beyond roles
- **Resource-level**: Can be extended for record-level permissions

### Authorization Checks
1. **Route Middleware**: Basic auth and tenant context
2. **Policy Classes**: Model-level authorization
3. **Gates**: For complex checks
4. **Controller**: Explicit checks where needed
5. **Frontend**: UI hiding only (never for security)

### Privilege Separation
- **Platform Admin**: System-wide, completely separate from tenants
- **Tenant Admin**: Full control within tenant
- **Company Admin**: Control within company
- **Regular Users**: Limited by roles/permissions

## Tenant Isolation
- **Context Resolution**: Always resolve and validate tenant
- **Query Scoping**: Global scopes on all tenant models
- **Policy Enforcement**: Check tenant membership
- **Cross-tenant Prevention**: Block all cross-tenant access
- **Job Context**: Preserve tenant context in queues
- **File Access**: Tenant-scoped paths and validation
- **API Validation**: Ignore tenant_id from client

## Data Security
| Data Type | Protection |
|-----------|------------|
| Passwords | Bcrypt hashed, never logged |
| API Tokens | Hashed, encrypted at rest |
| Payment Data | Never stored, use provider tokens |
| PII | Encrypted where sensitive, access logged |
| Financial Data | Strict access control, audit logged |
| Files | Access controlled, type validated |

## API Security
- **CSRF Protection**: For cookie-based auth
- **CORS**: Properly configured
- **Rate Limiting**: Per endpoint and user
- **Input Validation**: All inputs validated
- **Output Filtering**: API Resources control exposure
- **SQL Injection**: Prevented by Eloquent
- **Mass Assignment**: Protected
- **Headers**: Security headers (HSTS, X-Content-Type-Options, etc.)

## File Upload Security
- **Type Validation**: Whitelist allowed mime types
- **Size Limits**: Enforce max file size
- **Filename Sanitization**: Prevent path traversal
- **Storage**: Outside web root or with access control
- **Scanning**: Extension point for virus scanning
- **Tenant Scoping**: Files in tenant directories

## Audit Logging
Log the following events:
- Authentication (login, logout, failed attempts)
- Authorization failures
- Password changes/resets
- Role/permission changes
- Tenant/company/branch context switches
- Financial postings
- Sensitive data access
- User invitations/memberships
- Subscription changes
- File uploads/downloads

**Never log**: Passwords, tokens, credit card numbers, full account numbers

## Webhook Security
- **Signature Verification**: Verify all webhook signatures
- **IP Whitelisting**: Where possible
- **Idempotency**: Handle duplicate webhooks
- **Retry Logic**: Safe retries
- **Timestamp Validation**: Prevent replay attacks
- **Tenant Mapping**: Securely map webhooks to tenants

## Session Security
- **Secure Cookies**: HttpOnly, Secure, SameSite
- **Session Timeout**: Configurable
- **Concurrent Sessions**: Configurable policy
- **Session Regeneration**: On login and privilege changes
- **IP/User Agent**: Optional tracking

## Dependency Security
- **Composer Audit**: Regular audits
- **NPM Audit**: Regular audits
- **Dependabot**: Enabled if on GitHub
- **Version Updates**: Security patches applied promptly
- **License Compliance**: Check all dependencies

## Security Testing
- **Tenant Isolation Tests**: Critical
- **Authorization Tests**: For all protected routes
- **Authentication Tests**: Login, logout, reset
- **Input Validation Tests**: Malicious inputs
- **CSRF Tests**: Where applicable
- **Rate Limit Tests**: Verify limits work

## Incident Response
- **Logging**: Comprehensive logs
- **Monitoring**: Error tracking (extension point)
- **Alerts**: For suspicious activity
- **Backup**: Regular backups
- **Recovery**: Documented procedures

## Compliance Considerations
- **GDPR**: Data export/deletion capabilities (extension points)
- **PCI DSS**: Never store card data
- **Data Retention**: Configurable policies
- **Privacy**: Minimal data collection
