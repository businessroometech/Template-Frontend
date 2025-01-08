import DateFormInput from '@/components/form/DateFormInput';
import PasswordFormInput from '@/components/form/PasswordFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { BsPlusCircleDotted } from 'react-icons/bs';
import * as yup from 'yup';

const ChangePassword = () => {
  const [firstPassword, setFirstPassword] = useState<string>('');

  const resetPasswordSchema = yup.object().shape({
    currentPass: yup.string().required('Please enter current Password'),
    newPassword: yup.string().min(8, 'Password must be at least 8 characters').required('Please enter Password'),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match'),
  });

  const { control, handleSubmit, getValues, watch } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  useEffect(() => {
    setFirstPassword(getValues().newPassword);
  }, [watch('newPassword')]);

  return (
    <Card>
      <CardHeader className="border-0 pb-0">
        <CardTitle>Change your password</CardTitle>
        <p className="mb-0">See resolved goodness felicity shy civility domestic had but.</p>
      </CardHeader>
      <CardBody>
        <form className="row g-3" onSubmit={handleSubmit(() => {})}>
          <PasswordFormInput name="currentPass" label="Current password" control={control} containerClassName="col-12" />
          <Col xs={12}>
            <PasswordFormInput name="newPassword" label="New password" control={control} />
            <div className="mt-2">
              <PasswordStrengthMeter password={firstPassword} />
            </div>
          </Col>
          <PasswordFormInput name="confirmPassword" label="Confirm password" control={control} containerClassName="col-12" />
          <Col xs={12} className="text-end">
            <Button variant="primary" type="submit" className="mb-0">
              Update password
            </Button>
          </Col>
        </form>
      </CardBody>
    </Card>
  );
};

const AccountSettings = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const createFormSchema = yup.object({
    fName: yup.string().required('Please enter your first name'),
    lName: yup.string().required('Please enter your last name'),
    additionalName: yup.string().required('Please enter additional name'),
    userName: yup.string().required('Please enter your username'),
    phoneNo: yup.string().required('Please enter your phone number'),
    email: yup.string().required('Please enter your email'),
    overview: yup.string().required('Please enter your page description').max(300, 'Character limit must be less than 300'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createFormSchema),
    defaultValues: {
      fName: 'Sam',
      lName: 'Lanson',
      additionalName: '',
      userName: '@samlanson',
      email: 'sam@webestica.com',
      overview: 'Description text here...',
      phoneNo: '(678) 324-1251',
    },
  });

  return (
    <>
      <Card className="mb-4">
        <CardHeader className="border-0 pb-0">
          <h1 className="h5 card-title">Account Settings</h1>
          <p className="mb-0">Additional descriptive text here...</p>
        </CardHeader>
        <CardBody>
          <form className="row g-3" onSubmit={handleSubmit(() => {})}>
            <Col xs={12} className="text-center">
              {preview ? (
                <img src={preview} alt="Profile Preview" className="rounded-circle" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
              ) : (
                <div className="rounded-circle bg-secondary" style={{ width: '120px', height: '120px', display: 'inline-block' }}></div>
              )}
              <div className="mt-2">
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            </Col>
            <TextFormInput name="fName" label="First name" control={control} containerClassName="col-sm-6 col-lg-4" />
            <TextFormInput name="lName" label="Last name" control={control} containerClassName="col-sm-6 col-lg-4" />
            <TextFormInput name="additionalName" label="Additional name" control={control} containerClassName="col-sm-6 col-lg-4" />
            <TextFormInput name="userName" label="User name" control={control} containerClassName="col-sm-6" />
            <Col lg={6}>
              <label className="form-label">Birthday </label>
              <DateFormInput placeholder="12/12/1990" className="form-control" options={{ defaultDate: '12/12/1990' }} />
            </Col>
            <Col xs={12}>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="allowChecked" defaultChecked />
                <label className="form-check-label" htmlFor="allowChecked">
                  Allow anyone to add you to their team
                </label>
              </div>
            </Col>
            <Col sm={6}>
              <TextFormInput name="phoneNo" label="Phone number" control={control} />
              <Link className="btn btn-sm btn-dashed rounded mt-2" to="">
                <BsPlusCircleDotted className="me-1" />
                Add new phone number
              </Link>
            </Col>
            <Col sm={6}>
              <TextFormInput name="email" label="Email" control={control} />
              <Link className="btn btn-sm btn-dashed rounded mt-2" to="">
                <BsPlusCircleDotted className="me-1" />
                Add new email address
              </Link>
            </Col>
            <Col xs={12}>
              <TextAreaFormInput name="overview" label="Overview" rows={4} placeholder="Description (Required)" control={control} />
              <small>Character limit: 300</small>
            </Col>
            <Col xs={12} className="text-end">
              <Button variant="primary" type="submit" size="sm" className="mb-0">
                Save changes
              </Button>
            </Col>
          </form>
        </CardBody>
      </Card>
      <ChangePassword />
    </>
  );
};

export default AccountSettings;
