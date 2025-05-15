# Request Management System (Back-End)

This project is a **Request Management System** built using **Node.js**, **Express.js**, and **Sequelize ORM** with a PostgreSQL database. The system allows managing requests with various statuses and provides endpoints for creating, updating, and retrieving requests with filtering options.

---

## Features

### Key Functionalities:

1. **Create a Request**

   - Allows creating a new request with a title and description.
   - The request is created with the default status: `CREATED`.

2. **Take a Request into Work**

   - Updates the status of a request to `PROCESS`.

3. **Complete a Request**

   - Updates the status of a request to `COMPLETED`.
   - Allows adding a solution text when completing the request.

4. **Cancel a Request**

   - Updates the status of a request to `CANCELED`.
   - Allows adding a reason for cancellation.

5. **Get a List of Requests with Filtering Options**

   - Retrieve all requests with optional filters:
     - Filter by a specific date.
     - Filter by a date range.
     - Filter by status.
     - Search by keyword in the title or description.

6. **Cancel All Requests in Progress**
   - Cancels all requests that are currently in the `PROCESS` status.

---

## Endpoints

### 1. **Create a Request**

- **Method:** `POST`
- **Endpoint:** `/api/requests`
- **Request Body:**
  ```json
  {
    "title": "Request Title",
    "description": "Request Description"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Request Title",
    "description": "Request Description",
    "status": "CREATED",
    "createdAt": "2025-05-16T12:00:00.000Z",
    "updatedAt": "2025-05-16T12:00:00.000Z"
  }
  ```

### 2. **Take a Request into Work**

- **Method:** `PUT`
- **Endpoint:** `/api/requests/:id`
- **Request Body:**
  ```json
  {
    "status": "PROCESS"
  }
  ```

### 3. **Complete a Request**

- **Method:** `PUT`
- **Endpoint:** `/api/requests/:id`
- **Request Body:**
  ```json
  {
    "status": "COMPLETED",
    "solution": "Solution text for the request"
  }
  ```

### 4. **Cancel a Request**

- **Method:** `PUT`
- **Endpoint:** `/api/requests/:id`
- **Request Body:**
  ```json
  {
    "status": "CANCELED",
    "ignoreReason": "Reason for cancellation"
  }
  ```

### 5. **Get a List of Requests**

- **Method:** `GET`
- **Endpoint:** `/api/requests`
- **Query Parameters:**
  - `keyword`: Search by title or description.
  - `status`: Filter by status (`CREATED`, `PROCESS`, `COMPLETED`, `CANCELED`).
  - `date`: Filter by a specific date.
  - `startDate` and `endDate`: Filter by a date range.
- **Response:**
  ```json
  {
    "data": [
      {
        "id": 1,
        "title": "Request Title",
        "description": "Request Description",
        "status": "CREATED",
        "createdAt": "2025-05-16T12:00:00.000Z",
        "updatedAt": "2025-05-16T12:00:00.000Z"
      }
    ],
    "total": 1
  }
  ```

### 6. **Cancel All Requests in Progress**

- **Method:** `PUT`
- **Endpoint:** `/api/requests/cancel-in-progress`
- **Response:**
  ```json
  {
    "message": "success"
  }
  ```

---

## Database Setup

### Key Functions

1. **`createDatabaseIfNotExists()`**

   - Ensures the database exists before running the application.
   - If the database does not exist, it creates it.

   ```javascript
   async function createDatabaseIfNotExists() {
     const client = new Client({
       host: config.host,
       user: config.username,
       password: config.password,
       database: "postgres",
     });

     await client.connect();

     const dbCheckQuery = `SELECT 1 FROM pg_database WHERE datname = '${config.database}';`;
     const dbCreateQuery = `CREATE DATABASE "${config.database}";`;

     const result = await client.query(dbCheckQuery);

     if (result.rowCount === 0) {
       await client.query(dbCreateQuery);
       console.log(`Database "${config.database}" created.`);
     } else {
       console.log(`Database "${config.database}" already exists.`);
     }

     await client.end();
   }
   ```
