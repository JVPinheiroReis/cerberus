# Cerberus

Simple authentication API built with **Node.js**, **TypeScript**, and **JWT**.

## Technologies

- **Framework:** Express
- **Language:** TypeScript
- **Database:** PostgreSQL (via `pg` and `docker`)
- **Security:** JSON Web Tokens (JWT) and Bcrypt (password hashing)

## Project Structure

- `src/controllers`: Request/response logic for HTTP endpoints.
- `src/services`: Business logic and database integration.
- `src/middlewares`: Route protection and logging.
- `src/routes`: Route's path and controller definition.
- `src/db`: PostgreSQL connection setup and schema.
- `src/utils`: Utilities for JWT and Cryptography.
- `src/errors`: Custom error classes for standardized responses.

## Getting Started

1. Install dependencies:
    ```bash
    pnpm install
    ```
2. Configure the database (see `compose.yaml` and `src/db/schema.sql`).
3. Start the development server:
    ```bash
    pnpm dev
    ```

## Scripts

- `pnpm dev`: Starts the server with hot-reload.
- `pnpm build`: Compiles TypeScript to JavaScript.
- `pnpm start`: Starts the server from the build directory.
