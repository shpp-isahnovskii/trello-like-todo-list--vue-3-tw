import api from '../api';

const getUsers = async () => {
  return await api.get('users');
};

export default { getUsers };
