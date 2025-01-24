# Vue.js Authentication Frontend

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Key Features](#key-features)

## About

### Hosted App: https://auth-vue-project.vercel.app

This is a Vue.js 3 frontend application that connects to a Laravel 11 backend for user authentication and authorization. It features a structured form system, error handling, and password reset functionality via email.



## Key Features

### Hosting & Deployment

- The frontend is fully hosted and connected to the backend API.
- Secure API communication.

### Authentication & Authorization

- User registration, login, logout, and password reset.
- Access control for different permissions.

### Error and Validation Handling

- Proper error messages for authentication failures and validation issues.
- Form validation using yup for client-side validation.
- Protective routes and components that handle loading and error states, ensuring a smooth user experience during data fetching and form submissions.

### Dynamic Form

- Abstracted and reusable form components.
- Country and Language Selection: The registration form dynamically updates the available languages based on the selected country.

## Getting Started

## Follow these steps to set up and run the project locally:

### Prerequisites

- This https://github.com/nick-r-o-s-e/Auth_Laravel-API Laravel API should be running.

- Install Node.js (latest stable version recommended).

#### Clone the repository:

```
git clone https://github.com/nick-r-o-s-e/Auth_Vue-js
```

#### Install npm modules:

```
npm install
```

#### Start the development server:

```
npm run dev
```

#### Access the Application

1.  The frontend application will run on a local development server, usually available at http://localhost:5173.
2.  The frontend will communicate with the backend API running at http://127.0.0.1:8000.
