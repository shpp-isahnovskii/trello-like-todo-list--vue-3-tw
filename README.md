# trello-like-todo-list--vue-3-tw

A demo version with minimal features, based on a fake database from [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com).

Usage:
1. For login to the database used data from `/users` - utilizing username and phone for authentication.
2. After login you will get access to the Todolist. This database consists of tasks (todos) retrieved from `/todos`.
    It can be filtered using 3 criteria:
    - id
    - completed status
    - and text matching the title field
3. User can add new Todo tasks. The added tasks are saved only until the page is refreshed.\
4. Saving to favorites is supported, functioning with local storage. User can add or remove task from favorites.

## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn run dev
```
