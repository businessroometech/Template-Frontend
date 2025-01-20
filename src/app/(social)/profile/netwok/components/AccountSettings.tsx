import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import DateFormInput from '@/components/form/DateFormInput';
import { Link, useNavigate } from 'react-router-dom';

import avatar7 from '@/assets/images/avatar/07.jpg';
import bgBannerImg from '@/assets/images/bg/01.jpg';
import { useAuthContext } from '@/context/useAuthContext';
import { uploadDoc } from '@/utils/CustomS3ImageUpload';
import DropzoneFormInput from '@/components/form/DropzoneFormInput';
import { BsImages } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { UserType } from '@/types/data';
import DropdownFormInput from '@/components/form/DropdownForm';

const AccountSettings = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state for submission

  const schema = yup.object({
    fName: yup.string(),
    lName: yup.string(),
    occupation: yup.string(),
    dob: yup.date(),
    email: yup.string(),
    gender: yup.string(),
  });

  const navigate = useNavigate();
  const { user, saveSession } = useAuthContext();
  console.log('---account settings---', user);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fName: user?.firstName,
      lName: user?.lastName,
      email: user?.emailAddress,
      occupation: user?.userRole,
      gender: user?.gender,
    },
  });

  const [uploadedFilesProfile, setUploadedFilesProfile] = useState<FileType[]>([]);
  const [uploadedFilesProfileBg, setUploadedFilesProfileBg] = useState<FileType[]>([]);

  const handleFileUploadProfile = (files: FileType[]) => {
    setUploadedFilesProfile(files);
  };
  const handleCoverPhotoChange = (files: FileType[]) => {
    setUploadedFilesProfileBg(files);
  };

  const handleUploadprofile = async () => {
    try {
      const response = await uploadDoc(uploadedFilesProfile, user?.id);
      console.log('---- response in the upload doc function ----', response);
      return response;
    } catch (err) {
      console.error('Error in the createpostcard:', err);
      return false;
    }
  };
  const handleUploadprofileBg = async () => {
    try {
      const response = await uploadDoc(uploadedFilesProfileBg, user?.id);
      console.log('---- response in the upload doc function ----', response);
      return response;
    } catch (err) {
      console.error('Error in the createpostcard:', err);
      return false;
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true); // Start loading
    console.log('----data----', data);
    try {
      const profilePhoto = await handleUploadprofile();
      const coverPhoto = await handleUploadprofileBg();
      if (profilePhoto && coverPhoto) {
        const requestBody: UserType = {
          occupation: data.occupation,
          userId: user?.id,
          profilePictureUploadId: profilePhoto,
          bgPictureUploadId: coverPhoto,
          firstName: data.fName,
          lastName: data.lName,
          dob: data.dob,
          emailAddress: data.email,
          gender: data.gender,
          bodyMeasurement: '38-32-40',
          aadharNumberUploadId: '111e2227-c34d-78d3-e456-426614174333',
          panNumberUploadId: '222e3337-d45e-89d3-f456-426614174444',
        };

        console.log('Request body:', requestBody);

        const response = await fetch(
<<<<<<< HEAD
          'http://3.101.12.130:5000/api/v1/auth/update-or-create-Profile',
=======
          ' http://3.101.12.130:5000/api/v1/auth/update-or-create-Profile',
>>>>>>> 7d9ec97401d26272f87bfe23684872e8d5978c8a
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result);

        for (const key in result) {
          if (user[key]) {
            user[key] = result[key];
          }
        }

        saveSession(user);
        navigate('/');
      } else {
        toast.error('Uploading photo required');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
<<<<<<< HEAD
          'http://3.101.12.130:5000/api/v1/auth/get-user-Profile',
=======
          ' http://3.101.12.130:5000/api/v1/auth/get-user-Profile',
>>>>>>> 7d9ec97401d26272f87bfe23684872e8d5978c8a
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user?.id }),
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfile(data.data);
        console.log('---profile in account settings---', profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUser();
  }, [user?.id]);

  return (
    <Card>
      <CardHeader>
        <h5 className="card-title">Basic Profile</h5>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
          <div
            className="h-50px"
            style={{
              backgroundImage: `url(${bgBannerImg})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="text-center mt-3">
            <div className="avatar avatar-lg mt-n5 mb-3">
              <img
                height={64}
                width={64}
                src={avatar7}
                alt="avatar"
                className="avatar-img rounded border border-white border-3"
              />
            </div>
          </div>
          <TextFormInput
            name="fName"
            label="First Name"
            control={control}
            containerClassName="col-6"
          />
          <TextFormInput
            name="lName"
            label="Last Name"
            control={control}
            containerClassName="col-6"
          />
          <TextFormInput
            name="occupation"
            label="Role"
            control={control}
            containerClassName="col-12"
          />
          <DropdownFormInput
            name="gender"
            label="Gender"
            control={control}
            containerClassName="col-12"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'prefer_not_to_say', label: 'Prefer not to say' },
            ]}
          />
          <Col xs={12}>
            <label className="form-label">Date of Birth</label>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <DateFormInput
                  {...field}
                  placeholder="YYYY-MM-DD"
                  className="form-control"
                />
              )}
            />
          </Col>
          <TextFormInput
            name="email"
            label="Email"
            control={control}
            containerClassName="col-12"
          />
          <DropzoneFormInput
            icon={BsImages}
            onFileUpload={handleCoverPhotoChange}
            showPreview={true}
            text="Drag here or click to upload Cover photo"
          />
          <DropzoneFormInput
            icon={BsImages}
            onFileUpload={handleFileUploadProfile}
            showPreview={true}
            text="Drag here or click to upload profile photo."
          />
          <Col xs={12} className="mt-3">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Posting...' : 'Update Profile'}
            </Button>
          </Col>
        </form>
      </CardBody>
    </Card>
  );
};

export default AccountSettings;
