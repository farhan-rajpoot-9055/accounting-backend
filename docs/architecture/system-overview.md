# System Overview

## Purpose
This document defines the architecture for OpenCode ERP SaaS - a modular, multi-tenant ERP system inspired by Odoo's functional capabilities but built as an independent implementation with its own architecture, design, and business logic.

## Vision
To build a production-oriented, modular SaaS ERP platform that provides comprehensive business management capabilities while maintaining strong security, accounting integrity, and scalability.

## Core Principles
- **Modular Monolith**: Start with a modular monolith architecture for simplicity and maintainability, with clear module boundaries
- **Multi-Tenant**: Shared database with tenant-scoped records and strict isolation
- **Accounting First**: Double-entry accounting with strict integrity rules as the foundation
- **Security by Design**: Authorization enforced server-side, tenant isolation at every layer
- **API-First**: RESTful APIs with consistent patterns and comprehensive documentation
- **Extensible**: Clear patterns for adding new modules without disrupting core functionality

## System Architecture
The system follows a three-tier architecture:
1. **Frontend**: React SPA with TypeScript, consuming REST APIs
2. **Backend**: Laravel API server handling business logic, authentication, and data persistence
3. **Infrastructure**: PostgreSQL, Redis, object storage, with Docker-based deployment

## Key Features
The ERP will support the following modules (detailed in module-catalogue.md):
- Platform Administration & Multi-tenancy
- Subscription & Billing
- Core Accounting (Chart of Accounts, Journals, Reports)
- Sales, Purchases, Payments, Expenses
- Inventory & Fixed Assets
- CRM
- HR, Recruitment, Attendance, Leave, Payroll
- Projects & Timesheets
- Manufacturing
- Point of Sale
- eCommerce
- Helpdesk & Documents
- Reporting & Analytics

## Technology Stack
See [technology-decisions.md](technology-decisions.md) for detailed technology choices and rationale.

## Target Users
- Small to Medium Enterprises (SMEs)
- Multi-company organizations
- Businesses requiring integrated financial and operational management

## Non-Goals
- Replicating every Odoo feature or internal implementation details
- Supporting all global tax jurisdictions out of the box (configurable approach)
- Building a microservices architecture initially
- Creating proprietary integrations without abstraction layers