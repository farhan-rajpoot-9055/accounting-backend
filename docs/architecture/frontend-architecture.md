# Frontend Architecture

## Structure
The frontend follows a feature-based architecture with clear separation of concerns.

```
apps/frontend/
├── src/
│   ├── app/              # App configuration, router, providers
│   ├── components/       # Shared/reusable components
│   │   ├── ui/           # Base UI components (shadcn/ui)
│   │   ├── layout/       # App shell, navigation
│   │   ├── forms/        # Form components
│   │   ├── tables/       # Table components
│   │   └── shared/       # Other shared components
│   ├── features/         # Feature modules
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── sales/
│   │   └── ...           # One folder per module
│   ├── hooks/            # Global custom hooks
│   ├── lib/              # Utilities, config, API client
│   ├── types/            # Global TypeScript types
│   ├── utils/            # Helper functions
│   └── styles/           # Global styles, design tokens
```

## Design System
See Phase 2 for full design system. Key elements:
- **Design Tokens**: Colors, typography, spacing, borders, shadows
- **Component Library**: Built on shadcn/ui and Radix UI
- **Consistent Patterns**: All forms, tables, pages follow same patterns
- **Accessibility**: WCAG considerations, keyboard navigation, ARIA labels

## State Management
- **Server State**: TanStack Query for API data, caching, mutations
- **Client State**: React Context for auth, tenant context, UI state
- **Form State**: React Hook Form
- **URL State**: React Router for filters, pagination, tabs

## Routing
- **Public Routes**: Login, register, password reset
- **Protected Routes**: Require authentication
- **Tenant Routes**: Require tenant membership
- **Permission-based Routes**: Check permissions
- **Feature Routes**: Organized by module under tenant context

## API Client
```typescript
// Centralized API client with:
// - Base URL configuration
// - Request/response interceptors
// - Auth token/session handling
// - Tenant context headers
// - Error handling
// - Type safety
```

## Component Conventions
- **Functional Components**: Use hooks
- **TypeScript**: Strict typing, no `any`
- **Composition**: Prefer composition over props drilling
- **Small Components**: Keep components focused and reusable
- **Props Interface**: Always define prop types
- **Named Exports**: Preferred over default exports

## Data Fetching Patterns
- **List Pages**: Use TanStack Query with pagination, filtering, sorting
- **Detail Pages**: Fetch single resource
- **Mutations**: Use useMutation with optimistic updates where appropriate
- **Error Handling**: Show toast notifications, inline errors
- **Loading States**: Skeleton loaders
- **Empty States**: Helpful messages with actions

## Form Patterns
- **React Hook Form**: All forms use RHF
- **Zod Validation**: Schema-based validation
- **Server Errors**: Map API errors to form fields
- **Field Components**: Reusable form field wrappers
- **Validation Messages**: Clear, helpful messages

## Table Patterns
- **TanStack Table**: All data tables
- **Server-side**: Pagination, sorting, filtering done server-side
- **Column Visibility**: User can show/hide columns
- **Row Selection**: For bulk actions
- **Responsive**: Horizontal scroll on mobile
- **Empty/Error States**: Consistent handling

## Performance Considerations
- **Code Splitting**: Lazy load routes and heavy components
- **Memoization**: Use React.memo, useMemo, useCallback judiciously
- **Image Optimization**: Lazy loading, proper formats
- **Bundle Size**: Monitor and optimize
- **API Caching**: Leverage TanStack Query caching

## Testing Strategy
- **Unit Tests**: Vitest for utilities, hooks
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright for critical flows
- **API Mocking**: MSW for tests

## Error Handling
- **Error Boundaries**: Route-level and app-level
- **API Errors**: Consistent error display
- **404 Pages**: User-friendly
- **Offline Handling**: Basic offline detection
