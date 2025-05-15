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
- **Endpoint:** `/api/v1/requests`
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
- **Endpoint:** `/api/v1/requests/:id`
- **Request Body:**
  ```json
  {
    "status": "PROCESS"
  }
  ```

### 3. **Complete a Request**

- **Method:** `PUT`
- **Endpoint:** `/api/v1/requests/:id`
- **Request Body:**
  ```json
  {
    "status": "COMPLETED",
    "solution": "Solution text for the request"
  }
  ```

### 4. **Cancel a Request**

- **Method:** `PUT`
- **Endpoint:** `/api/v1/requests/:id`
- **Request Body:**
  ```json
  {
    "status": "CANCELED",
    "ignoreReason": "Reason for cancellation"
  }
  ```

### 5. **Get a List of Requests**

- **Method:** `GET`
- **Endpoint:** `/api/v1/requests`
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
- **Endpoint:** `/api/v1/requests/cancel-in-progress`
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

2. **`runMigrations()`**

   - Runs all pending migrations to ensure the database schema is up-to-date.

   ```javascript
   const { sequelize } = require("../models");

   async function runMigrations() {
     await sequelize.sync({ alter: true });
     console.log("Migrations have been run successfully.");
   }
   ```

---

## Tech Stack

- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for handling routes and middleware.
- **Sequelize**: ORM for interacting with the PostgreSQL database.
- **PostgreSQL**: Relational database for storing requests.
- **JavaScript**: Programming language used for the back-end.

---

## Installation and Setup

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd testRequest
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following:

   ```
   PORT=3000
   DB_HOST=localhost
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=request_management
   ```

4. **Run the Application:**

   ```bash
   npm start
   ```

5. **Run Migrations:**
   Uncomment the `runMigrations()` line in `server.js` to apply migrations automatically.

---

## How to Use

1. Start the server using `npm start`.
2. Use tools like **Postman** or **cURL** to interact with the API.
3. Use the provided endpoints to create, update, and retrieve requests.

---

## Notes

- All requests are anonymous; no user authentication is implemented.
- The system supports filtering requests by date and status for better management.
- The database schema is managed using Sequelize migrations.

Feel free to extend the project as needed!
