# Database Schema Documentation

## Overview
RAPIDS projects use **PostgreSQL 16+** with asyncpg for async operations. Schema managed via **Alembic** migrations.

## Standard Schema Pattern

### Projects Using Backend Stack

```sql
-- Core user table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    is_superuser BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- Example feature table
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_items_owner_id ON items(owner_id);
```

## Migration Workflow

### Using Alembic

```bash
# Generate migration
alembic revision --autogenerate -m "Add users table"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

### Migration Template
```python
"""Add users table

Revision ID: 001
Revises:
Create Date: 2025-01-06

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

def upgrade():
    op.create_table(
        'users',
        sa.Column('id', UUID(as_uuid=True), primary_key=True, server_default=sa.text('gen_random_uuid()')),
        sa.Column('email', sa.String(255), unique=True, nullable=False),
        sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now()),
    )
    op.create_index('idx_users_email', 'users', ['email'])

def downgrade():
    op.drop_index('idx_users_email')
    op.drop_table('users')
```

## SQLAlchemy Models

### Base Model Pattern
```python
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Boolean, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('NOW()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('NOW()'), onupdate=text('NOW()'))
```

## Database Configuration

### Environment Variables
```bash
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/dbname
```

### Connection Pool Settings
```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

engine = create_async_engine(
    DATABASE_URL,
    echo=True,  # Development only
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True,  # Verify connections before using
)
```

## Common Patterns

### UUID Primary Keys
Always use `UUID` instead of auto-incrementing integers for security and distributed systems.

### Timestamps
Include `created_at` and `updated_at` on all tables for audit trails.

### Soft Deletes
```python
is_deleted = Column(Boolean, default=False)
deleted_at = Column(TIMESTAMP(timezone=True), nullable=True)
```

### Foreign Key Constraints
Always specify `ON DELETE` behavior:
- `CASCADE` - Delete dependent records
- `SET NULL` - Nullify foreign keys
- `RESTRICT` - Prevent deletion

## Index Strategy

### When to Index
- Foreign keys (automatic in most cases)
- Columns used in WHERE clauses
- Columns used in ORDER BY
- Unique constraints

### When NOT to Index
- Small tables (<1000 rows)
- Columns with low cardinality
- Write-heavy tables (indexes slow writes)

## Performance Tips

### Use EXPLAIN ANALYZE
```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

### Batch Operations
```python
# Good - bulk insert
db.bulk_insert_mappings(User, [
    {"email": "user1@example.com"},
    {"email": "user2@example.com"},
])

# Bad - individual inserts in loop
for email in emails:
    db.add(User(email=email))
```

### Async Queries
```python
from sqlalchemy import select

async def get_user(db: AsyncSession, user_id: UUID):
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()
```

## Migration Safety Checklist

- [ ] Backup database before migration
- [ ] Test migration on staging first
- [ ] Write reversible migrations (downgrade)
- [ ] Avoid data loss operations (DROP COLUMN without backup)
- [ ] Use transactions for multi-step migrations
- [ ] Index creation uses CONCURRENT in production
- [ ] Check foreign key constraints won't break

## Neon PostgreSQL Specifics

RAPIDS recommends **Neon** for serverless PostgreSQL:

### Connection Pooling
Neon handles pooling automatically, but configure:
```python
pool_size=1  # Neon manages pooling
max_overflow=0
```

### Branching
Neon supports database branches for testing migrations:
```bash
# Create branch
neon branches create --name feature-x

# Get connection string
neon connection-string feature-x
```

## Troubleshooting

### Connection Issues
- Check `DATABASE_URL` format
- Verify SSL requirements (`?sslmode=require` for Neon)
- Test with `psql` first

### Migration Conflicts
```bash
# Reset migration history (DEV ONLY)
alembic stamp head

# Merge conflicting migrations
alembic merge heads
```

### Slow Queries
1. Run `EXPLAIN ANALYZE`
2. Add indexes for filtered/sorted columns
3. Use `SELECT` specific columns, not `*`
4. Paginate large result sets

## Schema Evolution Best Practices

1. **Additive changes** - Prefer adding columns over modifying
2. **Backward compatible** - Support old and new schema during rollout
3. **Data migrations** - Separate from schema migrations
4. **Nullable first** - Add columns as nullable, backfill, then make NOT NULL
5. **Version control** - Commit migrations with feature code

## Related Files
- Backend: `backend/alembic/`, `backend/models/`
- Docs: `.agent/system/api-endpoints.md` for API usage
- SOPs: `.agent/sop/database-migration-sop.md` (create when needed)
