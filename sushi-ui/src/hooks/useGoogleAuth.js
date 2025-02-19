import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../services/api';
import useApiError from './useApiError';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/slices/userSlice';

const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { error, handleError, clearError } = useApiError();
  const dispatch = useAppDispatch();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google login success, calling backend...");
        const response = await loginWithGoogle(tokenResponse.access_token);
        
        if (response) {
          // Store user data in Redux
          dispatch(setUser(response));
          navigate('/dashboard');
        }
      } catch (error) {
        console.log("Handling error in useGoogleAuth:", error);
        handleError(error);
      }
    },
    onError: (error) => {
      console.log("Google OAuth error:", error);
      handleError(error);
    },
    flow: 'implicit'
  });

  return { 
    handleGoogleLogin,
    error,
    clearError
  };
};

export default useGoogleAuth; 