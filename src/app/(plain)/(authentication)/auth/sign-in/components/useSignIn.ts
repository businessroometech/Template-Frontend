import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as yup from 'yup'
import { useAuthContext } from '@/context/useAuthContext'
import { useNotificationContext } from '@/context/useNotificationContext'
import { LIVE_URL } from '@/utils/api'



const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { saveSession } = useAuthContext();
  // const [searchParams] = useSearchParams();
  const { showNotification } = useNotificationContext();
  // const token = searchParams.get('token');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();

  const loginFormSchema = yup.object({
    email: yup.string().email('Please Enter a Valid Email').required('Please Enter Your Email'),
    password: yup.string().required('Please Enter Your Password'),
  });

  const { control, handleSubmit,getValues,watch} = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
      setEmail(getValues().email);
      setPassword(getValues().password);
  },[watch('email'),watch('password')])

  type LoginFormFields = yup.InferType<typeof loginFormSchema>

  const redirectUser = () => {
    const redirectLink = searchParams.get('redirectTo')
    if (redirectLink) navigate(redirectLink)
    else navigate('/')
  }

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setMessage('Verification token is missing.');
      return;
    }
    

    const verifyEmail = async () => {
      try {
        const res = await fetch(`${LIVE_URL}api/v1/auth/verify-email?token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const json = await res.json();

        if (json.status === 'success') {
          setMessage('Email successfully verified! Redirecting to login...');
          showNotification({ message: "Email successfully verified!", variant: 'success' })
          setTimeout(() => navigate('/auth/login'), 3000);
        } else {
          setMessage(json.message || 'Verification failed.');
        }
      } catch (error) {
        setMessage('An error occurred during email verification.');
      }
    };

    verifyEmail();
  }, [navigate, searchParams]);

  const login = handleSubmit(async () => {
    setLoading(true);
    const body : LoginFormFields = {
      email : email,
      password : password,
    }
    console.log(body);
    try {
      const endpoint = 
      // token ? `${LIVE_URL}api/v1/auth/login?token=${token}`: 
      `${LIVE_URL}api/v1/auth/login`;
      const res = await fetch(endpoint, // if !token  dont add token=${token}
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      
      console.log(json);
      if (json?.data?.accessToken && json?.data.user.active === 0) {
        showNotification({ message: 'please verify email, Redirecting....', variant: 'info' })
        navigate('/auth/verify-email')
      }
      else if (json?.data?.accessToken && json?.data.user.active === 1) {
        saveSession(json?.data?.user);
        redirectUser()
        showNotification({ message: 'Successfully logged in. Redirecting....', variant: 'info' })
      }
      else if(json?.status === 'error') {
        showNotification({ message: json.message, variant: 'danger' })
      }
      else {
        showNotification({ message: json.message || 'Login Failed...', variant: 'success' })
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.response?.data?.error) {
        showNotification({ message: e.response?.data?.message, variant: 'danger' })
      }
    } finally {
      setLoading(false)
    }
  })

  return { loading, login, control }
}

export default useSignIn
