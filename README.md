# Technical Challenge N1 - Backend

This project is a backend service built with Node.js and TypeScript, designed to manage customer registration, authentication, and the purchase of corn. It uses Prisma as the ORM for database interactions and follows a modular architecture for scalability and maintainability.

## Features

- **Customer Registration:** Allows new customers to register with their details.
- **Authentication:** Secure login using JWT and password encryption (MD5).
- **Purchase Corn:** Authenticated customers can buy corn, and their purchases are recorded.
- **Validation:** Input data is validated using schemas to ensure data integrity.
- **Error Handling:** Business exceptions and error codes are managed for robust API responses.
- **Logging:** Utility for logging application events and errors.


## Architecture


This project follows a **modular Clean Architecture** approach with clear separation of concerns:

- **Application Layer:** Contains use cases and DTOs, orchestrating business logic and data flow between layers.
- **Domain Layer:** Holds core business logic, domain entities, repositories, and domain services.
- **Infrastructure Layer:** Implements controllers, routes, plugins, schemas, and concrete repository/service implementations for external systems (e.g., database, authentication).
- **Core Layer:** Provides shared utilities, configuration, constants, exceptions, and interfaces used across the application.


This structure, inspired by Clean Architecture principles, promotes maintainability, scalability, and testability by isolating business logic from infrastructure and framework-specific code. It enables independent evolution of the domain, application, and infrastructure layers.

## Project Structure

```
backend/
├── prisma/                  # Prisma schema and migrations
├── src/
│   ├── application/         # DTOs and use cases
│   ├── core/                # Config, constants, exceptions, interfaces, utils
│   ├── domain/              # Domain logic, constants, repositories, services
│   └── infrastructure/      # Controllers, plugins, repositories, routes, schemas, services
├── package.json
├── tsconfig.json
└── README.md
```

## Main Logic Flow

1. **Customer Registration:**
   - Endpoint receives customer data.
   - Data is validated and passed to the use case.
   - Customer is created in the database via the repository.

2. **Login:**
   - Endpoint receives login credentials.
   - Credentials are validated and encrypted.
   - If valid, a JWT token is generated and returned.

3. **Buy Corn:**
   - Authenticated endpoint checks JWT.
   - Purchase request is validated.
   - Purchase is recorded in the database.

## Technologies Used

- **Node.js**
- **TypeScript**
- **Prisma ORM**
- **JWT (JSON Web Token)**
- **MD5 Encryption**

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up the database:
   ```sh
   npx prisma migrate dev
   ```
3. Start the server:
   ```sh
   npm run start
   ```

## Scripts

- `npm run start` - Start the application
- `npm run dev` - Start in development mode
- `npx prisma migrate dev` - Run database migrations

## License

This project is for technical challenge purposes only.
