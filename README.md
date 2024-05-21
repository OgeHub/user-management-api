# User Management API

This project is a simple User Management API built with Node.js, Express, and Mongoose. The API provides endpoints for creating, reading, updating, and deleting users. It includes comprehensive unit tests written with Jest.

## Project Setup

1. **Clone the repository**:

```sh
   git clone https://github.com/OgeHub/user-management-api.git
   cd user-management-api
```

2. **Install dependencies**:

```sh
    npm install
```

3. **Environment variables**:
   Create a .env file in the root of your project and add the following variables:

```sh
    MONGO_URI=
    PORT=
```

## Running the Application

1. Start the MongoDB server
   Make sure you have a MongoDB server running on your local machine if you are running locally and provide the appropriate MongoDB URI in the .env file.

2. Start Application in Development mode

```sh
npm run dev
```

3. Build and Run Application

```sh
npm run build
npm start
```

## Running test

```sh
npm test
```

## Endpoints

`Base_URL` = `http://localhost:3030`

**Create User**:

```http
POST /users
Host: Base_URL
Content-type: application/json
```

- Request body:

```json
{
  "name": "Tech Sisi",
  "email": "test@code.io",
  "age": 25
}
```

- Response:

```json
{
  "status": "success",
  "statusCode": 201,
  "message": "User created successfully"
}
```

**Get User Details**:

```http
GET /users/:id
Host: Base_URL
Content-Type: application/json
```

- Response:

```json
{
  "status": "success",
  "statusCode": 200,
  "message": "User details retrieved successfully",
  "data": {
    "_id": "664af44fab74a9a3797fbdc1",
    "name": "Tech Sisi",
    "email": "test@code.io",
    "age": 25,
    "createdAt": "2024-05-20T06:57:19.672Z",
    "updatedAt": "2024-05-20T06:57:19.672Z"
  }
}
```

**Update User**:

```http
PATCH /users/:id
Host: Base_URL
Content-Type: application/json
```

- Request body:

```json
{
  "name": "New Techy",
  "email": "testing@code.io",
  "age": 24
}
```

- Response:

```json
{
  "status": "success",
  "statusCode": 200,
  "message": "User updated successfully",
  "data": {
    "_id": "664af44fab74a9a3797fbdc1",
    "name": "New Techy",
    "email": "testing@code.io",
    "age": 24,
    "createdAt": "2024-05-20T06:57:19.672Z",
    "updatedAt": "2024-05-20T07:04:49.445Z"
  }
}
```

**Delete User**:

```http
DELETE /users/:id
Host: Base_URL
Content-Type: application/json
```

- Response:

```json
{
  "status": "success",
  "statusCode": 200,
  "message": "User deleted successfully"
}
```
