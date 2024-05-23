<script setup>
import UserCard from '@/components/UserCard.vue';
import TodoList from '@/components/TodoList.vue';
import AddTodo from '@/components/AddTodo.vue';
</script>
<template>
  <div class="flex justify-between my-10">
    <UserCard class="mr-4" />
    <AddTodo />
  </div>
  <TodoList />
</template>
