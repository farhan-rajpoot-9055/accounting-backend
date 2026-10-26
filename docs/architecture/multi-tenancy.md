# Multi-Tenancy Architecture

## Strategy
We use **Shared Database, Shared Schema** with tenant isolation via `tenant_id` on all tenant-scoped tables. This approach balances cost-effectiveness, maintainability, and scalability for the initial implementation.

## Data Scoping Levels

| Level | Description | Examples | Scope Rules |
|-------|-------------|----------|-------------|
| **Global** | Platform-wide data, not tenant-specific | Plans, system settings, feature definitions | Accessible only by platform admins |
| **Platform** | Platform administration data | Tenants list, platform metrics, subscription logs | Accessible only by platform administrators |
| **Tenant** | Data scoped to a tenant/organization | Users, roles, settings, most business data | Isolated by tenant_id, accessible to tenant members |
| **Company** | Data scoped to a legal entity within a tenant | Chart of Accounts, Journals, Invoices | Isolated by tenant_id + company_id |
| **Branch** | Data scoped to a location within a company | POS registers, some inventory, local settings | Isolated by tenant_id + company_id + branch_id |

## Tenant Resolution
Tenant context is resolved through:
1. **Authenticated User**: Get user's tenant memberships
2. **Session/Context**: User can switch between tenants/companies/branches they have access to
3. **Subdomain/Domain** (future): Can be added for white-labeling
4. **Request Context**: Middleware resolves and validates tenant context

## Isolation Mechanisms

### Backend
- **Global Scopes**: Eloquent global scopes automatically add tenant_id filters
- **Middleware**: `TenantContext` middleware resolves and validates tenant context
- **Policies**: Authorization policies enforce tenant/company/branch access
- **Jobs/Queues**: Tenant context passed to queued jobs
- **Queries**: All queries must be tenant-scoped
- **File Access**: Files stored with tenant-scoped paths
- **API Validation**: Never trust tenant_id from request body

### Database
- **tenant_id columns**: On all tenant-scoped tables (UUID or BIGINT)
- **Composite indexes**: On (tenant_id, id) and common query patterns
- **Foreign keys**: Include tenant_id in composite foreign keys where appropriate
- **Constraints**: Prevent cross-tenant references
- **Cascading**: Careful with cascades to maintain isolation

### Frontend
- **Context Provider**: Tenant/company/branch context managed globally
- **API Client**: Automatically includes context headers
- **Route Guards**: Check permissions and context
- **UI Restrictions**: Hide/show based on context (but never rely solely on this)

## Membership Model
```
User
├── TenantMemberships (many-to-many with roles)
│   ├── tenant_id
│   ├── user_id
│   ├── roles[]
│   ├── status (active/invited/suspended)
│   └── permissions (additional)
├── CompanyAccess
└── BranchAccess
```

## Onboarding Flow
1. User registers
2. User creates first tenant
3. System creates default company
4. User becomes tenant admin
5. User can invite others or continue setup

## Security Rules
- **Never trust client**: All tenant/company/branch IDs validated server-side
- **Deny by default**: No access without proper membership
- **Separate privileges**: Platform admin != Tenant admin
- **Audit everything**: Log context switches and sensitive operations
- **Cross-tenant prevention**: Tests must verify isolation
- **Job isolation**: Background jobs must have tenant context

## Testing Requirements
- Create at least 2 test tenants with overlapping data
- Attempt cross-tenant access - must be denied
- Test company/branch boundaries
- Test membership changes
- Test invitation flows
- Test context switching

## Future Considerations
- Row-level security (RLS) in PostgreSQL
- Subdomain-based tenancy
- Database per tenant (for enterprise customers)
- Tenant-specific encryption keys
