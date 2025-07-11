# 📚 Library Management API

A RESTful API for managing books and borrowing records, built with Express, TypeScript, MongoDB, Mongoose, and Zod.

---

## ⚙️ Technology Stack

- **Express.js** – Web framework  
- **TypeScript** – Typed JavaScript  
- **MongoDB (Mongoose)** – NoSQL database with ODM  
- **Zod** – Schema validation  
- **CORS** – Cross-Origin Resource Sharing middleware  
- **Dotenv** – Environment variable management  

---

## 🚀 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/simantabarua/library-management-api-node.git
cd library-management-api
npm install
```

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/library-api
```

Start the development server:

```bash
npm run dev
```

---

## 📘 API Endpoints

### Books

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| POST   | `/api/books`       | Create a new book          |
| GET    | `/api/books`       | Retrieve all books (supports filtering, sorting, and pagination) |
| GET    | `/api/books/:bookId` | Retrieve a book by its ID |
| PUT    | `/api/books/:bookId` | Update an existing book   |
| DELETE | `/api/books/:bookId` | Delete a book             |

### Borrowing

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| POST   | `/api/borrow`      | Borrow a book               |
| GET    | `/api/borrow`      | Retrieve borrow summary with aggregation |

---

## ❗ Error Response Format

Errors follow this standardized JSON structure for consistency and ease of handling:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

---
