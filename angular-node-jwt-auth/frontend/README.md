# Angular Node JWT Authentication Project

This project is a full-stack application that implements JWT authentication using Angular for the frontend and Node.js for the backend. 

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

## Authentication Flow

- Users can log in through the Angular frontend.
- The backend verifies credentials and returns a JWT token.
- The token is stored in `localStorage` for session management.
- Protected routes in the Angular application are secured using an `AuthGuard`.

## Notes

- Ensure that the backend server is running before starting the frontend application.
- Modify the backend and frontend configurations as needed for your environment.