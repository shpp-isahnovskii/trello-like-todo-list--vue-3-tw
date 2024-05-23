import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { API } from '../../services';
import { getUserByName, isUserPhoneValid } from './utils';
import router from '@/router';

const useUserStore = defineStore('UserStore', () => {
  const user = ref(undefined);

  const initUser = (data) => {
    user.value = data;
  };

  const isUserAuth = computed(() => !!user.value);

  const userPersonalData = computed(() => user)

  const dispatchGetUsers = (userInput) => {
    return API.users
      .getUsers()
      .then(({ data }) => {
        /* check user */
        const user = getUserByName(userInput.username, data);
        if (!user) {
          return;
        }
        /* check user phone */
        if (isUserPhoneValid(userInput.phone, user.phone)) {
          initUser(user);
        }
        if (isUserAuth.value) {
          router.push({ name: 'TODO_LIST' });
        }
      })
      .catch((err) => {
        console.error('Something went wrong:', err.message);
      });
  };

  return { user, dispatchGetUsers, isUserAuth };
});

export { useUserStore };
