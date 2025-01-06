import { yupResolver } from '@hookform/resolvers/yup';
import type { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAuthContext } from '@/context/useAuthContext';
import { useNotificationContext } from '@/context/useNotificationContext';
import httpClient from '@/helpers/httpClient';
import { useNavigate, useSearchParams } from 'react-router-dom';

const useSignUp = () => {
  const { saveSession } = useAuthContext();
  const { showNotification } = useNotificationContext();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirectUser = () => {
    console.log('In redirecting')
    const redirectLink = searchParams.get('redirectTo')
    if (redirectLink) navigate(redirectLink)
    else navigate('/404')
  }

  const signUpSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
  });

  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const password = watch('password'); // Watch the password field dynamically

  const signUp = handleSubmit(async (formData) => {
    console.log('In handleSumbit')
    redirectUser();
    return;
    setLoading(true);
    try {
    //   const res: AxiosResponse = await httpClient.post('https://app-backend-8r74.onrender.com/api/v1/auth/signup', formData);

      if (true) {
        saveSession(res.data);
        showNotification({ message: 'Signup successful!', variant: 'success' });
      } else {
        showNotification({ message: 'Signup failed. Please try again.', variant: 'danger' });
      }
    } catch (error) {
      showNotification({ message: 'An error occurred. Please try again.', variant: 'danger' });
    } finally {
      setLoading(false);
    }
  });

  return { signUp, control, loading, password ,redirectUser};
};

export default useSignUp;
