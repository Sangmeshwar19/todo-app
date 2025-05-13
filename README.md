# Todo App API (NestJS + PostgreSQL)

This is a simple Todo API built with [NestJS](https://nestjs.com/) and PostgreSQL.  
It provides CRUD operations for tasks, with pagination, filtering, and Swagger documentation.

## Features

- Create, Read, Update, Delete (CRUD) tasks
- Pagination and filtering (by status, priority, isActive)
- Swagger API documentation (`/api`)
- PostgreSQL database integration via TypeORM

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL

### Installation

1. **Clone the repository**

   ```sh
   git clone <your-repo-url>
   cd todo-app/todo-app
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables**

   Edit the `.env` file:

   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=test
   DATABASE_TYPE=postgres
   ```

4. **Run the app**

   For development (auto-reload):

   ```sh
   npm run start:dev
   ```

   For production:

   ```sh
   npm run build
   npm run start:prod
   ```

5. **Access Swagger API docs**

   Open [http://localhost:3000/api](http://localhost:3000/api) in your browser.

## API Endpoints

| Method | Endpoint         | Description                 |
|--------|------------------|-----------------------------|
| POST   | `/tasks`         | Create a new task           |
| GET    | `/tasks`         | List tasks (with filters)   |
| GET    | `/tasks/:id`     | Get a single task           |
| PATCH  | `/tasks/:id`     | Update a task               |
| DELETE | `/tasks/:id`     | Delete a task               |

### Filters for `/tasks`

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `status` (string): Filter by status (`Pending`, `Done`, `In Progress`, `Paused`)
- `priority` (string): Filter by priority (`Red`, `Yellow`, `Blue`)
- `isActive` (boolean): Filter by active status

## Entity Fields

- `id`: number
- `name`: string
- `dueDate`: Date
- `status`: `Pending` | `Done` | `In Progress` | `Paused`
- `priority`: `Red` | `Yellow` | `Blue`
- `createdAt`: Date
- `isActive`: boolean

