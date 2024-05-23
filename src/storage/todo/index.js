import { defineStore } from 'pinia';
import { ref } from 'vue';
import { API } from '../../services';

const useTodoStore = defineStore('todoStore', () => {
  const todo = ref([]);
  const myFavorites = ref(JSON.parse(localStorage.getItem('favorites')) || []); //read fav or []

  const initTodo = (data) => {
    todo.value = data;
  };

  const addNewTodo = (newTodo) => {
    todo.value.push(newTodo);
  };

  const dispatchGetTodo = () => {
    API.todo
      .getTodo()
      .then(({ data }) => {
        initTodo(data);
      })
      .catch((err) => {
        console.error('Something went wrong:', err.message);
      });
  };

  const persistToFavorites = (todo) => {
    const favIndex = myFavorites.value.findIndex(({ id }) => id === todo.id);
    if (favIndex !== -1) {
      /* remove from fav */
      myFavorites.value.splice(favIndex, 1);
    } else {
      /* add to fav */
      myFavorites.value.push(todo);
    }
    /* write fav */
    localStorage.setItem('favorites', JSON.stringify(myFavorites.value));
  };

  return { todo, dispatchGetTodo, addNewTodo, persistToFavorites, myFavorites };
});

export { useTodoStore };
