# Permission Model

## Overview
The permission system is role-based with support for granular permissions, tenant-scoped roles, and fine-grained access control.

## Permission Structure
Permissions follow the pattern: `{module}.{resource}.{action}`

Examples:
- `sales.invoice.view`
- `sales.invoice.create`
- `sales.invoice.post`
- `accounting.journal.approve`
- `inventory.product.delete`

## Standard Actions
| Action | Description | Risk Level |
|--------|-------------|------------|
| view | View/list resources | Low |
| create | Create new resources | Medium |
| update | Update existing resources | Medium |
| delete | Delete resources | High |
| approve | Approve workflows | High |
| post | Post to accounting (financial) | Critical |
| cancel | Cancel documents | High |
| export | Export data | Medium |
| import | Import data | High |
| manage | Full management of resource | High |
| settings | Manage module settings | High |

## Permission Categories

### Platform Permissions
Only for platform administrators:
- `platform.tenants.manage`
- `platform.plans.manage`
- `platform.subscriptions.view`
- `platform.settings.manage`
- `platform.analytics.view`

### Tenant Permissions
Scoped to tenant:
- `tenant.settings.manage`
- `tenant.users.manage`
- `tenant.roles.manage`
- `tenant.companies.manage`
- `tenant.branches.manage`

### Module Permissions
Each module defines its own permissions based on entities and actions.

## Roles

### System Roles
| Role | Scope | Description |
|------|-------|-------------|
| Platform Super Admin | Global | Full platform access |
| Tenant Owner | Tenant | Full tenant access, cannot be deleted |
| Tenant Admin | Tenant | Administrative access within tenant |
| Company Admin | Company | Administrative access within company |
| User | Tenant | Basic user access based on assigned roles |

### Custom Roles
Tenants can create custom roles with specific permission sets.

## Permission Assignment
1. **Role-based**: Assign roles to users
2. **Direct permissions**: Grant additional permissions
3. **Deny permissions**: Explicitly deny (future)
4. **Contextual**: Apply based on company/branch

## Authorization Flow
1. Check if user is authenticated
2. Resolve tenant context
3. Check tenant membership (active)
4. Check if user has required permission (via role or direct)
5. Check resource-level permissions if applicable
6. Check tenant/company/branch scoping
7. Allow or deny

## Frontend Integration
- **Permission directives/components**: Show/hide UI elements
- **Route guards**: Protect routes
- **Menu filtering**: Show only accessible menu items
- **But always enforce server-side**: Frontend checks are for UX only

## Security Rules
- Never trust permissions from client
- Always check on backend
- Separate platform and tenant permissions
- Prevent privilege escalation
- Log permission changes
- Tenant admins cannot grant platform permissions
- Cannot modify own critical permissions

## Permission Caching
- Cache user permissions per session/request
- Invalidate on role/permission changes
- Clear cache on membership changes
