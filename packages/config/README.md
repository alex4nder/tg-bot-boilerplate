## Config Package

The `config` package provides a centralized configuration management system for application.

### Installation

To install the package, run the following command:

```bash
yarn add @repo/config
```

### Configuration Structure

The package supports multiple environments. The main configurations are defined in the `environments` directory.

#### Environments

- **Default Configuration**: Located in `src/environments/default.ts`, this file contains the fallback configuration for the application.

- **Development Configuration**: Located in `src/environments/development.ts`, this file can be used to override the default configuration for the development environment.

### Usage

To use the configuration in your application, import the `config` object:

```typescript
import { config } from '@repo/config';

const port = config.appServer.port;
const botToken = config.telegramBot.token;
```
