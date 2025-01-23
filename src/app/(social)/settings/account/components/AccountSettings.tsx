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

import avatar7 from '@/assets/images/avatar/default avatar.png';
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
  const schema = yup.object({
    fName: yup.string(), 
    lName: yup.string(), 
    occupation: yup.string(),
    dob: yup.date(), 
    // phoneNo: yup.string(), 
    email: yup.string(), 
    // bio: yup.string(), 
    gender: yup.string(), 

});

const navigate = useNavigate();
const [loading, setLoading] = useState(false);
  const { user,saveSession} = useAuthContext();
  // console.log('---account settings---',user);
  console.log('profile in account settings',profile);
  

  const { control, handleSubmit,reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues : {
      fName : user?.firstName,
      lName : user?.lastName,
      email : user?.emailAddress,
      occupation : user?.userRole,
      gender : profile?.personalDetails?.gender,
      dob  : profile?.personalDetails?.dob,
    }
  });


  const [uploadedFilesProfile, setUploadedFilesProfile] = useState<FileType[]>([])
  const [uploadedFilesProfileBg, setUploadedFilesProfileBg] = useState<FileType[]>([])

  // console.log('---upf---',uploadedFilesProfile);
  // console.log('---upbgf---',uploadedFilesProfileBg);
  // This function will be triggered when files are uploaded
  const handleFileUploadProfile = (files: FileType[]) => {
    setUploadedFilesProfile(files)
  }
  const handleCoverPhotoChange = (files: FileType[]) => {
    setUploadedFilesProfileBg(files)
  }

  const handleUploadprofile = async () => {
    if(!uploadedFilesProfile || uploadedFilesProfile.length === 0) {
      console.log('went in');
      return "";
    }
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
    if(!uploadedFilesProfileBg || uploadedFilesProfileBg.length === 0) return "";
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
    setLoading(true);
    console.log('----data----',data)
    try {
      const profilePhoto = await handleUploadprofile()
      const coverPhoto = await handleUploadprofileBg()
        const requestBody : UserType = {
          occupation: data.occupation,
          userId: user?.id,
          userRole : data.occupation,
          // profilePictureUploadId: profilePhoto, // Use the profile photo ID after upload
          // bgPictureUploadId: coverPhoto, // Use the cover photo ID after upload
          firstName: data.fName,
          lastName: data.lName,
          dob: data.dob,
          // mobileNumber: data.phoneNo,
          emailAddress: data.email,
          // bio: data.bio,
          gender: data.gender,
          // preferredLanguage: data.preferredLanguage,
          // socialMediaProfile: data.socialMediaProfile,
          bodyMeasurement: "38-32-40",

          // permanentAddress: {
          //   addressLine1: data.permanentAddress.addressLine1,
          //   addressLine2: "Apt 4B",
          //   city: data?.permanentAddress?.city || "unknown",
          //   state: data?.permanentAddress?.state,
          //   pincode: data?.permanentAddress?.pincode,
          // },
          // currentAddress: {
          //   addressLine1: data?.currentAddress?.addressLine1,
          //   addressLine2: "Apt 4B",
          //   city: data?.currentAddress?.city,
          //   state: data.currentAddress.state,
          //   pincode: data.currentAddress.pincode,
          // },
          aadharNumberUploadId: "111e2227-c34d-78d3-e456-426614174333",
          panNumberUploadId: "222e3337-d45e-89d3-f456-426614174444"
        };

        console.log("Request body:", requestBody);

       
     
      const response = await fetch(' https://strengthholdings.com/api/v1/auth/update-or-create-Profile', {
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

      // for(const key in result) {
      //   if(user[key]) {
      //     user[key] = result[key];
      //   }
      // }

      // saveSession(user);
      navigate("/");

    
    // else{
    //   toast.error(' uploading photo required');
    // }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          'https://strengthholdings.com/api/v1/auth/get-user-Profile',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user?.id }),
          }
        );
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setProfile(data.data);
  
        // Update form values with fetched profile data
        reset({
          fName: user?.firstName || '',
          lName: user?.lastName || '',
          email: user?.emailAddress || '',
          occupation: data.data.personalDetails?.occupation 
          || '',
          gender: data.data.personalDetails?.gender || '',
          dob: data.data.personalDetails?.dob || '', // Set date properly
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    fetchUser();
  }, [user?.id, reset]);

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
              backgroundImage: `url(${profile.coverImgUrl || 
                bgBannerImg})`,
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
                src={
                  profile.profileImgUrl || avatar7}
                alt="avatar"
                style={{borderRadius : '22%'}}
                className="avatar-img border border-white border-3"
              />
              {/* <input type="file" className="form-control" onChange={handleFileUploadProfile} /> */}
            </div>
          </div>
          <TextFormInput name="fName" label="First Name"  control={control} containerClassName="col-6" />
          <TextFormInput name="lName" label="Last Name" control={control} containerClassName="col-6" />
          <DropdownFormInput
            name="occupation"
            label="Role"
            control={control}
            containerClassName="col-12"
            options={[
              { value: "entrepreneur", label: "Entrepreneur" },
              { value: "investor", label: "Investor" },
            ]}
          />
          <DropdownFormInput
            name="gender"
            label="Gender"
            control={control}
            containerClassName="col-12"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "prefer_not_to_say", label: "Prefer not to say" },
            ]}
          />
          <Col xs={12}>
            <label className="form-label">Date of Birth</label>
            <Controller
              name="dob"
              control={control}
              defaultValue={control._defaultValues.dob} // Set the defaultValue here
              render={({ field }) => (
                <DateFormInput 
                  {...field} 
                  placeholder="YYYY-MM-DD" 
                  className="form-control" 
                />
              )}
            />
          </Col>
          {/* <TextFormInput name="phoneNo" label="Phone Number" control={control} containerClassName="col-6" /> */}
          <TextFormInput name="email" label="Email" control={control} containerClassName="col-12" />
          {/* <TextAreaFormInput name="bio" label="Bio" rows={3} control={control} containerClassName="col-12" /> */}
          {/* <Col xs={12}>
            <h6> Address</h6>
            <TextFormInput name="permanentAddress.addressLine1" label="Address " control={control} containerClassName="col-12" />
            <TextFormInput name="permanentAddress.city" label="City" control={control} containerClassName="col-12" />
            <TextFormInput name="permanentAddress.state" label="State" control={control} containerClassName="col-12" />
            <TextFormInput name="permanentAddress.pincode" label="Pincode" control={control} containerClassName="col-12" />
          </Col> */}
          {/* <Col xs={12}>
            <h6>Current Address</h6>
            <TextFormInput name="currentAddress.addressLine1" label="Address Line 1" control={control} containerClassName="col-12" />
            <TextFormInput name="currentAddress.city" label="City" control={control} containerClassName="col-6" />
            <TextFormInput name="currentAddress.state" label="State" control={control} containerClassName="col-6" />
            <TextFormInput name="currentAddress.pincode" label="Pincode" control={control} containerClassName="col-6" />
          </Col> */}
          {/* <DropzoneFormInput  icon={BsImages}  onFileUpload={handleCoverPhotoChange} showPreview={true} text="Drag here or click to upload Cover photo" />
              <DropzoneFormInput  icon={BsImages}  onFileUpload={handleFileUploadProfile} showPreview={true} text="Drag here or click to upload profile photo." /> */}
          
          <Col xs={12} className="mt-3">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Update Profile'
            )}
          </Button>
          </Col>
        </form>
      </CardBody>
    </Card>
  );
};

export default AccountSettings;
