# API Conventions

## Base URL
All API endpoints are under: `/api/v1`

## HTTP Methods
| Method | Usage | Idempotent |
|--------|-------|------------|
| GET | Retrieve resources | Yes |
| POST | Create resources | No |
| PUT/PATCH | Update resources | PUT yes, PATCH usually yes |
| DELETE | Delete resources | Yes |

## Response Format

### Success Response
```json
{
  "data": { ... },
  "message": "Optional success message",
  "meta": { ... } // For pagination
}
```

### Collection Response
```json
{
  "data": [...],
  "links": {
    "first": "...",
    "last": "...",
    "prev": "...",
    "next": "..."
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 10,
    "per_page": 15,
    "to": 15,
    "total": 150
  }
}
```

### Error Response
```json
{
  "message": "Error message",
  "errors": {
    "field_name": ["Error details"]
  },
  "error_code": "OPTIONAL_ERROR_CODE"
}
```

## Status Codes
| Code | Usage |
|------|-------|
| 200 | OK - Successful GET, PUT, PATCH |
| 201 | Created - Successful POST |
| 204 | No Content - Successful DELETE |
| 400 | Bad Request - Malformed request |
| 401 | Unauthorized - Not authenticated |
| 403 | Forbidden - Not authorized |
| 404 | Not Found - Resource doesn't exist |
| 422 | Unprocessable Entity - Validation errors |
| 429 | Too Many Requests - Rate limited |
| 500 | Internal Server Error - Server error |

## Pagination
- **Default**: 15 items per page
- **Max**: 100 items per page
- **Query Params**: `page`, `per_page`
- **Response**: Include `meta` and `links`

## Filtering
Use query parameters for filtering:
- `?status=active`
- `?search=keyword` (search across relevant fields)
- `?customer_id=123`
- `?date_from=2024-01-01&date_to=2024-12-31`

## Sorting
- `?sort=created_at` (ascending)
- `?sort=-created_at` (descending, use minus prefix)
- `?sort=name,-created_at` (multiple sorts)

## Including Relationships
- `?include=customer,items` (eager load relationships)
- Only include relationships that are needed and authorized

## Field Selection (Sparse Fields)
- `?fields[users]=id,name,email` (future consideration)

## Authentication
- **Headers**: Use cookies for SPA (Sanctum)
- **CSRF**: Required for non-GET requests in SPA
- **Authorization**: Bearer tokens for API clients (future)

## Versioning
- URL-based: `/api/v1/...`
- Breaking changes require new version
- Non-breaking changes can go in same version

## Resource Naming
- **Plural nouns**: `/api/v1/customers`, `/api/v1/invoices`
- **Kebab-case**: For multi-word resources
- **Nested resources**: `/api/v1/customers/{id}/invoices` when appropriate

## Actions
For non-CRUD actions, use verbs:
- `POST /api/v1/invoices/{id}/post`
- `POST /api/v1/invoices/{id}/send`
- `POST /api/v1/payments/{id}/allocate`

## API Resources
All responses must use API Resources to:
- Control data exposure
- Transform data format
- Include/exclude relationships
- Maintain consistency
- Never expose sensitive fields

## Rate Limiting
- **Auth endpoints**: 5 requests per minute
- **General API**: 60 requests per minute per user
- **Exports**: More restrictive
- **Webhooks**: Different limits

## Error Handling
- Never expose stack traces
- Never expose database details
- Never expose internal paths
- Use generic messages for auth failures
- Provide clear validation messages

## Documentation
- OpenAPI/Swagger documentation required
- Document all endpoints, parameters, responses
- Include authentication requirements
- Add examples
- Keep documentation in sync with code
