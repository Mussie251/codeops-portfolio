# Campus Events API

A RESTful API built with **NestJS and TypeScript** for managing campus events and their sessions. The API supports event creation, filtering, sorting, pagination, upcoming-event discovery, and session retrieval.

## Features

- Retrieve all campus events.
- Filter events by category, location, and publication status.
- Sort events by date or title in ascending or descending order.
- Paginate event results.
- Retrieve upcoming events.
- Retrieve individual events by ID.
- Retrieve all sessions belonging to an event.
- Retrieve an individual session.
- Create new events with request validation.
- Return appropriate HTTP status codes and error responses.

## Technology Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Runtime:** Node.js
- **Validation:** class-validator and class-transformer
- **Testing:** Vitest
- **Architecture:** Controllers, services, DTOs, and in-memory data storage

## Project Setup

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/Mussie251/codeops-portfolio.git
cd codeops-portfolio/Module-04/Addis-eats-api
```

Install dependencies:

```bash
npm install
```

## Running the Application

Development mode:

```bash
npm run start:dev
```

Production build:

```bash
npx nest build
```

Production mode:

```bash
npm run start:prod
```

The API uses the global `/api` prefix.

Base URL:

```text
http://localhost:3000/api
```

## API Endpoints

### Events

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | Retrieve events with filtering, sorting, and pagination |
| GET | `/api/events/upcoming` | Retrieve upcoming events |
| GET | `/api/events/:id` | Retrieve one event |
| POST | `/api/events` | Create a new event |
| GET | `/api/events/:id/sessions` | Retrieve sessions for an event |
| GET | `/api/events/:id/sessions/:sessionId` | Retrieve a specific session |

### Filtering, Sorting, and Pagination

The `GET /api/events` endpoint supports the following query parameters:

| Parameter | Description | Example |
|---|---|---|
| `category` | Filter by event category | `technology` |
| `location` | Partial location matching | `Main` |
| `isPublished` | Filter by publication status | `true` |
| `sortBy` | Sort by `eventDate` or `title` | `eventDate` |
| `order` | Sort direction: `asc` or `desc` | `desc` |
| `page` | Page number (default: 1) | `2` |
| `limit` | Results per page (default: 5, maximum: 100) | `2` |

Example:

```http
GET /api/events?category=technology&isPublished=true&page=1&limit=5
```

Sorting example:

```http
GET /api/events?sortBy=eventDate&order=desc
```

Location filtering example:

```http
GET /api/events?location=Main
```

### Pagination Response

The events endpoint returns a structured response:

```json
{
  "items": [],
  "total": 5,
  "page": 1,
  "limit": 5,
  "totalPages": 1
}
```

The `items` array contains the matching event records.

### Creating an Event

Send a POST request to:

```http
POST /api/events
Content-Type: application/json
```

Example request body:

```json
{
  "title": "Software Testing Workshop",
  "description": "A practical workshop about software testing.",
  "location": "Main Campus",
  "eventDate": "2027-01-15T09:00:00.000Z",
  "category": "technology",
  "isPublished": true
}
```

A successful request returns HTTP `201 Created` and the newly created event.

### Validation and Error Handling

The API uses NestJS validation pipes and DTO validation.

- Required string fields must not be empty.
- `eventDate` must be a valid date string.
- `isPublished` must be a boolean.
- Invalid request bodies return HTTP `400 Bad Request`.
- Missing events or sessions return HTTP `404 Not Found`.

## Sample Data

The application includes five sample events across several categories:

- Technology
- Engineering
- Business
- Sports

Sample event sessions are also provided for multiple events.

## Testing

The project uses Vitest for automated testing.

Run the complete test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Current Test Results

- Events service: 16 tests
- Events controller: 7 tests
- Orders service: 6 tests
- Orders controller: 3 tests
- App controller: 1 test

**Total: 33 passing automated tests across 5 test files.**

Production compilation was also verified successfully using:

```bash
npx nest build
```

## Data Storage

The Campus Events API currently uses in-memory arrays for events and sessions.

Newly created events remain available while the application process is running. Data is reset when the application restarts.

A persistent database is not currently implemented.

## Project Structure

```text
src/
├── events/
│   ├── dto/
│   │   ├── create-event.dto.ts
│   │   └── find-events-query.dto.ts
│   ├── types/
│   │   └── event.types.ts
│   ├── events.controller.ts
│   ├── events.data.ts
│   ├── events.module.ts
│   ├── events.service.ts
│   ├── events.controller.spec.ts
│   └── events.service.spec.ts
├── orders/
│   ├── orders.controller.ts
│   ├── orders.module.ts
│   ├── order.service.ts
│   ├── order.repository.ts
│   └── ...
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Future Improvements

- Database integration for persistent storage.
- Authentication and authorization.
- Event update and deletion endpoints.
- Search by event title and description.
- Date-range filtering.
- Integration and end-to-end testing.

## Author

**Mussie Gebreamlak**

Manufacturing Engineering | Software Development Trainee

GitHub: [Mussie251](https://github.com/Mussie251)

## License

This project is developed as part of a software development learning assignment.