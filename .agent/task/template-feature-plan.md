# Feature Plan Template

**Feature Name:** [Name of the feature]
**Priority:** [High/Medium/Low]
**Estimated Effort:** [Hours/Days]
**Status:** [Planning/In Progress/Blocked/Completed]
**Created:** [Date]
**Updated:** [Date]

---

## 1. Problem Statement

**What problem does this solve?**
[Describe the user pain point or business need]

**Who is this for?**
[Target users, use cases]

**Success Metrics:**
- [Metric 1: e.g., "50% reduction in onboarding time"]
- [Metric 2: e.g., "10% increase in conversion"]

---

## 2. Requirements

### Functional Requirements
- [ ] [Requirement 1: e.g., "User can upload profile picture"]
- [ ] [Requirement 2: e.g., "Image resized to 500x500 automatically"]
- [ ] [Requirement 3]

### Non-Functional Requirements
- [ ] [Performance: e.g., "Upload completes within 3 seconds"]
- [ ] [Security: e.g., "Only authenticated users can upload"]
- [ ] [Scalability: e.g., "Handle 10,000 concurrent uploads"]

### Out of Scope
- [What this feature explicitly does NOT include]
- [Future considerations moved to backlog]

---

## 3. Technical Design

### Architecture Changes
```
[Diagram or description of how this fits into existing system]

Example:
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Mobile    │─────▶│   Backend   │─────▶│  Database   │
│  (Flutter)  │      │  (FastAPI)  │      │ (Postgres)  │
└─────────────┘      └─────────────┘      └─────────────┘
       │                    │
       │                    ▼
       │            ┌─────────────┐
       └───────────▶│  S3 Storage │
                    └─────────────┘
```

### Database Changes
**New Tables:**
```sql
CREATE TABLE profile_pictures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    file_url VARCHAR(500) NOT NULL,
    file_size INTEGER,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Migrations Required:**
- [ ] Migration: Add `profile_pictures` table
- [ ] Migration: Add `profile_picture_url` to `users` table

**Related Docs:** `.agent/system/database-schema.md`

### API Changes
**New Endpoints:**
- `POST /users/me/profile-picture` - Upload picture
- `DELETE /users/me/profile-picture` - Remove picture
- `GET /users/{user_id}/profile-picture` - Get picture URL

**Modified Endpoints:**
- `GET /users/me` - Include `profile_picture_url` in response

**Related Docs:** `.agent/system/api-endpoints.md`

### Frontend Changes
**Mobile (Flutter):**
- New widget: `ProfilePictureUploader`
- Update: `ProfileScreen` to show upload button
- New service: `ProfilePictureService` for API calls

**Web (Next.js):**
- New component: `ProfilePictureUpload.tsx`
- Update: `app/profile/page.tsx`
- New API route: `app/api/profile-picture/route.ts`

### Dependencies
**New Packages:**
- `multer` (backend file upload)
- `sharp` (image processing)
- `image_picker` (Flutter image selection)

**Configuration:**
- S3 bucket setup
- Environment variables: `S3_BUCKET`, `S3_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`

---

## 4. Implementation Plan

### Phase 1: Backend API (2 hours)
- [ ] Create `profile_pictures` table migration
- [ ] Create Pydantic schemas (`ProfilePictureUpload`, `ProfilePictureResponse`)
- [ ] Implement upload endpoint with file validation
- [ ] Implement S3 integration
- [ ] Add image resizing with `sharp`
- [ ] Write unit tests

**Files to Modify:**
- `backend/alembic/versions/xxx_add_profile_pictures.py` (new)
- `backend/schemas/profile_picture.py` (new)
- `backend/routers/users.py` (modify)
- `backend/services/s3.py` (new)
- `backend/tests/test_profile_picture.py` (new)

### Phase 2: Mobile UI (3 hours)
- [ ] Create `ProfilePictureUploader` widget
- [ ] Integrate `image_picker` package
- [ ] Add upload progress indicator
- [ ] Update `ProfileScreen`
- [ ] Handle errors (file too large, network failure)
- [ ] Add loading states

**Files to Modify:**
- `mobile/lib/widgets/profile_picture_uploader.dart` (new)
- `mobile/lib/screens/profile_screen.dart` (modify)
- `mobile/lib/services/profile_picture_service.dart` (new)
- `mobile/lib/providers/profile_provider.dart` (modify)

### Phase 3: Web UI (2 hours)
- [ ] Create `ProfilePictureUpload` component
- [ ] Add file input with drag-and-drop
- [ ] Show preview before upload
- [ ] Update profile page
- [ ] Add error handling

**Files to Modify:**
- `web/components/ProfilePictureUpload.tsx` (new)
- `web/app/profile/page.tsx` (modify)
- `web/app/api/profile-picture/route.ts` (new)

### Phase 4: Testing & Deployment (1 hour)
- [ ] Test upload flow end-to-end
- [ ] Test error cases (large file, invalid format)
- [ ] Update Docker configs if needed
- [ ] Deploy to staging
- [ ] Smoke test on staging
- [ ] Deploy to production

---

## 5. Testing Strategy

### Unit Tests
- [ ] Backend: Upload validation
- [ ] Backend: S3 integration (mocked)
- [ ] Backend: Image resizing

### Integration Tests
- [ ] Full upload flow: Mobile → API → S3
- [ ] Error handling: Network failure, invalid file

### Manual Testing Checklist
- [ ] Upload from mobile (iOS)
- [ ] Upload from mobile (Android)
- [ ] Upload from web (Chrome, Safari)
- [ ] Large file rejection (>5MB)
- [ ] Invalid format rejection (not JPG/PNG)
- [ ] Profile picture displays correctly
- [ ] Delete profile picture works

---

## 6. Rollout Plan

### Staging Deployment
**Date:** [TBD]
**Testing:** 2-3 days on staging
**Stakeholders:** Internal team

### Production Deployment
**Date:** [TBD]
**Rollout:** 100% of users
**Monitoring:** Track upload success rate, error rate

### Rollback Plan
If upload success rate <90%:
1. Revert backend deployment
2. Keep frontend changes (graceful degradation)
3. Investigate errors
4. Fix and redeploy

---

## 7. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| S3 bucket misconfiguration | High | Medium | Test in staging first, use IAM roles |
| Large file uploads slow | Medium | High | Implement client-side validation, show progress |
| Image processing crashes backend | High | Low | Use background jobs for processing |

---

## 8. Documentation Updates

- [ ] Update API documentation (`/docs`)
- [ ] Add user guide for profile picture upload
- [ ] Update `.agent/system/api-endpoints.md`
- [ ] Update `.agent/system/database-schema.md`
- [ ] Create SOP if integration issues arise

---

## 9. Post-Launch

### Monitoring
- Upload success rate (target: >95%)
- Average upload time (target: <3s)
- Error rate (target: <1%)
- S3 storage costs

### Follow-Up Items
- [ ] Add image cropping on mobile
- [ ] Support GIF avatars
- [ ] Implement CDN for faster loading

---

## 10. Notes & Decisions

**2025-01-06:** Decided to use S3 over Cloudinary for cost savings.
**2025-01-07:** Increased max file size to 5MB after user feedback.

---

## 11. Related Documentation

- `.agent/system/architecture-overview.md` - System design
- `.agent/system/database-schema.md` - DB patterns
- `.agent/system/api-endpoints.md` - API patterns
- `.agent/sop/s3-integration-sop.md` - S3 setup steps (create if needed)

---

**Instructions for Use:**
1. Copy this template to `.agent/task/{feature-name}-plan.md`
2. Fill out all sections before implementation
3. Update status as you progress
4. Check off tasks in implementation plan
5. Archive to `.agent/task/archive/` when completed
