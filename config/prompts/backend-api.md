# Backend API Template

Use this template when creating new API endpoints.

## Context
- Framework: FastAPI
- Database: PostgreSQL + SQLAlchemy
- Auth: JWT (future)
- Validation: Pydantic

## Structure
```
backend/app/
├── api/v1/<resource>.py     # Router
├── models/<resource>.py     # SQLAlchemy
├── schemas/<resource>.py    # Pydantic
└── services/<resource>_service.py
```

## Endpoint Template
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/api/v1/<resource>", tags=["<resource>"])

@router.get("/")
async def list_resources(
    session: AsyncSession = Depends(get_session)
):
    # Implementation
    pass

@router.post("/")
async def create_resource(
    data: ResourceCreate,
    session: AsyncSession = Depends(get_session)
):
    # Implementation
    pass
```

## Checklist
- [ ] Create SQLAlchemy model
- [ ] Create Pydantic schemas
- [ ] Implement service layer
- [ ] Add API router
- [ ] Register in main.py
- [ ] Add proper error handling
- [ ] Implement validation
- [ ] Add database migrations
- [ ] Write API tests
- [ ] Update API docs

## Standards
- Use async/await
- Proper HTTP status codes
- Consistent error responses
- Request/response validation
- Database transactions
- Proper logging
