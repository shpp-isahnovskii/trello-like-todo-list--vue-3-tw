<script setup>
import { useUserStore } from '@/storage/users';
import { parsedPhone } from '@/utils';
const { name, email, phone } = useUserStore().user;
</script>

<template>
  <div class="bg-white rounded-md py-4 pr-8 pl-4 w-min text-nowrap">
    <div>name: {{ name }}</div>
    <div>email: {{ email }}</div>
    <div>phone: {{ parsedPhone(phone) }}</div>
  </div>
</template>
