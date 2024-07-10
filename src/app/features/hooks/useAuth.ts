import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { getCookie } from 'cookies-next';

export const useAuth = () => {
  // const user = useSelector(selectCurrentUser);
  const token = getCookie('token');

  return useMemo(() => ({ token }), [token])
}