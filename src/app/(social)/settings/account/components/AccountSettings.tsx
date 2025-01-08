import DateFormInput from '@/components/form/DateFormInput'
import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextAreaFormInput from '@/components/form/TextAreaFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BsPlusCircleDotted } from 'react-icons/bs'
import axios from 'axios'
import * as yup from 'yup'

const AccountSettings = () => {
  const createFormSchema = yup.object({
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup.string().required('Please enter your last name'),
    userName: yup.string().required('Please enter your username'),
    mobileNumber: yup.string().required('Please enter your phone number'),
    emailAddress: yup.string().email('Please enter a valid email').required('Please enter your email'),
    bio: yup.string().max(300, 'Character limit must be less than 300'),
    dob: yup.date().required('Please enter your date of birth'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createFormSchema),
    defaultValues: {
      firstName: 'Sam',
      lastName: 'Lanson',
      userName: '@samlanson',
      emailAddress: 'sam@webestica.com',
      bio: 'Interested has all Devonshire difficulty gay assistance joy.',
      mobileNumber: '(678) 324-1251',
      dob: '1990-12-12',
    },
  })

  const onSubmit = async (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      mobileNumber: data.mobileNumber,
      emailAddress: data.emailAddress,
      bio: data.bio,
      // Assuming userId and other fields are obtained from context or state
      userId: "018faa07809d523c34ac1186d761459d"
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/update-or-create-Profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result)
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }
  

  return (
    <>
      <Card className="mb-4">
        <CardHeader className="border-0 pb-0">
          <h1 className="h5 card-title">Account Settings</h1>
          <p className="mb-0">
            He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.
          </p>
        </CardHeader>
        <CardBody>
          <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <TextFormInput name="firstName" label="First name" control={control} containerClassName="col-sm-6 col-lg-4" />
            <TextFormInput name="lastName" label="Last name" control={control} containerClassName="col-sm-6 col-lg-4" />
            <TextFormInput name="userName" label="User name" control={control} containerClassName="col-sm-6" />
            <Col lg={6}>
              <label className="form-label">Birthday </label>
              <DateFormInput name="dob" placeholder="12/12/1990" className="form-control" />
            </Col>
            <Col sm={6}>
              <TextFormInput name="mobileNumber" label="Phone number" control={control} />
              <Link className="btn btn-sm btn-dashed rounded mt-2" to="">
                <BsPlusCircleDotted className="me-1" />
                Add new phone number
              </Link>
            </Col>
            <Col sm={6}>
              <TextFormInput name="emailAddress" label="Email" control={control} />
              <Link className="btn btn-sm btn-dashed rounded mt-2" to="">
                <BsPlusCircleDotted className="me-1" />
                Add new email address
              </Link>
            </Col>
            <Col xs={12}>
              <TextAreaFormInput name="bio" label="Bio" rows={4} placeholder="Description (Required)" control={control} />
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
    </>
  )
}

export default AccountSettings
