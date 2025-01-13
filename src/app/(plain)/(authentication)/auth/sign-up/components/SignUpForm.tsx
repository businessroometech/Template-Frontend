import TextFormInput from '@/components/form/TextFormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useSignUp from './useSignUp';
import { useState, useEffect } from 'react';
import RoleSelectionModal from '@/components/cards/RoleSelectionModal';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [firstPassword, setFirstPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [dob, setDob] = useState<string>(''); // State for DOB
  const [role, setRole] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const { signUp } = useSignUp();

  const signUpSchema = yup.object({
    firstName: yup.string().required('Please enter First Name'),
    lastName: yup.string().required('Please enter Last Name'),
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please enter your confirm password'),
    country: yup.string().required('Please select your country'),
    dob: yup
      .date()
      .max(new Date(), 'Date of birth cannot be in the future')
      .required('Please enter your date of birth'),
  });

  const { control, handleSubmit, getValues, watch } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  useEffect(() => {
    setFirstPassword(getValues().password);
    setConfirmPassword(getValues().confirmPassword);
    setEmail(getValues().email);
    setFirstName(getValues().firstName);
    setLastName(getValues().lastName);
    setCountry(getValues().country);
    setDob(getValues().dob); // Watch DOB
  }, [
    watch('email'),
    watch('password'),
    watch('firstName'),
    watch('lastName'),
    watch('confirmPassword'),
    watch('country'),
    watch('dob'),
  ]);

  if (showModal) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RoleSelectionModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onSelectRole={(roleId) => setRole(roleId)}
        />
      </div>
    );
  }

  return (
    <form
      className="mt-4"
      onSubmit={handleSubmit(async () => {
        if (role.trim() === '') {
          setShowModal(true);
          return;
        }
        await signUp({
          email,
          firstName,
          lastName,
          firstPassword,
          confirmPassword,
          role,
          country,
          dob, // Include DOB in submission
        });
      })}
    >
      <div className="mb-3">
        <TextFormInput name="firstName" control={control} containerClassName="input-group-lg" placeholder="Enter your First Name" />
      </div>
      <div className="mb-3">
        <TextFormInput name="lastName" control={control} containerClassName="input-group-lg" placeholder="Enter your Last Name" />
      </div>
      <div className="mb-3">
        <TextFormInput name="email" control={control} containerClassName="input-group-lg" placeholder="Enter your email" />
      </div>
      <div className="mb-3">
        <TextFormInput
          name="dob"
          control={control}
          containerClassName="input-group-lg"
          type="date"
          placeholder="Enter your date of birth"
        />
      </div>
      <div className="mb-3">
        <TextFormInput
          name="country"
          control={control}
          containerClassName="input-group-lg"
          as="select"
          placeholder="Select your country"
        >
          <option value="">Select your country</option>
          <option value="Afghanistan">Afghanistan</option>
          <option value="Albania">Albania</option>
          {/* Add remaining countries */}
        </TextFormInput>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
