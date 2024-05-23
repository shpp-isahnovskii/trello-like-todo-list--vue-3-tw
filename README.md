```
# trello-like-todo-list--vue-3-tw

A demo version with minimal features, based on a fake database from [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com).

For login, data from `/users` is used, utilizing username and phone for authentication.\
The login form is pre-filled for ease of use.\
The database consists of tasks (todos) retrieved from `/todos`.\
This database can be filtered using 3 criteria: id, completed status, and text matching the title field.\
Logic for adding new Todo tasks is implemented. The added tasks are saved only until the page is refreshed.\
Saving to favorites is supported, functioning with local storage.\

## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn run dev
```