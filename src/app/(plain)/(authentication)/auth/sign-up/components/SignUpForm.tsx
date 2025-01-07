import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter'
import { currentYear, developedBy, developedByLink } from '@/context/constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, FormCheck } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import useSignUp from './useSignUp'

const SignUpForm = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [firstPassword, setFirstPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const {signUp} = useSignUp();
  
  const signUpSchema = yup.object({
    firstName : yup.string().required('Please enter First Name'),
    lastName : yup.string().required('Please enter Last Name'),
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please enter your confirm password'),
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, handleSubmit, getValues,watch } = useForm({
    resolver: yupResolver(signUpSchema),
  })
  
  useEffect(() => {
    setFirstPassword(getValues().password)
    setConfirmPassword(getValues().confirmPassword)
    setEmail(getValues().email)
    setFirstName(getValues().firstName);
    setLastName(getValues().lastName);
  }, [watch('email'),watch('password'),watch('firstName'),watch('lastName'),watch('confirmPassword')])
  return (
    <form className="mt-4" onSubmit={handleSubmit(async () => {
      console.log("In Handle Submit");
      await signUp({
        email : email,
        firstName : firstName,
        lastName : lastName,
        firstPassword : firstPassword,
        confirmPassword : confirmPassword
      });
    })}>
      <div className="mb-3">
        <TextFormInput name="firstName" control={control} containerClassName="input-group-lg" placeholder="Enter your First Name" />
      </div>
      <div className="mb-3">
        <TextFormInput name="lastName" control={control} containerClassName="input-group-lg" placeholder="Enter your Last Name" />
      </div>
      <div className="mb-3">
        <TextFormInput name="email" control={control} containerClassName="input-group-lg" placeholder="Enter your email" />
      </div>
      <div className="mb-3 position-relative">
        <PasswordFormInput name="password" control={control} size="lg" placeholder="Enter new password" />
        <div className="mt-2">
          <PasswordStrengthMeter password={firstPassword} />
        </div>
      </div>
      <PasswordFormInput name="confirmPassword" control={control} size="lg" containerClassName="mb-3" placeholder="Confirm password" />
      <div className="mb-3 text-start">
        <FormCheck label="Keep me signed in" id="termAndCondition" />
      </div>
      <div className="d-grid">
        <Button variant="primary" type="submit" size="lg">
          Sign me up
        </Button>
      </div>
      <p className="mb-0 mt-3 text-center">
        ©{currentYear}
        <Link target="_blank" to={developedByLink}>
          {developedBy}.
        </Link>
        All rights reserved
      </p>
    </form>
  )
}
export default SignUpForm;
