import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const useGoogleAuth = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Login Success:', tokenResponse);
      // Store the access token if needed
      localStorage.setItem('googleToken', tokenResponse.access_token);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
    flow: 'implicit'
  });

  return login;
};

export default useGoogleAuth; 