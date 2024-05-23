<script setup>
import { useUserStore } from '../storage/users';
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, alpha } from '@vuelidate/validators';

const UserStore = useUserStore();

const state = reactive({
  username: 'Antonette',
  phone: '010-692-6593',
});
const rules = {
  username: { required, alpha },
  phone: { required },
};

const v$ = useVuelidate(rules, state);

const onSubmitHandler = async () => {
  v$.value.$validate();
  if (v$.value.$invalid) {
    return;
  }
  UserStore.dispatchGetUsers(state);
};
</script>
<template>
  <div class="h-screen flex justify-center pt-40">
    <form
      @submit.prevent="onSubmitHandler"
      class="flex bg-main flex-col max-w-96 w-full h-max px-14 py-8 rounded-md"
    >
      <div class="relative pb-4">
        <label class="block" for="user-name">Username</label>
        <input
          v-model="state.username"
          id="user-name"
          type="text"
          class="w-full mt-1 p-2 rounded-md"
          @blur="v$.username.$touch"
        />

        <span
          class="absolute left-0 -bottom-[1px] text-xs text-red-800"
          v-if="v$.username.$error"
        >
          {{
            v$.username.required.$invalid
              ? 'field is required'
              : 'field uses alphabetic characters only'
          }}
        </span>
      </div>
      <div class="relative pb-4 mb-6">
        <label class="block" for="user-phone">Phone</label>
        <input
          v-model="state.phone"
          id="user-phone"
          type="text"
          class="w-full mt-1 p-2 rounded-md"
          @blur="v$.phone.$touch"
        />
        <span
          class="absolute left-0 -bottom-[1px] text-xs text-red-800"
          v-if="v$.phone.$error"
        >
          field is required
        </span>
      </div>
      <button
        type="submit"
        class="bg-black/90 p-2 rounded-md text-white font-bold hover:bg-black"
      >
        login
      </button>
    </form>
  </div>
</template>
