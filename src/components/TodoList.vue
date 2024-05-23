<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { useTodoStore } from '@/storage/todo';
import StarIcon from '@/components/icons/StarIcon.vue';

const todoStore = useTodoStore();

onBeforeMount(() => {
  todoStore.dispatchGetTodo();
});

/* filter by status */
const selectedStatus = ref(undefined);
const optionsForStatus = ref([
  { text: 'All', value: undefined },
  { text: 'Completed', value: true },
  { text: 'Uncompleted', value: false },
  { text: 'Favorites', value: 'storage' },
]);
/* filter by id */
const selectedId = ref(undefined);
const optionsForId = computed(() => {
  const allUserIds = todoStore.todo.reduce((acc, item) => {
    return { ...acc, [item.userId]: { text: item.userId, value: item.userId } };
  }, {});
  return [
    { text: 'All users', value: undefined },
    ...Object.values(allUserIds),
  ];
});
/* filter by text */
const selectedInput = ref('');

const filteredTodo = computed(() => {
  let todos = todoStore.todo;

  /* filter by status */
  if (selectedStatus.value === 'storage') {
    todos = todoStore.myFavorites;
  }
  if (selectedStatus.value === true || selectedStatus.value === false) {
    todos = todos.filter(({ completed }) => {
      return completed === selectedStatus.value;
  });
  }

  /* filter by id */
  if (selectedId.value !== undefined) {
    todos = todos.filter(({ userId }) => {
      return userId === selectedId.value;
    });
  }

  /* filter by text */
  if (selectedInput.value !== '') {
    todos = todos.filter(({ title }) => {
      return title.includes(selectedInput.value);
    });
  }
  return todos;
});
const onAddToFavoritesClickHandler = (todo) => {
  todoStore.persistToFavorites(todo);
};
const isTodoInFavoritesList = (todo) => {
  return todoStore.myFavorites.findIndex(({ id }) => id === todo.id) !== -1;
};
</script>

<template>
  <div class="mb-4">
    <select v-model="selectedStatus" class="h-8 mr-2 rounded p-1 after:pr-2">
      <option
        v-for="option in optionsForStatus"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>

    <select v-model="selectedId" class="h-8 mr-2 rounded p-1 after:pr-2">
      <option
        v-for="option in optionsForId"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <input
      v-model="selectedInput"
      type="text"
      placeholder="Search in text.."
      class="h-8 pl-2 max-w-64 w-full rounded"
    />
  </div>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="todo in filteredTodo"
      :key="todo.id"
      class="relative bg-white rounded [&>*]:px-4 [&>*]:py-1 mb-4 pb-4"
    >
      <div>id: {{ todo.id }}</div>
      <div>user id: {{ todo.userId }}</div>
      <div class="flex">
        <div>status:</div>
        <div
          :class="[
            todo.completed ? 'bg-green-100' : 'bg-red-100',
            'rounded-sm px-2 ml-2',
          ]"
        >
          {{ todo.completed }}
        </div>
        <button
          @click="onAddToFavoritesClickHandler(todo)"
          class="absolute top-2 right-2"
        >
          <StarIcon :favorite="isTodoInFavoritesList(todo)" class="w-4 h-4" />
        </button>
      </div>
      <hr />
      <div>{{ todo.title }}</div>
    </div>
  </div>
</template>
