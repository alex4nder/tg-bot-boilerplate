## Queue Package

The `queue` package provides a simple implementation of a job queue using BullMQ for processing jobs in a scalable manner.

### Installation

To install the package, run the following command:

```bash
yarn add @repo/queue
```

### Usage

#### Importing

You can import the `apiQueue` and `apiWorker` from the package:

```typescript
import { apiQueue } from '@repo/queue';
import { apiWorker } from '@repo/queue';
```

#### Creating Jobs

You can add jobs to the queue using the `apiQueue` instance. Here's an example of how to add a job:

```typescript
await apiQueue.add('callEndpoint', {
  endpoint: '/api/endpoint',
  method: 'post',
  payload: {
    key: 'value',
  },
});
```

#### Job Processing

The `apiWorker` will automatically process jobs added to the `apiQueue`. The worker listens for new jobs and executes the specified HTTP requests using the `AxiosWrapper`.

#### Logging

The worker logs the status of jobs. It logs a message when a job is completed successfully or if it fails.

```typescript
apiWorker.on("completed", (job) => {
  logger.info(`Job ${job.id} completed successfully`);
});

apiWorker.on("failed", (job) => {
  logger.error(`Job ${job?.id} failed with error`);
});
```

### Configuration

The package uses configurations from `@repo/config`. Ensure that you have the necessary configurations set for BullMQ and your application server.
