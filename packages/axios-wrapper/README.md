## Axios Wrapper

`axios-wrapper` is a wrapper around the Axios library that adds convenient logging and error handling methods, improving the interaction with APIs.

### Usage

#### Import

Import the `AxiosWrapper` class in your file:

```typescript
import AxiosWrapper from '@repo/axios-wrapper';
```

#### Creating an Instance

Create an instance of `AxiosWrapper`, passing in the Axios configuration:

```typescript
const axiosInstance = new AxiosWrapper({
  baseURL: 'https://api.example.com',
  timeout: 1000,
});
```

#### Making Requests

Use the `request` method to make requests. It supports all HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).

Example of a `GET` request:

```typescript
axiosInstance.request({
  method: 'get',
  url: '/endpoint',
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error('Error:', error);
});
```

Example of a `POST` request:

```typescript
axiosInstance.request({
  method: 'post',
  url: '/endpoint',
  data: {
    key: 'value',
  },
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error('Error:', error);
});
```

### Logging

`axios-wrapper` uses a logging module available at `@repo/logger`.
