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
import { Link } from 'react-router-dom';

import avatar7 from '@/assets/images/avatar/07.jpg';
import bgBannerImg from '@/assets/images/bg/01.jpg';
import { useAuthContext } from '@/context/useAuthContext';
import { uploadDoc } from '@/utils/CustomS3ImageUpload';
import DropzoneFormInput from '@/components/form/DropzoneFormInput';
import { BsImages } from 'react-icons/bs';
import { toast } from 'react-toastify';

const AccountSettings = () => {
  
  const [profile, setProfile] = useState({});
  const schema = yup.object({
    fName: yup.string().required('Please enter your first name').default("Sachin"), 
    lName: yup.string().required('Please enter your last name'), 
    occupation: yup.string().required('Please enter your occupation'), 
    dob: yup.date().required('Please enter your date of birth'), 
    phoneNo: yup.string().required('Please enter your phone number'), 
    email: yup.string().required('Please enter your email'), 
    bio: yup.string().max(300, 'Character limit must be less than 300'), 
    gender: yup.string().required('Please select your gender'), 
    preferredLanguage: yup.string().required('Please select your preferred language'), 
    socialMediaProfile: yup.string().url('Invalid URL format'), 
    permanentAddress: yup.object({
        addressLine1: yup.string().required('Please enter Address Line 1'), 
        city: yup.string().required('Please enter your city'), 
        state: yup.string().required('Please enter your state'), 
        pincode: yup.string().required('Please enter your pincode'),
    }),
});



  const { user } = useAuthContext();

  

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });


  const [uploadedFilesProfile, setUploadedFilesProfile] = useState<FileType[]>([])
  const [uploadedFilesProfileBg, setUploadedFilesProfileBg] = useState<FileType[]>([])


  // This function will be triggered when files are uploaded
  const handleFileUploadProfile = (files: FileType[]) => {
    setUploadedFilesProfile(files)
  }
  const handleCoverPhotoChange = (files: FileType[]) => {
    setUploadedFilesProfileBg(files)
  }

  const handleUploadprofile = async () => {
    try {
      const response = await uploadDoc(uploadedFilesProfile, user?.id) // Await the uploadDoc promise
      console.log('---- response in the upload doc function ----', response);
      return response
    } catch (err) {
      console.error('Error in the createpostcard:', err)
      return false // Indicate failure
    }
  }
  const handleUploadprofileBg = async () => {
    try {
      const response = await uploadDoc(uploadedFilesProfileBg, user?.id) 
      console.log('---- response in the upload doc function ----', response);
      return response
    } catch (err) {
      console.error('Error in the createpostcard:', err)
      return false 
    }
  }
  const onSubmit = async (data) => {
    try {
      const profilePhoto = await handleUploadprofile()
      const coverPhoto = await handleUploadprofileBg()
      if (profilePhoto && coverPhoto) {
        const requestBody = {
          occupation: data.occupation,
          userId: user?.id,
          profilePictureUploadId: profilePhoto, // Use the profile photo ID after upload
          bgPictureUploadId: coverPhoto, // Use the cover photo ID after upload
          firstName: data.fName,
          lastName: data.lName,
          dob: data.dob,
          mobileNumber: data.phoneNo,
          emailAddress: data.email,
          bio: data.bio,
          gender: data.gender,
          preferredLanguage: data.preferredLanguage,
          socialMediaProfile: data.socialMediaProfile,
          bodyMeasurement: "38-32-40",
          permanentAddress: {
            addressLine1: data.permanentAddress.addressLine1,
            addressLine2: "Apt 4B",
            city: data.permanentAddress.city,
            state: data.permanentAddress.state,
            pincode: data.permanentAddress.pincode,
          },
          currentAddress: {
            addressLine1: data?.currentAddress?.addressLine1,
            addressLine2: "Apt 4B",
            city: data.currentAddress.city,
            state: data.currentAddress.state,
            pincode: data.currentAddress.pincode,
          },
          aadharNumberUploadId: "111e2227-c34d-78d3-e456-426614174333",
          panNumberUploadId: "222e3337-d45e-89d3-f456-426614174444"
        };

        console.log("Request body:", requestBody);
     
      const response = await fetch('https://app-backend-8r74.onrender.com/api/v1/auth/update-or-create-Profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result); // Handle response accordingly

    }
    else{
      toast.error(' uploading photo required');
    }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://app-backend-8r74.onrender.com/api/v1/auth/get-user-Profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user?.id }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfile(data.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUser();
  }, [user?.id]);

  return (
    <Card>
      <CardHeader>
        <h5 className="card-title">Account Settings</h5>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
          <div
            className="h-50px"
            style={{
              backgroundImage: `url(${ bgBannerImg})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* <input type="file" className="form-control" onChange={handleCoverPhotoChange} /> */}
          <div className="text-center mt-3">
            <div className="avatar avatar-lg mt-n5 mb-3">
              <img
                height={64}
                width={64}
                src={avatar7}
                alt="avatar"
                className="avatar-img rounded border border-white border-3"
              />
              {/* <input type="file" className="form-control" onChange={handleFileUploadProfile} /> */}
            </div>
          </div>
          <TextFormInput name="fName" label="First Name"  control={control} containerClassName="col-6" />
          <TextFormInput name="lName" label="Last Name" control={control} containerClassName="col-6" />
          <TextFormInput name="occupation" label="Occupation" control={control} containerClassName="col-12" />
          <TextFormInput name="gender" label="Gender" control={control} containerClassName="col-6" />
          <TextFormInput name="preferredLanguage" label="Preferred Language" control={control} containerClassName="col-6" />
          <Col xs={12}>
            <label className="form-label">Date of Birth</label>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <DateFormInput {...field} placeholder="YYYY-MM-DD" className="form-control" />
              )}
            />
          </Col>
          <TextFormInput name="phoneNo" label="Phone Number" control={control} containerClassName="col-6" />
          <TextFormInput name="email" label="Email" control={control} containerClassName="col-6" />
          <TextFormInput name="socialMediaProfile" label="Social Media Profile" control={control} containerClassName="col-12" />
          <TextAreaFormInput name="bio" label="Bio" rows={3} control={control} containerClassName="col-12" />
          <Col xs={12}>
            <h6> Address</h6>
            <TextFormInput name="permanentAddress.addressLine1" label="Address " control={control} containerClassName="col-12" />
            <TextFormInput name="permanentAddress.city" label="City" control={control} containerClassName="col-12" />
            <TextFormInput name="permanentAddress.state" label="State" control={control} containerClassName="col-12" />
            <TextFormInput name="permanentAddress.pincode" label="Pincode" control={control} containerClassName="col-12" />
          </Col>
          {/* <Col xs={12}>
            <h6>Current Address</h6>
            <TextFormInput name="currentAddress.addressLine1" label="Address Line 1" control={control} containerClassName="col-12" />
            <TextFormInput name="currentAddress.city" label="City" control={control} containerClassName="col-6" />
            <TextFormInput name="currentAddress.state" label="State" control={control} containerClassName="col-6" />
            <TextFormInput name="currentAddress.pincode" label="Pincode" control={control} containerClassName="col-6" />
          </Col> */}
          <DropzoneFormInput  icon={BsImages}  onFileUpload={handleCoverPhotoChange} showPreview={true} text="Drag here or click to upload Cover photo" />
              <DropzoneFormInput  icon={BsImages}  onFileUpload={handleFileUploadProfile} showPreview={true} text="Drag here or click to upload profile photo." />
          
          <Col xs={12} className="mt-3">
            <Button type="submit">Update Profile</Button>
          </Col>
        </form>
      </CardBody>
    </Card>
  );
};

export default AccountSettings;
