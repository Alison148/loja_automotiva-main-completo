# Angular Node JWT Authentication Backend

This backend is built using Node.js and Express, providing a simple authentication system using JSON Web Tokens (JWT). It includes routes for user login and middleware for token verification.

## Project Structure

```
backend
├── src
│   ├── app.js               # Entry point of the application
│   ├── controllers          # Contains authentication logic
│   │   └── authController.js
│   ├── middleware           # Middleware for token verification
│   │   └── authMiddleware.js
│   ├── models               # User model for future expansion
│   │   └── user.js
│   └── routes               # Authentication routes
│       └── authRoutes.js
├── package.json             # NPM dependencies and scripts
└── README.md                # Documentation for the backend
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the backend server, run:
```
node src/app.js
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

- **POST /api/login**: Authenticates a user and returns a JWT token.

## Middleware

The `authMiddleware.js` file contains a function to verify the JWT token for protected routes.

## Future Enhancements

- Implement user registration.
- Add password hashing for user credentials.
- Expand user model for additional user information.