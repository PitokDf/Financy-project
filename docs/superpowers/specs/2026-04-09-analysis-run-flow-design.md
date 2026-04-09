# Analysis Run Flow Design

Date: 2026-04-09
Scope: `backend-2`

## Goal
Implement the analysis flow shown in the sequence diagram into `backend-2` with the existing project style:

- controller for request handling
- Zod validation before service calls
- service for orchestration
- repository for Prisma access only
- shared response helper
- Redis cache invalidation on confirm
- external ML work delegated to `backend_py`

## Assumptions

1. `backend_py` is available at `ML_SERVICE_URL` and exposes analysis endpoints under `/api/ml`.
2. `backend-2` remains the source of truth for user data, transaction mapping, category creation, and analysis-run persistence.
3. The flow should support two stages:
   - `run`: generate cluster suggestions and metrics
   - `confirm`: persist selected cluster names/categories and finalize the analysis

## User Story

As a user, I want to run transaction analysis, review suggested clusters, confirm the final cluster names, and have my transactions mapped to generated categories automatically.

## Proposed Architecture

### 1. Controller Layer
Create an analysis controller that:

- validates `req.body` with Zod schemas
- forwards valid input to the service
- returns standardized API responses through `ResponseUtil`

### 2. Service Layer
Create an analysis service that orchestrates:

- analysis run creation
- transaction retrieval
- minimum transaction checks
- ML request to `backend_py`
- persistence of run status and metrics
- category creation during confirmation
- transaction category updates
- forecast trigger after confirmation
- Redis cache invalidation

### 3. Repository Layer
Add repository methods for:

- creating and updating analysis runs
- reading transactions for analysis
- updating transactions with category mappings
- creating categories from cluster mappings
- reading user category data needed for forecast steps

### 4. External ML Client
Add a small service wrapper to call `backend_py` endpoints.
The wrapper should be isolated so the core analysis service can be tested without real HTTP calls.

## Endpoint Design

### POST `/api/analysis/run`
Input:

- `userId`
- analysis parameters such as range or period, if needed by the current implementation

Behavior:

1. validate request body
2. create analysis run with status `running`
3. fetch user transactions for the target period
4. reject requests with fewer than 50 transactions using HTTP 422
5. send transaction descriptions to the ML service
6. receive clusters, metrics, and suggestions
7. save run metrics and cluster suggestions
8. update run status to `waiting_confirmation`
9. return suggestions and metrics to the client

### POST `/api/analysis/confirm`
Input:

- `userId`
- `runId`
- cluster name mapping / confirmation payload

Behavior:

1. validate request body
2. create categories from confirmed cluster names
3. update transactions to reference generated categories
4. run forecast for the main category or top category path used by the app
5. mark analysis run as `completed`
6. invalidate dashboard cache for the user
7. return analysis summary

## Data Flow

### Run Flow
- controller validates payload
- service creates run record
- repository loads transactions
- service checks minimum count
- service sends descriptions to ML client
- ML client calls `backend_py`
- service stores results and updates status
- controller returns response

### Confirm Flow
- controller validates payload
- service loads run and mapping data
- repository creates categories and updates transactions
- forecast service produces prediction output
- service updates run status
- cache service clears user dashboard cache
- controller returns final result

## Error Handling

Use the existing error middleware and map failures as follows:

- validation failure: 400
- fewer than 50 transactions: 422
- missing run or related data: 404
- Prisma unique / foreign key / not found errors: handled by existing Prisma error mapping
- ML service failure: 502 or 500 depending on whether the downstream call failed due to network or unexpected response
- unexpected errors: 500

## Validation Plan

Create Zod schemas for:

- run request
- confirm request
- cluster mapping payloads if they are passed separately

Validation must happen in controller before service execution.

## Testing Plan

### Unit Tests
- run request validation
- confirm request validation
- minimum-transaction guard
- ML client wrapper behavior using mocked HTTP
- cache invalidation call

### Integration Tests
- successful run flow with mocked repositories and ML service
- successful confirm flow with category creation and transaction updates
- error case when fewer than 50 transactions are available

## Non-Goals

- redesigning unrelated transaction/user flows
- moving ML logic fully into `backend-2`
- introducing new caching patterns beyond dashboard invalidation
- changing the existing response envelope

## Implementation Notes

- Prefer focused files rather than a large monolithic service.
- Keep Prisma access inside repositories.
- Keep HTTP calls to `backend_py` inside one client/service wrapper.
- Reuse `ResponseUtil` for every controller response.

## Open Questions Resolved

- The flow will be implemented as a full run + confirm lifecycle.
- ML work remains in `backend_py`.
- The analysis result should be persisted in `backend-2`.
- Cache invalidation happens after confirmation.
