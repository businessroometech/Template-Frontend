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
  const [searchParams] = useSearchParams();
  const { showNotification } = useNotificationContext();
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

  const login = handleSubmit(async () => {

    const body : LoginFormFields = {
      email : email,
      password : password,
    }
    console.log(body);
    try {
      const res = await fetch(`${LIVE_URL}api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      console.log(json);
      if (json?.data?.accessToken) {
        saveSession(json?.data?.user);
        redirectUser()
        showNotification({ message: 'Successfully logged in. Redirecting....', variant: 'success' })
      }
      else if(json?.status === 'error') {
        showNotification({ message: json.message, variant: 'danger' })
      }
      else {
        showNotification({ message: json.message || 'Login Failed...', variant: 'danger' })
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
