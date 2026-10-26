# Module Catalogue

## Platform & Administration
| Module | Status | Purpose | Key Entities | Priority |
|--------|--------|---------|--------------|----------|
| Platform Admin | Planned | System-wide administration of SaaS platform | PlatformUser, SystemSetting | P0 |
| Tenancy | Planned | Multi-tenant structure management | Tenant, Company, Branch, Membership | P0 |
| Auth & Permissions | Planned | Authentication, users, roles, permissions | User, Role, Permission, Invitation | P0 |
| Subscriptions & Billing | Planned | Plans, subscriptions, billing, entitlements | Plan, Subscription, Invoice, Payment | P0 |

## Core Financial
| Module | Status | Purpose | Key Entities | Priority |
|--------|--------|---------|--------------|----------|
| Accounting | Planned | Double-entry accounting core | ChartOfAccount, Journal, JournalEntry, FiscalYear | P0 |
| Sales | Planned | Sales process management | Quotation, SalesOrder, SalesInvoice, CreditNote | P0 |
| Purchases | Planned | Purchase process management | PurchaseRequest, RFQ, PurchaseOrder, VendorBill | P0 |
| Payments | Planned | Payment processing and allocation | Payment, Receipt, Allocation | P0 |
| Expenses | Planned | Expense tracking and approval | Expense, ExpenseCategory, ExpenseVoucher | P0 |
| Taxes | Planned | Tax configuration and calculation | Tax, TaxRate, TaxGroup | P0 |
| Fixed Assets | Planned | Asset management and depreciation | Asset, AssetCategory, Depreciation | P0 |

## Operations & Inventory
| Module | Status | Purpose | Key Entities | Priority |
|--------|--------|---------|--------------|----------|
| Contacts | Planned | Customer and vendor management | Contact, ContactGroup, Address | P0 |
| Inventory | Planned | Stock management and valuation | Product, Warehouse, StockMove, StockLocation | P0 |
| Projects | Planned | Project management and tracking | Project, Task, Milestone, TimeEntry | P1 |
| Manufacturing | Planned | Production management | BOM, WorkOrder, Routing, ProductionOrder | P2 |

## Human Resources
| Module | Status | Purpose | Key Entities | Priority |
|--------|--------|---------|--------------|----------|
| HR | Planned | Employee management | Employee, Department, Designation | P1 |
| Recruitment | Planned | Hiring and applicant tracking | JobPosition, Applicant, Interview, Offer | P1 |
| Attendance | Planned | Attendance tracking | Attendance, Shift, AttendanceRule | P1 |
| Leave | Planned | Leave management | LeaveType, LeaveRequest, LeaveBalance | P1 |
| Payroll | Planned | Payroll processing | SalaryStructure, PayrollRun, Payslip | P1 |

## Sales & Customer Management
| Module | Status | Purpose | Key Entities | Priority |
|--------|--------|---------|--------------|----------|
| CRM | Planned | Lead and opportunity management | Lead, Opportunity, Activity, Pipeline | P1 |
| Point of Sale | Planned | Retail POS system | POSSession, POSOrder, POSPayment | P2 |
| eCommerce | Planned | Online store | Store, Product, Cart, Order | P2 |

## Support & Utilities
| Module | Status | Purpose | Key Entities | Priority |
|--------|--------|---------|--------------|----------|
| Helpdesk | Planned | Support ticket management | Ticket, TicketCategory, SLA | P2 |
| Documents | Planned | Document management system | Document, Folder, DocumentShare | P2 |
| Reports | Planned | Reporting and analytics | Report, Dashboard, Widget | P0 |
| Notifications | Planned | Notification system | Notification, NotificationTemplate | P0 |
| Audit Logs | Planned | Activity auditing | AuditLog | P0 |
| Integrations | Planned | Third-party integrations | Integration, IntegrationLog | P2 |

Implementation order starts with platform/auth, then subscriptions, then accounting core, then sales/purchases, then inventory, then reporting, followed by extended modules.
