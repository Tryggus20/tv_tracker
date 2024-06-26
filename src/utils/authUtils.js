import { useSelector } from 'react-redux';

export const getCurrentUserEmail = () => {
  const { auth } = useSelector((state) => state);
  return auth?.currentUser?.email;
};
