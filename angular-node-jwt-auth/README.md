# Angular Node JWT Authentication Project

This project is a full-stack application that implements JWT authentication using Angular for the frontend and Node.js for the backend. The application allows users to log in, stores the JWT token in localStorage, and protects certain routes using an AuthGuard.

## Project Structure

```
angular-node-jwt-auth
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── controllers
│   │   │   └── authController.js
│   │   ├── middleware
│   │   │   └── authMiddleware.js
│   │   ├── models
│   │   │   └── user.js
│   │   └── routes
│   │       └── authRoutes.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── app
│   │   │   ├── app.component.ts
│   │   │   ├── app.module.ts
│   │   │   ├── auth
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── login
│   │   │   │       ├── login.component.ts
│   │   │   │       └── login.component.html
│   │   │   └── protected
│   │   │       ├── protected.component.ts
│   │   │       └── protected.component.html
│   │   └── assets
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── README.md
```

## Backend Setup

1. Navigate to the `backend` directory.
2. Install dependencies using `npm install`.
3. Start the server with `node src/app.js`.

## Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies using `npm install`.
3. Start the Angular application with `ng serve`.

## Features

- User authentication with JWT.
- Protected routes using Angular's AuthGuard.
- Session management using localStorage.

## Usage

- Access the application in your browser at `http://localhost:4200`.
- Use the login form to authenticate users.
- Protected routes will redirect unauthenticated users to the login page.

## Future Enhancements

- Implement user registration.
- Add password recovery functionality.
- Improve error handling and user feedback.