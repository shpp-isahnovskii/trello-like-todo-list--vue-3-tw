import api from '../api';

const getTodo = async () => {
  return await api.get('todos');
};

export default { getTodo };
