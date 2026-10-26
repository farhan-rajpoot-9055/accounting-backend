# AGENTS.md - OpenCode ERP SaaS

## Project Overview
This is OpenCode ERP SaaS, a modular, multi-tenant ERP system inspired by Odoo's capabilities but built as an independent implementation.

## Quick Start
1. Read the architecture documentation in `docs/architecture/`
2. Follow the implementation phases in order (see development-roadmap.md)
3. Each phase has specific prompts - run one at a time
4. Always inspect the repository before making changes

## Technology Stack
- **Frontend**: React, TypeScript (strict), Vite, Tailwind CSS, shadcn/ui, TanStack Query/Table, React Hook Form, Zod
- **Backend**: Laravel, PHP, PostgreSQL, Laravel Sanctum, Redis
- **Infrastructure**: Docker, Nginx, S3-compatible storage

## Project Structure
```
apps/backend/     # Laravel API
apps/frontend/    # React SPA
docs/             # Documentation
infrastructure/   # Docker, deployment configs
scripts/          # Utility scripts
```

## Development Rules
- Run one phase at a time
- Inspect repo before changes
- Preserve existing work
- Never trust client input
- Enforce tenant isolation
- Use decimal arithmetic for money
- Posted journal entries cannot be edited/deleted
- Every posted journal must balance
- Tests must pass before proceeding
- Commit after each stable phase

## Key Principles
1. **Multi-tenancy**: Shared DB with tenant_id scoping
2. **Accounting Integrity**: Double-entry, balanced journals, immutable posted entries
3. **Security**: Server-side authorization, tenant isolation
4. **Modularity**: Clear module boundaries
5. **API-First**: REST APIs under /api/v1

## Documentation
- Architecture: `docs/architecture/`
- Modules: `docs/modules/`
- Permissions: `docs/permissions/`
- Accounting: `docs/accounting/`
- API: `docs/api/`
- Decisions: `docs/decisions/`

## Before Starting Any Phase
1. Read relevant documentation
2. Check git status
3. Inspect current codebase
4. Review dependencies
5. Create implementation plan
6. Implement, test, document

## Testing
- Backend: Pest/PHPUnit
- Frontend: Vitest + React Testing Library
- E2E: Playwright

## Git Workflow
- Commit after each stable phase
- Clear commit messages
- Don't commit secrets
- Review changes before committing

## Important Notes
- This is an independent implementation, not a copy of Odoo
- Verify licenses for any third-party code
- Do not claim tests passed unless actually run
- Build for production from the start
- Focus on correctness over features
- Accounting correctness is critical
