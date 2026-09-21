# Helpdesk Lite API

A lightweight helpdesk ticket management API built with NestJS and TypeScript. It provides a simple way to create, list, filter, update, and close support tickets for internal ticketing workflows.

## Overview

This project is designed as a minimal but professional support system backend. It includes in-memory ticket storage, validation, route-level filtering, and staff-only access control for closing tickets.

## Features

- Create new support tickets
- Retrieve all tickets or filter by status and priority
- Fetch a single ticket by ID
- Update active tickets
- Close tickets with staff-only authorization
- Request validation using DTOs and class-validator
- Clean modular NestJS structure

## Tech Stack

- NestJS
- TypeScript
- Express
- class-validator
- class-transformer

## Prerequisites

Before running the project, make sure you have:

- Node.js 18 or later
- npm 9 or later

## Installation

```bash
npm install
```

## Running the Application

### Development mode

```bash
npm run start
```

### Watch mode

```bash
npm run start:dev
```

### Production build

```bash
npm run build
npm run start:prod
```

## API Endpoints

The API is served from the root path and is organized under the `/tickets` resource.

| Method | Endpoint             | Description                                                     |
| ------ | -------------------- | --------------------------------------------------------------- |
| GET    | `/tickets`           | Get all tickets, optionally filtered by `status` and `priority` |
| GET    | `/tickets/:id`       | Get a specific ticket by ID                                     |
| POST   | `/tickets`           | Create a new ticket                                             |
| PATCH  | `/tickets/:id`       | Update an open ticket                                           |
| PATCH  | `/tickets/:id/close` | Close a ticket; requires staff authorization                    |

## Request Examples

### Create a ticket

```bash
curl -X POST http://localhost:3000/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Password reset issue",
    "description": "User cannot reset their password from the login page.",
    "priority": "high"
  }'
```

### Get all tickets

```bash
curl http://localhost:3000/tickets
```

### Filter by status and priority

```bash
curl "http://localhost:3000/tickets?status=open&priority=high"
```

### Close a ticket

```bash
curl -X PATCH http://localhost:3000/tickets/1/close \
  -H "x-staff-key: helpdeskt-staff-secret"
```

## Staff Access

The close-ticket route is protected by `StaffGuard`. Requests must include the header:

```http
x-staff-key: helpdeskt-staff-secret
```

If the header is missing or invalid, the API returns a forbidden error.

## Project Structure

```text
src/
  app.module.ts
  main.ts
  common/
  tickets/
    dto/
    guards/
    ticket.interface.ts
    tickets.controller.ts
    tickets.module.ts
    tickets.service.ts
```

## Notes

- The project currently uses an in-memory array for ticket persistence.
- This is suitable for development, prototypes, and learning purposes.
- For production use, the next step would be integrating a database such as PostgreSQL or MySQL.

## License

This project is currently unlicensed unless otherwise specified in your repository configuration.
