import { NOT_A_NUMBER } from '@/consts/regex';
const parsedPhone = (phone) => phone.split('x')[0].replace(NOT_A_NUMBER, '');

export { parsedPhone };
