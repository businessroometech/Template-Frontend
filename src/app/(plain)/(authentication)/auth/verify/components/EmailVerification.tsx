import PasswordFormInput from '@/components/form/PasswordFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import PageMetaData from '@/components/PageMetaData';
import { currentYear, developedBy, developedByLink } from '@/context/constants';
import React, { useState } from 'react';
import { Button, Card, FormCheck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import Loading from '@/components/Loading';
import { LIVE_URL } from '@/utils/api';

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');  
  const [loading, setLoading] = useState(false);

  const handleSendVerificationEmail = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(`${LIVE_URL}api/v1/auth/send-verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Verification email sent successfully!');
        setMessageType('success');
      
      } else {
        setMessage(data.message || 'Failed to send email');
        setMessageType('danger');
      }
      setLoading(false)
      setEmail('')
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      setMessageType('danger');
      setLoading(false)
    }
  };


  return (
    <>
       <PageMetaData title='Sign In' />
      <AuthLayout>
        <Card className="card-body text-center p-4 p-sm-5">
        <h1 className="mb-1">Email Verification</h1>
        
      <div className="container mt-0">     
    <p>Email verification ensures your account's security and prevents unauthorized access and spam.</p>
        {message && (
          <div className={`alert alert-${messageType} mt-3`} role="alert">
            {message}
          </div>
        )}

        {/* Form to send verification email */}
        <form onSubmit={handleSendVerificationEmail}>
          <div className="mb-3">
           
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}> 
            <Loading size={20} loading={loading} color='#fff'/>{!loading&&` Send Verification Email`}
          </button>
        </form>

      </div>

        <p className="mb-0 mt-3">
          ©{currentYear}
          <Link target="_blank" to={developedByLink} style={{ marginRight: '5px' }}>
            {developedBy}
          </Link>
          All rights reserved
        </p>
     
      </Card>
      </AuthLayout>
    </>
  );
};

export default EmailVerification;
