# API Endpoints Documentation

## Overview
RAPIDS backend uses **FastAPI** with **Pydantic v2** for validation and **SQLAlchemy 2.0** for database access.

## Base URL Structure

```
Development: http://localhost:8000
Production:  https://api.yourdomain.com
Dokploy:     https://{app-name}.yourdomain.com
```

## Authentication

### JWT Bearer Token
```http
Authorization: Bearer <access_token>
```

### Auth Endpoints

#### POST `/auth/register`
Register new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "full_name": "John Doe"
}
```

**Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "full_name": "John Doe",
  "is_active": true,
  "created_at": "2025-01-06T10:00:00Z"
}
```

#### POST `/auth/login`
Login and receive access token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

#### POST `/auth/refresh`
Refresh access token.

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

## User Endpoints

#### GET `/users/me`
Get current user profile.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "full_name": "John Doe",
  "is_active": true,
  "created_at": "2025-01-06T10:00:00Z"
}
```

#### PATCH `/users/me`
Update current user profile.

**Request:**
```json
{
  "full_name": "Jane Doe"
}
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "full_name": "Jane Doe",
  "updated_at": "2025-01-06T11:00:00Z"
}
```

## Resource Endpoints (Example Pattern)

### Items CRUD

#### GET `/items`
List items with pagination.

**Query Parameters:**
- `skip` (int, default: 0) - Offset
- `limit` (int, default: 20, max: 100) - Page size
- `sort_by` (string, optional) - Field to sort by
- `order` (string, optional) - `asc` or `desc`

**Response (200):**
```json
{
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Example Item",
      "description": "Description here",
      "owner_id": "660e8400-e29b-41d4-a716-446655440000",
      "created_at": "2025-01-06T10:00:00Z"
    }
  ],
  "total": 42,
  "skip": 0,
  "limit": 20
}
```

#### POST `/items`
Create new item.

**Request:**
```json
{
  "title": "New Item",
  "description": "Optional description"
}
```

**Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "New Item",
  "description": "Optional description",
  "owner_id": "660e8400-e29b-41d4-a716-446655440000",
  "created_at": "2025-01-06T10:00:00Z"
}
```

#### GET `/items/{item_id}`
Get single item by ID.

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Example Item",
  "description": "Description here",
  "owner_id": "660e8400-e29b-41d4-a716-446655440000",
  "created_at": "2025-01-06T10:00:00Z"
}
```

**Response (404):**
```json
{
  "detail": "Item not found"
}
```

#### PUT `/items/{item_id}`
Update entire item.

**Request:**
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Response (200):** Returns updated item

#### PATCH `/items/{item_id}`
Partial update item.

**Request:**
```json
{
  "title": "New Title Only"
}
```

**Response (200):** Returns updated item

#### DELETE `/items/{item_id}`
Delete item.

**Response (204):** No content

**Response (403):**
```json
{
  "detail": "Not authorized to delete this item"
}
```

## Error Responses

### Standard Error Format
```json
{
  "detail": "Error message here",
  "error_code": "VALIDATION_ERROR",
  "field_errors": {
    "email": ["Invalid email format"]
  }
}
```

### Status Codes
- `200 OK` - Success
- `201 Created` - Resource created
- `204 No Content` - Success, no body
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Missing/invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation failed
- `500 Internal Server Error` - Server error

## Pydantic Schema Patterns

### Request Schema
```python
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=100)
    full_name: str | None = None
```

### Response Schema
```python
from datetime import datetime
from uuid import UUID

class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    full_name: str | None
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}
```

## FastAPI Route Pattern

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/items", tags=["items"])

@router.get("/", response_model=list[ItemResponse])
async def list_items(
    skip: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List items with pagination"""
    items = await get_items(db, skip=skip, limit=limit, owner_id=current_user.id)
    return items

@router.post("/", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
async def create_item(
    item_in: ItemCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create new item"""
    item = await create_item_db(db, item_in, owner_id=current_user.id)
    return item
```

## CORS Configuration

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Rate Limiting

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@router.post("/auth/login")
@limiter.limit("5/minute")
async def login(request: Request, credentials: LoginCredentials):
    # Login logic
    pass
```

## Health Check

#### GET `/health`
Check API status.

**Response (200):**
```json
{
  "status": "healthy",
  "database": "connected",
  "version": "1.0.0"
}
```

## Documentation URLs

- **Swagger UI:** `/docs`
- **ReDoc:** `/redoc`
- **OpenAPI JSON:** `/openapi.json`

## Testing Endpoints

### Using curl
```bash
# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password"}'

# Authenticated request
curl -X GET http://localhost:8000/users/me \
  -H "Authorization: Bearer <token>"
```

### Using httpie
```bash
# Login
http POST http://localhost:8000/auth/login email=test@example.com password=password

# Authenticated request
http GET http://localhost:8000/users/me Authorization:"Bearer <token>"
```

## Related Files
- Backend: `backend/routers/`, `backend/schemas/`, `backend/crud/`
- Docs: `.agent/system/database-schema.md` for DB models
- SOPs: `.agent/sop/api-integration-sop.md` (create when needed)
