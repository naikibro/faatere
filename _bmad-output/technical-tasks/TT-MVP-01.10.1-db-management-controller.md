# Technical Task: DB Management Controller

**Task ID**: TT-MVP-01.10.1
**Parent US**: US-MVP-01.10 (Setup Base de données et Entités TypeORM)
**Type**: Backend Feature
**Priority**: P1
**Milestone**: MVP
**GitHub Issue**: [#63](https://github.com/naikibro/faatere/issues/63)
**Status**: Done

---

## Summary

Implement a DB Management Controller in NestJS to expose REST API endpoints for database administration tasks: running migrations and executing seeds. All operations must be **idempotent** to ensure safe repeated execution.

---

## Context

Currently, database migrations and seeds are executed via CLI scripts:
- `yarn migration:run` - Run pending migrations
- `yarn seed` - Run all seeds

This approach requires SSH/shell access to the server, which is not ideal for production environments or containerized deployments. A REST API would enable:
- Triggering migrations/seeds from deployment pipelines
- CI/CD integration without shell access
- Controlled database initialization in production

---

## Acceptance Criteria

### Migration Endpoint

- [x] `POST /api/db/migrate` - Run all pending migrations
  - Returns list of executed migrations
  - Idempotent: returns success with empty list if no pending migrations
  - **No authentication required** (for deployment/init scenarios)

### Seed Endpoint

- [x] `POST /api/db/seed` - Run all seeds
  - Returns summary of seeding operations (created/skipped counts)
  - **Must be idempotent**: seeds check for existing data and skip if already present
  - **No authentication required** (for deployment/init scenarios)

### Security Considerations

- [x] Endpoints should only be enabled in specific environments (configurable via `DB_MANAGEMENT_ENABLED`)
- [ ] Consider IP whitelist or API key for production use (deferred - out of scope for MVP)
- [x] Audit logging for all DB management operations (via NestJS Logger)

### Response Format

All endpoints should return consistent response format:
```typescript
interface DbOperationResponse {
  success: boolean;
  operation: 'migrate' | 'seed';
  details: {
    executed?: string[];
    skipped?: string[];
    errors?: string[];
    summary?: Record<string, number>;
  };
  timestamp: string;
}
```

---

## Technical Design

### File Structure

```
services/backend/src/
├── modules/
│   └── db-management/
│       ├── db-management.module.ts
│       ├── db-management.controller.ts
│       ├── db-management.controller.spec.ts
│       ├── db-management.service.ts
│       ├── db-management.service.spec.ts
│       ├── index.ts
│       ├── guards/
│       │   └── db-management-enabled.guard.ts
│       └── dto/
│           └── db-operation-response.dto.ts
```

### Dependencies

- Reuse existing TypeORM DataSource from `src/config/typeorm.config.ts`
- Zod for input validation
- bcrypt for password hashing

### Idempotency Strategy

**Migrations:**
- TypeORM tracks executed migrations in `migrations` table
- `migration:run` is naturally idempotent (skips already executed)

**Seeds:**
- Seeds are wrapped in a database transaction
- Each seed checks for existing data before creating
- On error, entire transaction is rolled back

### Implementation Notes

1. **Service Layer**:
   - Wrap TypeORM migration runner
   - Implements seed logic with transaction support
   - Return structured results

2. **Error Handling**:
   - Catch migration failures gracefully
   - Transaction rollback on seed failures
   - Log all errors for debugging

3. **Environment Control**:
   - `DB_MANAGEMENT_ENABLED` env variable controls access
   - Guard returns 403 when disabled

4. **Validation**:
   - Zod schema validates email format and password length for board users

---

## API Documentation (Swagger)

```typescript
@ApiTags('Database Management')
@Controller('api/db')
@UseGuards(DbManagementEnabledGuard)
export class DbManagementController {

  @Post('migrate')
  @ApiOperation({ summary: 'Run all pending migrations (idempotent)' })
  @ApiResponse({ status: 200, description: 'Migrations executed successfully' })
  @ApiResponse({ status: 403, description: 'Database management endpoints are disabled' })
  @ApiResponse({ status: 500, description: 'Migration failed' })
  async migrate(): Promise<DbOperationResponse> {}

  @Post('seed')
  @ApiOperation({ summary: 'Run all database seeds (idempotent)' })
  @ApiResponse({ status: 200, description: 'Seeds executed successfully' })
  @ApiResponse({ status: 403, description: 'Database management endpoints are disabled' })
  @ApiResponse({ status: 500, description: 'Seeding failed' })
  async seed(): Promise<DbOperationResponse> {}
}
```

---

## Test Cases

### Unit Tests

- [x] Service correctly identifies pending migrations
- [x] Service handles migration failures gracefully
- [x] Seeds skip existing data correctly
- [x] Response DTOs are correctly formatted
- [x] Zod validates email format
- [x] Zod rejects short passwords
- [x] Duplicate emails are skipped
- [x] Guard allows access when enabled
- [x] Guard throws ForbiddenException when disabled

### Integration Tests

- [x] Migration endpoint runs pending migrations
- [x] Idempotent behavior: running migrations twice produces same state
- [x] Idempotent behavior: running seeds twice produces same state
- [x] Endpoints disabled when `DB_MANAGEMENT_ENABLED=false`

---

## Out of Scope

- Authentication for these endpoints (public for deployment use)
- Migration rollback/revert functionality
- Migration status endpoint
- Automatic migration on application startup
- Database backup/restore endpoints
- IP whitelist or API key (deferred to future enhancement)

---

## Definition of Done

- [x] Both endpoints implemented and tested
- [x] Swagger documentation complete
- [x] Unit tests with >80% coverage
- [x] Integration tests passing
- [x] Environment toggle working
- [x] Code reviewed
- [ ] Merged to main branch

---

## References

- Existing seed implementation: `services/backend/src/seeds/`
- TypeORM config: `services/backend/src/config/typeorm.config.ts`
- PRD Reference: US-MVP-01.10 (Setup Base de données et Entités TypeORM)

---

*Document generated by BMad Master - Technical Task TT-MVP-01.10.1*
