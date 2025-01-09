import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthContext } from '@/context/useAuthContext';
import { BsImages } from 'react-icons/bs';
import TextFormInput from '../form/TextFormInput';
import TextAreaFormInput from '../form/TextAreaFormInput';
import DateFormInput from '../form/DateFormInput';
import DropzoneFormInput from '../form/DropzoneFormInput';
import { uploadDoc } from '@/utils/CustomS3ImageUpload';
import { Button, CardBody, Col } from 'react-bootstrap';
import avatar7 from '@/assets/images/avatar/07.jpg';
import bgBannerImg from '@/assets/images/bg/01.jpg';

const UserModel = () => {
    const [show, setShow] = useState(true);
    const [profile, setProfile] = useState({});
    const [uploadedFilesProfile, setUploadedFilesProfile] = useState([]);
    const [uploadedFilesProfileBg, setUploadedFilesProfileBg] = useState([]);
    const { user } = useAuthContext();

    const schema = yup.object({
        fName: yup.string().required('Please enter your first name').default('Sachin'),
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

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFileUploadProfile = (files) => {
        setUploadedFilesProfile(files);
    };

    const handleCoverPhotoChange = (files) => {
        setUploadedFilesProfileBg(files);
    };

    const handleUploadProfile = async () => {
        try {
            const response = await uploadDoc(uploadedFilesProfile, user?.id);
            return response;
        } catch (err) {
            console.error('Error uploading profile:', err);
            return false;
        }
    };

    const handleUploadProfileBg = async () => {
        try {
            const response = await uploadDoc(uploadedFilesProfileBg, user?.id);
            return response;
        } catch (err) {
            console.error('Error uploading cover photo:', err);
            return false;
        }
    };

    const onSubmit = async (data) => {
        try {
            const profilePhoto = await handleUploadProfile();
            const coverPhoto = await handleUploadProfileBg();

            if (profilePhoto && coverPhoto) {
                const requestBody = {
                    occupation: data.occupation,
                    userId: user?.id,
                    profilePictureUploadId: profilePhoto,
                    bgPictureUploadId: coverPhoto,
                    firstName: data.fName,
                    lastName: data.lName,
                    dob: data.dob,
                    mobileNumber: data.phoneNo,
                    emailAddress: data.email,
                    bio: data.bio,
                    gender: data.gender,
                    preferredLanguage: data.preferredLanguage,
                    socialMediaProfile: data.socialMediaProfile,
                    permanentAddress: {
                        addressLine1: data.permanentAddress.addressLine1,
                        city: data.permanentAddress.city,
                        state: data.permanentAddress.state,
                        pincode: data.permanentAddress.pincode,
                    },
                };

                const response = await fetch('https://app-backend-8r74.onrender.com/api/v1/auth/update-or-create-Profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log(result);
            } else {
                alert('Uploading photos is required');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    

    return (
        <>
            <div className="modal-body">
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                        <div className="h-80px" style={{ backgroundImage: `url(${bgBannerImg})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
                        <div className="text-center mt-3">
                            <div className="avatar avatar-lg  mb-3" style={{ marginTop: "-50rem" }}>
                                <img height={64} width={64} src={avatar7} alt="avatar" className="avatar-img rounded border border-white border-3" />
                            </div>
                        </div>
                        <TextFormInput name="fName" label="First Name" control={control} containerClassName="col-6" />
                        <TextFormInput name="lName" label="Last Name" control={control} containerClassName="col-6" />
                        <TextFormInput name="occupation" label="Occupation" control={control} containerClassName="col-12" />
                        <TextFormInput name="gender" label="Gender" control={control} containerClassName="col-6" />
                        <TextFormInput name="preferredLanguage" label="Preferred Language" control={control} containerClassName="col-6" />
                        <Col xs={12}>
                            <label className="form-label">Date of Birth</label>
                            <Controller name="dob" control={control} render={({ field }) => <DateFormInput {...field} placeholder="YYYY-MM-DD" className="form-control" />} />
                        </Col>
                        <TextFormInput name="phoneNo" label="Phone Number" control={control} containerClassName="col-6" />
                        <TextFormInput name="email" label="Email" control={control} containerClassName="col-6" />
                        <TextFormInput name="socialMediaProfile" label="Social Media Profile" control={control} containerClassName="col-12" />
                        <TextAreaFormInput name="bio" label="Bio" rows={3} control={control} containerClassName="col-12" />
                        <Col xs={12}>
                            <h6>Address</h6>
                            <TextFormInput name="permanentAddress.addressLine1" label="Address" control={control} containerClassName="col-12" />
                            <TextFormInput name="permanentAddress.city" label="City" control={control} containerClassName="col-12" />
                            <TextFormInput name="permanentAddress.state" label="State" control={control} containerClassName="col-12" />
                            <TextFormInput name="permanentAddress.pincode" label="Pincode" control={control} containerClassName="col-12" />
                        </Col>
                        <DropzoneFormInput icon={BsImages} onFileUpload={handleCoverPhotoChange} showPreview={true} text="Drag here or click to upload Cover photo" />
                        <DropzoneFormInput icon={BsImages} onFileUpload={handleFileUploadProfile} showPreview={true} text="Drag here or click to upload profile photo." />
                        <Col xs={12} className="mt-3 justify-content-center d-flex">
                            <Button type="submit">Create Profile</Button>
                        </Col>
                    </form>
                </CardBody>
            </div>

        </>
    );
};

export default UserModel;
