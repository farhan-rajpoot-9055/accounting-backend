# OpenCode ERP SaaS

A modular, multi-tenant ERP system built with Laravel and React.

## Quick Start

### Prerequisites
- PHP 8.4+
- Node.js 18+
- Composer
- PostgreSQL/SQLite
- Redis (optional for queues)

### Backend Setup
```bash
cd apps/backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend Setup
```bash
cd apps/frontend
npm install
npm run dev
```

### Docker Setup
```bash
cd infrastructure/docker
docker-compose up -d
```

## Documentation
See `docs/` directory for architecture, modules, and implementation details.

## Development
Follow the phased implementation approach as documented in AGENTS.md.
