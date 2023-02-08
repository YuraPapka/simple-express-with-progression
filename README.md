## I didn't use Redis as I have no experience with it and used Postgres instead

### To run the project, you need to install all packages and run docker compose

```
yarn
```

```
docker-compose up -d
```

### To make many requests through the autocannon utility, run

```
yarn ts-node src/cli/requests.ts
```

### I checked the rest of the requests through the console in the browser

```js
fetch('http://localhost:3000/inprogress').then((data) => data.json()).then(console.log);
```

```js
fetch('http://localhost:3000/output?ticket=125').then((data) => data.json()).then(console.log);
```
