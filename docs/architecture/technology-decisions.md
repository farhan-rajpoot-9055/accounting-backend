# Technology Decisions

## Frontend Stack
| Technology | Version | Rationale |
|------------|---------|-----------|
| React | Latest stable | Component-based UI, large ecosystem, team familiarity |
| TypeScript | Strict mode | Type safety, better developer experience, fewer runtime errors |
| Vite | Latest | Fast development server, optimized builds, modern tooling |
| Tailwind CSS | Latest | Utility-first CSS, consistent design system, rapid development |
| shadcn/ui + Radix UI | Latest | Accessible components, customizable, no vendor lock-in |
| React Router | Latest | Client-side routing |
| TanStack Query | Latest | Server state management, caching, synchronization |
| TanStack Table | Latest | Flexible data tables with sorting, filtering, pagination |
| React Hook Form + Zod | Latest | Form handling with schema validation |
| Apache ECharts | Latest | Data visualization and charts |
| Vitest + React Testing Library | Latest | Unit and component testing |
| Playwright | Latest | End-to-end testing |

## Backend Stack
| Technology | Version | Rationale |
|------------|---------|-----------|
| Laravel | Latest supported | Robust framework, great ecosystem, security features built-in |
| PHP | Supported by Laravel version | Server-side language |
| PostgreSQL | Latest stable | ACID compliance, excellent for financial data, JSON support |
| Laravel Sanctum | Latest | API authentication for SPAs |
| Redis | Latest | Caching, sessions, queues |
| Pest/PHPUnit | Latest | Testing framework |
| OpenAPI/Swagger | Latest | API documentation |

## Infrastructure
| Technology | Rationale |
|------------|-----------|
| Docker & Docker Compose | Containerization for consistent environments |
| Nginx | Reverse proxy, static file serving |
| S3-compatible storage | Scalable file/object storage abstraction |
| GitHub Actions/GitLab CI | Automated testing and deployment |

## Design Decisions

### Architecture Style
- **Modular Monolith**: Chosen over microservices for initial development speed, simpler deployment, easier transactions across modules
- **Domain-Driven Design**: Organize code by business domains/modules
- **API-First**: All functionality exposed via REST APIs

### Multi-Tenancy Strategy
- **Shared Database, Shared Schema**: Cost-effective, easier to maintain
- **Tenant ID on all tenant-scoped tables**: Simple and effective isolation
- **Row-Level Security consideration**: Can be added later if needed
- **Global vs Tenant-scoped data**: Clearly separated

### Authentication Strategy
- **Laravel Sanctum SPA authentication**: For React SPA consuming Laravel API
- **Session-based auth** with CSRF protection
- **Token-based option** available for future mobile apps
- **MFA extension point** for future implementation

### Data Integrity
- **Decimal types for money**: Use `decimal`/`numeric` in PostgreSQL, never float
- **Database transactions**: For all multi-step operations
- **Foreign key constraints**: Where appropriate
- **Application-level validation**: Defense in depth

### File Storage
- **Abstraction layer**: Support local, S3, and other providers
- **Tenant-scoped paths**: Prevent cross-tenant access
- **Virus scanning consideration**: Extension point for future
- **Type/size validation**: On all uploads

## Version Pinning
All dependencies will be pinned to compatible versions. Regular updates will be evaluated carefully, especially for security-critical packages.

## Third-Party Dependencies
We will minimize third-party dependencies, prefer well-maintained packages, and verify licenses. No proprietary Odoo code or assets will be copied.
