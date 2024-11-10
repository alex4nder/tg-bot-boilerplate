## Database Package

The `db` package provides an interface for managing database connections and entities using TypeORM. It includes an example user entity and migration commands for handling database schema changes.

### Installation

To install the package, run the following command:

```bash
yarn add @repo/db
```

### Usage

#### Importing DataSource

```typescript
import { AppDataSource } from "@repo/db";

const userRepository = AppDataSource.getRepository(User);

const existingUser = await userRepository.findOne({
  where: { ... },
});
```

#### Importing Entities

You can import the `User` entity from the package:

```typescript
import { User } from '@repo/db';
```

#### Database Configuration

The database connection is configured using TypeORM.

### Migrations

This package includes several commands for managing database migrations. You can run the following commands from the root of your project:

- **Generate a new migration**: Creates a new migration file based on the changes in your entities.
  
  ```bash
  yarn workspace @repo/db migration:generate
  ```

- **Create a new migration file**: Creates an empty migration file.
  
  ```bash
  yarn workspace @repo/db migration:create
  ```

- **Run pending migrations**: Applies all pending migrations to the database.
  
  ```bash
  yarn workspace @repo/db migration:run
  ```

- **Revert the last migration**: Rolls back the last applied migration.
  
  ```bash
  yarn workspace @repo/db migration:revert
  ```

- **Revert all migrations**: Rolls back all applied migrations.
  
  ```bash
  yarn workspace @repo/db migration:revert:all
  ```

### Development env setup
```bash
CREATE USER telegram_bot_starter_user WITH PASSWORD 'telegram_bot_starter_password';

CREATE DATABASE telegrambotstarterdb;

\c telegrambotstarterdb

CREATE SCHEMA dev;
CREATE SCHEMA test;

GRANT ALL PRIVILEGES ON DATABASE telegrambotstarterdb TO telegram_bot_starter_user;

GRANT CONNECT ON DATABASE telegrambotstarterdb TO telegram_bot_starter_user;
GRANT CREATE ON DATABASE telegrambotstarterdb TO telegram_bot_starter_user;

GRANT USAGE ON SCHEMA dev TO telegram_bot_starter_user;
GRANT CREATE ON SCHEMA dev TO telegram_bot_starter_user;

GRANT USAGE ON SCHEMA test TO telegram_bot_starter_user;
GRANT CREATE ON SCHEMA test TO telegram_bot_starter_user;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA dev TO telegram_bot_starter_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA test TO telegram_bot_starter_user;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA dev TO telegram_bot_starter_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA test TO telegram_bot_starter_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA dev GRANT ALL PRIVILEGES ON TABLES TO telegram_bot_starter_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA test GRANT ALL PRIVILEGES ON TABLES TO telegram_bot_starter_user;
```