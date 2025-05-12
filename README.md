# SHG Management System

A comprehensive management system for Women Self Help Groups (SHGs) in India.

## Features

- **User Management**

  - Role-based access control (Leader, Secretary, Member)
  - User registration and authentication
  - Profile management

- **Group Management**

  - Group creation and configuration
  - Member management
  - Rules and notices

- **Financial Management**

  - Savings tracking
  - Loan management (request, approval, payment)
  - Income and expense tracking

- **Reporting**
  - Monthly summaries
  - Balance sheets
  - Transaction history

## Tech Stack

### Frontend

- React with TypeScript
- React Router for navigation
- Axios for API requests
- Shadcn UI components
- TailwindCSS for styling

### Backend

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Role-based access control

## Project Structure

```
├── backend/                 # Backend code
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # API controllers
│   │   ├── middlewares/     # Middleware functions
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── index.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
│
└── src/                     # Frontend code
    ├── components/          # React components
    ├── context/             # Context providers
    ├── hooks/               # Custom hooks
    ├── pages/               # Page components
    ├── services/            # API services
    ├── utils/               # Utility functions
    ├── App.tsx              # Main app component
    └── main.tsx             # Entry point
```

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and fill in the required values.

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Install dependencies from the root directory:

   ```
   npm install
   ```

2. Install additional dependencies:

   ```
   npm install axios @types/axios
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## User Roles and Permissions

### Leader

- Create and manage the group
- Add/remove members
- Approve/reject loan requests
- Manage all financial transactions
- View all reports

### Secretary

- Add members
- Record savings and loan payments
- Cannot remove members or approve loans

### Member

- View their own data
- Request loans
- View group summaries

## API Endpoints

### Authentication

- `POST /api/auth/register-leader` - Register leader and create group
- `POST /api/auth/register-member` - Register a new member
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Group Management

- `GET /api/groups` - Get group details
- `PUT /api/groups` - Update group details
- `GET /api/groups/members` - Get all group members
- `GET /api/groups/rules-notices` - Get rules and notices
- `PUT /api/groups/rules-notices` - Update rules and notices

### Savings Management

- `POST /api/savings` - Add savings entry
- `GET /api/savings/me` - Get my savings
- `GET /api/savings/user/:userId` - Get savings for a specific user
- `GET /api/savings/month/:month/:year` - Get monthly savings
- `PUT /api/savings/:id` - Update savings entry
- `DELETE /api/savings/:id` - Delete savings entry

### Loan Management

- `POST /api/loans/request` - Request a loan
- `PUT /api/loans/:id/status` - Update loan status
- `GET /api/loans/me` - Get my loans
- `POST /api/loans/:id/payment` - Record loan payment

### Transaction Management

- `POST /api/transactions` - Add transaction
- `GET /api/transactions` - Get transactions
- `GET /api/transactions/monthly/:month/:year` - Get monthly transactions
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

## License

MIT License
