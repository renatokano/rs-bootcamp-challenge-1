<h1 align="center">
  [RocketSeat] Bootcamp Challenge 1<br/>NodeJS Fundamentals
</h1>

## About the challenge

Create an application that stores your projects and tasks using the [Express](https://expressjs.com/pt-br/) framework.

### Routes

- `POST /projects`: This route should receive `id` and `title` inside the body and record a new project into the projects array following this pattern: `{ id: "1", title: 'New project', tasks: [] }`;

- `GET /projects`: This route should list all projects and its tasks;

- `PUT /projects/:id`: This route should update the project `title` based on its `id`;

- `DELETE /projects/:id`: This route should delete the project based on its `id`;

- `POST /projects/:id/tasks`: This route should receive a `title` and store a new task into `tasks` array;

### Example

If you call the `POST /projects` route passing `{ id: 1, title: 'New project' }` and then the route `POST /projects/1/tasks` with `{ title: 'New task' }`, the result should be an array of projects like this:

```js
[
  {
    id: "1",
    title: "New project",
    tasks: ["New task"]
  }
];
```

### Middlewares

- Create a middleware that will be used in all routes that receive the project `id` into the URL parameters (aka `route params`) that verifies if the project exists. If it does not exist, an error must be returned; otherwise, the flow must continue (next);

- Create a global middleware that will be called on all requests and print a counter that contains the total requests so far;

### Challenges

- [Rocket Seat](https://github.com/Rocketseat/bootcamp-gostack-desafio-01/blob/master/README.md)
