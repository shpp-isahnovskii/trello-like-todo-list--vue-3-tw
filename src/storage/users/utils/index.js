import { parsedPhone } from '@/utils';

const getUserByName = (name, base) => {
  return base.find(
    ({ username }) => name.toLowerCase() === username.toLowerCase(),
  );
};

const isUserPhoneValid = (phone, basePhone) => {
  return parsedPhone(phone) === parsedPhone(basePhone);
};

export { getUserByName, isUserPhoneValid };
