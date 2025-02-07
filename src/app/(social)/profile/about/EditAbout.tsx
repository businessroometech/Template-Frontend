
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaBuilding, FaMoneyBillWave, FaToolbox, FaClock, FaBalanceScale, FaHandsHelping, FaFileSignature, FaInfoCircle } from 'react-icons/fa';
import { useAuthContext } from '@/context/useAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LIVE_URL } from '@/utils/api';

const EditAbout = () => {



    
    const id = useParams()
    console.log("-----------------------editid--------------------------------" , id)
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessType: '',
    businesslocation: '',
    businessModel: '',
    budget: '',
    renovationInvestment: '',
    timeline: '',
    growthOrStableCashFlow: '',
    supportAfterPurchase: '',
    ndaAgreement: '',
    additionalInfo: '',
  });

  const [step, setStep] = useState(0);
  const sections = [
    { title: "Business Type & Location", icon: <FaBuilding /> },
    { title: "Financial & Investment Details", icon: <FaMoneyBillWave /> },
    { title: "Timeline & Growth Preferences", icon: <FaClock /> },
    { title: "Support & Confidentiality", icon: <FaHandsHelping /> },
    { title: "Additional Information", icon: <FaInfoCircle /> },
  ];
  const handleSkip = () => {
    navigate('/');
  };

  const setCurrentSection = (index) => {
    setStep(index);
  };

  const renderStep = () => {
    const renderFormFields = (fields) => (
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-transparent text-white">
          <h5 className="fs-4">
            {sections[step].icon} {sections[step].title}
          </h5>
        </Card.Header>
        <Card.Body>
          <ToastContainer />
          {fields.map((field, index) => (
            <div className="mb-3" key={index}>
              <label htmlFor={field.id} className="form-label">
                {field.icon} {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  id={field.id}
                  value={formData[field.name]}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="form-control"
                  required={field.required}
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.id}
                  type={field.inputType || 'text'}
                  value={formData[field.name]}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="form-control"
                  required={field.required}
                />
              )}
            </div>
          ))}
        </Card.Body>
      </Card>
    );

    switch (step) {
      case 0:
        return renderFormFields([
          { id: 'businessType', label: 'What type of business are you interested in buying?', name: 'businessType', icon: <FaBuilding />, type: 'select', options: ['SaaS', 'Content', 'Marketplace', 'Agency', 'Mobile App', 'Shopify App', 'Main Street', 'Ecommerce', 'Other'], required: true },
          { id: 'location', label: 'Preferred business location or region:', name: 'location', icon: <FaMapMarkerAlt />, type: 'text', required: true },
          { id: 'businessModel', label: 'What is your preferred business model?', name: 'businessModel', icon: <FaToolbox />, type: 'select', options: ['Independent', 'Franchise', 'Online', 'Hybrid'], required: true },
        ]);
      case 1:
        return renderFormFields([
          { id: 'budget', label: 'What is your budget for purchasing a business?', name: 'budget', icon: <FaMoneyBillWave />, type: 'select', options: ['Under $50k', '$50k - $100k', '$100k - $500k', '$500k - $1M', 'Over $1M'], required: true },
          { id: 'renovationInvestment', label: 'Are you open to investing in a business that requires renovation or additional investment?', name: 'renovationInvestment', icon: <FaBalanceScale />, type: 'select', options: ['Yes', 'No', 'Maybe'], required: true },
        ]);
      case 2:
        return renderFormFields([
          { id: 'timeline', label: 'What is your timeline for purchasing a business?', name: 'timeline', icon: <FaClock />, type: 'select', options: ['Immediately', '1-3 months', '6 months', '1 year', 'Flexible'], required: true },
          { id: 'growthPreference', label: 'Are you interested in a business with potential for growth or stable cash flow?', name: 'growthPreference', icon: <FaBalanceScale />, type: 'select', options: ['Growth', 'Stable Cash Flow', 'Both'], required: true },
        ]);
      case 3:
        return renderFormFields([
          { id: 'supportTraining', label: 'Are you interested in any support or training after the business purchase?', name: 'supportTraining', icon: <FaHandsHelping />, type: 'select', options: ['Yes', 'No', 'Maybe'], required: true },
          { id: 'ndaAgreement', label: 'Are you willing to sign a non-disclosure agreement (NDA) before receiving sensitive business information?', name: 'ndaAgreement', icon: <FaFileSignature />, type: 'select', options: ['Yes', 'No'], required: true },
        ]);
      case 4:
        return renderFormFields([
          { id: 'additionalInfo', label: 'Is there anything else you would like us to know about your business buying preferences?', name: 'additionalInfo', icon: <FaInfoCircle />, type: 'text', required: false },
        ]);
      default:
        return null;
    }
  };






const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user?.id) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }
  
    toast.success("Form submitted successfully!");
  
    try {
      const response1 = await fetch(`http://localhost:5000/v1/businessbuyer/update/bf7fe3d031266d8b0ed46bfcc457a868`, {
        method: 'PUT',
        headers: {
        //   'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData }),
      });
  
      if (!response1.ok) {
        throw new Error("Failed to submit business buyer data");
      }
  
    } catch (error) {
      console.error("Error in first request:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,

    }));
  };
  
  return (
    <div className="container mt-5">
      <h2 className="text-start mb-4">Entrepreneur (Interested in Acquiring a Startup.)</h2>

      <div className="d-flex justify-content-center mb-4">
        {sections.map((section, index) => (
          <button
            key={index}
            type="button"
            className="btn mx-2"
            style={{
              backgroundColor: step === index ? '#1ea1f2' : 'transparent',
              borderColor: '#1ea1f2',
              color: step === index ? 'white' : '#1ea1f2',
            }}
            onClick={() => setCurrentSection(index)}
          >
            {section.icon} {section.title}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        {renderStep()}
        <div className="d-flex justify-content-between mt-4">
          <button type="button" className="btn btn-secondary btn-danger" onClick={handleSkip}>Skip</button>
          <ButtonGroup>
            {step > 0 && <button type="button" className="btn btn-secondary" onClick={() => setStep(step - 1)}>Previous</button>}
            {step < sections.length - 1 && <button type="button" className="btn btn-primary" onClick={() => setStep(step + 1)}>Next</button>}
            {step === sections.length - 1 && <button type="submit" className="btn btn-primary">Submit</button>}
          </ButtonGroup>
        </div>
      </form>
    </div>
  );
};

export default EditAbout;
