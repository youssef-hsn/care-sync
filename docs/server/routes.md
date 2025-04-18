# API Routes and Authentication

## RESTful API Structure

Our API follows RESTful conventions with standardized endpoints:

| HTTP Method | Endpoint Pattern | Purpose |
|-------------|-----------------|---------|
| GET | `/api/resource` | Retrieve a list of resources |
| GET | `/api/resource/:id` | Retrieve a specific resource |
| POST | `/api/resource` | Create a new resource |
| PUT | `/api/resource/:id` | Update an entire resource |
| PATCH | `/api/resource/:id` | Partially update a resource |
| DELETE | `/api/resource/:id` | Delete a resource |

Resources include patients, doctors, appointments, medical records, and more.

## JWT Authentication Flow

1. **Registration**: Users register through `/api/auth/register`
2. **Login**: Users authenticate via `/api/auth/login` and receive a JWT token
3. **Authorization**: Protected routes require a valid JWT in the Authorization header
4. **Token Refresh**: Long-lived sessions use `/api/auth/refresh` to maintain access

## Route Protection

Routes are protected using JWT middleware that:
- Validates token signatures
- Checks token expiration
- Verifies user permissions based on roles
- Provides user context to route handlers

Detailed documentation for each specific route is maintained in individual files within the `docs/server/routes` directory.