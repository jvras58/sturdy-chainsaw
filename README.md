# Fastify REST API

This project is a RESTful API built using Fastify and TypeScript. It provides authentication functionalities including user registration and login, utilizing Prisma for database interactions.

## Project Structure

```
fastify-rest-api
├── src
│   ├── app.ts                # Entry point of the application
│   ├── controllers           # Contains controllers for handling requests
│   │   └── auth.controller.ts # Authentication-related request handlers
│   ├── routes                # Defines the API routes
│   │   └── auth.routes.ts    # Routes for authentication
│   ├── services              # Contains business logic
│   │   └── auth.service.ts    # Authentication services
│   ├── plugins               # Fastify plugins
│   │   └── prisma.ts         # Prisma client initialization
│   └── types                 # Type definitions
│       └── index.ts          # Shared types across the application
├── package.json              # NPM dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd fastify-rest-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   Ensure you have a database set up and configure your Prisma settings in the `prisma.ts` file.

4. **Run the application:**
   ```bash
   npm run start
   ```

## Usage

- **Register a new user:**
  - Endpoint: `POST /auth/register`
  - Body: `{ "email": "user@example.com", "password": "yourpassword" }`

- **Login a user:**
  - Endpoint: `POST /auth/login`
  - Body: `{ "email": "user@example.com", "password": "yourpassword" }`

## License

This project is licensed under the MIT License.