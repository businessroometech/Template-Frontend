import { useState } from 'react';
import { useAuthContext } from '@/context/useAuthContext';
import { useNotificationContext } from '@/context/useNotificationContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface SignUpFormData { 
  email : string;
  firstName : string;
  lastName : string;
  firstPassword : string;
  confirmPassword : string | undefined;
}

interface toSendSignUp {
  emailAddress : string;
  firstName : string;
  lastName : string;
  password : string;
}

const useSignUp = () => {
  const { saveSession } = useAuthContext();
  const { showNotification } = useNotificationContext();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirectUser = () => {
    const redirectLink = searchParams.get('redirectTo');
    if (redirectLink) navigate(redirectLink);
    else navigate('/');
  };

  const signUp = async (formData : SignUpFormData) => {
    setLoading(true);

    const data : toSendSignUp = {
      firstName : formData.firstName,
      lastName : formData.lastName,
      emailAddress : formData.email,
      password : formData.firstPassword
    }
    console.log('---data---',data)
    try {
      const res = await fetch("https://app-backend-8r74.onrender.com/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(data),
      });
      const json = await res.json();
      console.log(json);
      if(json?.data?.user) {
        saveSession(json?.data.user);
        showNotification({ message: 'Signup successful!', variant: 'success' });
        redirectUser();
      }
      else {
        showNotification({
          message: 'Signup failed. Please try again.',
          variant: 'danger',
        });
      } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Signup error:', error.response || error.message);
      showNotification({
        message: error.response?.data?.message || 'Signup failed. Please try again.',
        variant: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading, redirectUser };
};

export default useSignUp;
