# Module Boundaries

## Design Principles
- **Single Responsibility**: Each module has a clear, well-defined purpose
- **Loose Coupling**: Modules communicate through well-defined interfaces/contracts
- **High Cohesion**: Related functionality stays within the module
- **No Circular Dependencies**: Enforced through dependency rules
- **Shared Kernel**: Common functionality in core/shared modules

## Module Categories

### Core Platform Modules (Foundation)
These modules are essential for the platform to function:

| Module | Purpose | Dependencies | Scope |
|--------|---------|--------------|-------|
| **Platform Admin** | System-wide administration, tenant management | None (root) | Global/Platform |
| **Tenancy** | Tenant, company, branch management | Platform Admin | Platform/Tenant |
| **Auth & Users** | Authentication, users, roles, permissions | Tenancy | Tenant |
| **Subscriptions** | Plans, billing, entitlements | Tenancy, Auth | Tenant/Platform |
| **Settings** | System and tenant configuration | Tenancy | Tenant/Global |

### Core Business Modules (Essential)
These form the backbone of business operations:

| Module | Purpose | Dependencies | Scope |
|--------|---------|--------------|-------|
| **Accounting** | Chart of Accounts, Journals, GL, Reports | Auth, Settings | Company/Tenant |
| **Contacts** | Customers, Vendors, Contacts (CRM foundation) | Auth | Tenant |
| **Sales** | Quotations, Orders, Invoices | Accounting, Contacts, Products, Taxes | Company |
| **Purchases** | RFQs, PO, Bills | Accounting, Contacts, Products, Taxes | Company |
| **Payments** | Receipts, Payments, Reconciliations | Accounting, Sales, Purchases | Company |
| **Expenses** | Expense vouchers, approvals | Accounting, Contacts | Company |

### Operational Modules
| Module | Purpose | Dependencies | Scope |
|--------|---------|--------------|-------|
| **Inventory** | Products, Warehouses, Stock Movements | Accounting, Sales, Purchases | Company |
| **Fixed Assets** | Asset register, Depreciation | Accounting | Company |
| **Taxes** | Tax configuration, calculations | Accounting, Sales, Purchases | Company/Tenant |
| **Projects** | Projects, Tasks, Timesheets | Auth, Contacts | Company |
| **Manufacturing** | BOM, Work Orders, Production | Inventory, Accounting | Company |

### People & HR Modules
| Module | Purpose | Dependencies | Scope |
|--------|---------|--------------|-------|
| **HR** | Employees, Departments, Designations | Auth, Tenancy | Company |
| **Recruitment** | Jobs, Applicants, Hiring | HR, Auth | Company |
| **Attendance** | Attendance, Shifts, Corrections | HR | Company |
| **Leave** | Leave types, Requests, Balances | HR, Attendance | Company |
| **Payroll** | Salary, Payroll runs, Payslips | HR, Accounting | Company |

### Sales Channels & Support
| Module | Purpose | Dependencies | Scope |
|--------|---------|--------------|-------|
| **CRM** | Leads, Opportunities, Pipeline | Contacts, Sales, Projects | Company |
| **POS** | Point of Sale | Inventory, Sales, Payments, Accounting | Company/Branch |
| **eCommerce** | Online Store | Products, Inventory, Sales, Payments | Company |
| **Helpdesk** | Tickets, SLAs | Contacts, Projects | Company |
| **Documents** | Document management | Auth, Tenancy | Tenant/Company |

### Analytics & Integrations
| Module | Purpose | Dependencies | Scope |
|--------|---------|--------------|-------|
| **Reports** | Reporting engine, Dashboards | All relevant modules | Company/Tenant |
| **Audit Logs** | Activity tracking | Auth, Tenancy | Tenant/Platform |
| **Notifications** | Email/SMS/In-app notifications | Auth | Tenant |
| **Integrations** | Third-party integrations | Various | Tenant/Company |

## Module Communication Rules
1. **Direct Dependencies Only**: A module can only depend on explicitly declared dependencies
2. **Event-Driven Communication**: Use events/listeners for cross-module communication when appropriate
3. **Service Contracts**: Define interfaces for services used across modules
4. **No Direct Model Access**: Prefer using services/repositories over direct cross-module model relationships
5. **API Resources**: Use consistent API resource patterns for data exposure

## Module Structure (Backend)
```
app/Modules/{ModuleName}/
├── Actions/        # Business logic actions
├── Contracts/      # Interfaces
├── Events/         # Domain events
├── Http/           # Controllers, Requests, Resources, Middleware
├── Jobs/           # Queued jobs
├── Listeners/      # Event listeners
├── Models/         # Eloquent models
├── Policies/       # Authorization policies
├── Providers/      # Service providers
├── Rules/          # Validation rules
├── Services/       # Domain services
└── routes.php      # Module routes
```

## Module Structure (Frontend)
```
src/features/{module-name}/
├── components/     # Module-specific components
├── hooks/          # Custom hooks
├── pages/          # Route pages
├── services/       # API calls
├── stores/         # State management (if needed)
├── types/          # TypeScript types
└── utils/          # Module utilities
```
