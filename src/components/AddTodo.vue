<script setup>
import { reactive } from 'vue';
import { useTodoStore } from '@/storage/todo';

const todoStore = useTodoStore();

const state = reactive({
  userId: undefined,
  id: 0,
  title: '',
  completed: false,
});

const onSubmitHandler = () => {
  const arrayOfKeys = Object.keys(todoStore.todo);
  state.id = parseInt(arrayOfKeys[arrayOfKeys.length - 1]) + 1;
  todoStore.addNewTodo({...state});
};
</script>

<template>
  <div class="flex bg-white rounded-md py-4 pr-4 pl-8 w-min">
    <form
      id="create-todo"
      class="flex flex-col justify-between items-end"
      @submit.prevent="onSubmitHandler"
    >
      <div class="flex text-nowrap">
        <label for="create-todo-id">User id: </label>
        <input
          id="create-todo-id"
          v-model="state.userId"
          type="number"
          class="h-7 px-2 bg-coffee rounded ml-1"
        />
      </div>
      <div class="flex text-nowrap">
        <label for="create-todo-title">Title: </label>
        <input
          id="create-todo-title"
          v-model="state.title"
          type="text"
          class="h-7 px-2 bg-coffee rounded ml-1"
        />
      </div>
    </form>
    <button
      type="submit"
      form="create-todo"
      class="ml-4 bg-coffee opacity-80 rounded-md px-4 hover:opacity-100 disabled:cursor-not-allowed"
      :disabled="!(state.userId && state.title)"
    >
      Create todo
    </button>
  </div>
</template>
