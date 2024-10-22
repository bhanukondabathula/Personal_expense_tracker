# Personal Expense Tracker API

A simple **Personal Expense Tracker** API built with **Node.js**, **Express.js**, and **SQLite**. This application allows users to manage their income and expenses by adding transactions. The application also supports **user authentication** with **JWT tokens** to ensure each user can only manage their own transactions.

## Features

- User authentication (signup/login) with JWT tokens.
- CRUD operations for transactions.
- Summary of transactions, including total income, total expenses, and balance.
- Transactions are linked to individual users.
- SQLite database for storing user and transaction data.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [SQLite](https://www.sqlite.org/download.html)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker


2. Install dependencies
    Run the following command to install all the required dependencies:

    ###bash
    npm install express sqlite3 body-parser
    npm install nodemon --save-dev


3. Database setup
      The database schema will be automatically created upon running the application for the first time. The SQLite database file is named database.db and will be created in the project directory.

4. Environment Variables
    Create a .env file in the root directory to define the following environment variables:

    makefile
    JWT_SECRET=your_jwt_secret_key_here

5. Running the application
  Start the development server using nodemon:

    ####bash
    npx nodemon app.js
    The server will start on http://localhost:3000.

6. API Endpoints
    User Authentication
    Signup: POST /api/auth/signup
    
    Request body:
    {
      "email": "user@example.com",
      "password": "password123"
    }
    Response:
    {
      "message": "User created successfully"
    }

  Login: POST /api/auth/login

    Request body:
      
      {
        "email": "user@example.com",
        "password": "password123"
      }
    Response:
    {
      "token": "jwt_token_here"
    }

Transactions

  Note: All transactions routes require the Authorization: Bearer <JWT_TOKEN> header.
  
  Get all transactions: GET /api/transactions
  
  Response:
    [
      {
        "id": 1,
        "type": "income",
        "category": "salary",
        "amount": 1000,
        "date": "2024-10-22",
        "description": "October salary",
        "user_id": 1
      }
    ]
  Get a transaction by ID: GET /api/transactions/:id
  
  Add a new transaction: POST /api/transactions
  
  Request body:

    {
    "type": "income",
    "category": "salary",
    "amount": 1000,
    "date": "2024-10-22",
    "description": "October salary"
  }
  Update a transaction by ID: PUT /api/transactions/:id
  
  Delete a transaction by ID: DELETE /api/transactions/:id
  
  Summary of Transactions
  Get transaction summary: GET /api/transactions/summary

  Response:

    {
      "income": 1000,
      "expense": 500,
      "balance": 500
    }

Project Structure
.
├── app.js                        # Main application file
├── db.js                         # SQLite database setup
├── controllers
│   └── transaction.js            # Transaction controller (CRUD operations)
├── middleware
│   └── authMiddleware.js         # JWT authentication middleware
├── routes
│   ├── auth.js                   # Authentication routes (signup/login)
│   └── transactions.js           # Transaction routes
├── package.json                  # Project metadata and dependencies
└── README.md                     # Project documentation


Tools & Technologies
  Node.js: JavaScript runtime environment
  Express.js: Web framework for Node.js
  SQLite: Lightweight SQL database
  JWT: JSON Web Tokens for authentication
  bcrypt.js: Password hashing
