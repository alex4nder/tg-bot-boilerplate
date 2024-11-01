## MemStore

A simple interface for working with Redis.

### Usage

Import `MemStore`:

```typescript
import MemStore from "@repo/memstore";
```

#### Example Methods

##### Setting a value with TTL

```typescript
await MemStore.set({
  key: "testKey",
  value: { name: "John Doe" },
  ttl: 300, // Time to live in seconds
});
```

##### Setting a value without TTL

```typescript
await MemStore.set({
  key: "testKeyNoTTL",
  value: "testValue",
});
```

##### Getting a value

```typescript
const result = await MemStore.get<{ name: string }>("testKey");
console.log(result); // { name: "John Doe" }
```

##### Checking if a key exists

```typescript
const isKeyExist = await MemStore.exists("testKey");
console.log(exists); // true or false
```

##### Deleting a key

```typescript
const deleted = await MemStore.del("testKey");
console.log(deleted); // true or false
```

##### Getting all keys by pattern

```typescript
const keys = await MemStore.keys("test*");
console.log(keys); // ["testKey", "testKeyNoTTL"]
```

##### Flushing all keys

```typescript
const flushed = await MemStore.flushAll();
console.log(flushed); // true
```

### Testing

#### Running Tests

1. Make sure Redis is running.
2. Run the tests:

```bash
yarn workspace @repo/memstore test
```

#### Test Structure

Tests are located in the `__tests__` folder. Each test verifies the functionality of the `MemStore` class methods using mocks for Redis.

#### Configuration

`MemStore` automatically uses Redis settings from a configuration file that you can set up in your project. An example configuration may look like this:

```typescript
const redisOptions = {
  host: "127.0.0.1",
  port: 6379,
  // other options...
};
```
