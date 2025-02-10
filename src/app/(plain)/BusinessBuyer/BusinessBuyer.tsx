
/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessBuyingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessType: '',
    businessLocation: '',
    businessModel: '',
    budget: '',
    renovationInvestment: '',
    timeline: '',
    growthOrStableCashFlow: '',
    supportAfterPurchase: '',
    ndaAgreement: '',
    additionalInfo: ''
  });

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch('http://3.101.12.130:5000/businessbuyer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(() => navigate("/"));
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Business Buying Preferences Form</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Business Buying Preferences</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="businessType" className="form-label">What type of business are you interested in buying?</label>
              <select
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="SaaS">SaaS</option>
                <option value="Content">Content</option>
                <option value="Marketplace">Marketplace</option>
                <option value="Agency">Agency</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Shopify App">Shopify App</option>
                <option value="Main Street">Main Street</option>
                <option value="Ecommerce">Ecommerce</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="businessLocation" className="form-label">Preferred business location or region:</label>
              <input
                id="businessLocation"
                type="text"
                value={formData.businessLocation}
                onChange={(e) => handleInputChange('businessLocation', e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="businessModel" className="form-label">What is your preferred business model?</label>
              <select
                value={formData.businessModel}
                onChange={(e) => handleInputChange('businessModel', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Independent">Independent</option>
                <option value="Franchise">Franchise</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="budget" className="form-label">What is your budget for purchasing a business?</label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Under $50k">Under $50k</option>
                <option value="$50k - $100k">$50k - $100k</option>
                <option value="$100k - $500k">$100k - $500k</option>
                <option value="$500k - $1M">$500k - $1M</option>
                <option value="Over $1M">Over $1M</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Are you open to investing in a business that requires renovation or additional investment?</label>
              <select
                value={formData.renovationInvestment}
                onChange={(e) => handleInputChange('renovationInvestment', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>
            <div className="mb-3">
              <label>What is your timeline for purchasing a business?</label>
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Immediately">Immediately</option>
                <option value="1-3 months">1-3 months</option>
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Are you interested in a business that has potential for growth or one with stable cash flow?</label>
              <select
                value={formData.growthOrStableCashFlow}
                onChange={(e) => handleInputChange('growthOrStableCashFlow', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Growth">Growth</option>
                <option value="Stable Cash Flow">Stable Cash Flow</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Are you interested in any support or training after the business purchase?</label>
              <select
                value={formData.supportAfterPurchase}
                onChange={(e) => handleInputChange('supportAfterPurchase', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Are you willing to sign a non-disclosure agreement (NDA) before receiving sensitive business information?</label>
              <select
                value={formData.ndaAgreement}
                onChange={(e) => handleInputChange('ndaAgreement', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Additional Information</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="additionalInfo" className="form-label">Is there anything else you would like us to know about your business buying preferences?</label>
              <textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary me-2" onClick={handleSkip}>Skip</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessBuyingForm;




/*}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessBuyerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessType: '',
    businessLocation: '',
    businessModel: '',
    revenue: '',
    profit: '',
    reasonForSelling: '',
    timeline: '',
    supportAfterSale: '',
    askingPrice: '',
    ndaAgreement: '',
    additionalInfo: ''
  });

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch('http://3.101.12.130:5000/businessseller/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(() => navigate("/"));
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Business Selling Preferences Form</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Business Selling Preferences</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="businessType" className="form-label">What type of business are you selling?</label>
              <select
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="SaaS">SaaS</option>
                <option value="Content">Content</option>
                <option value="Marketplace">Marketplace</option>
                <option value="Agency">Agency</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Shopify App">Shopify App</option>
                <option value="Main Street">Main Street</option>
                <option value="Ecommerce">Ecommerce</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="businessLocation" className="form-label">Business location or region:</label>
              <input
                id="businessLocation"
                type="text"
                value={formData.businessLocation}
                onChange={(e) => handleInputChange('businessLocation', e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="businessModel" className="form-label">What is your business model?</label>
              <select
                value={formData.businessModel}
                onChange={(e) => handleInputChange('businessModel', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Independent">Independent</option>
                <option value="Franchise">Franchise</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="revenue" className="form-label">What is the annual revenue?</label>
              <input
                id="revenue"
                type="text"
                value={formData.revenue}
                onChange={(e) => handleInputChange('revenue', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profit" className="form-label">What is the annual profit?</label>
              <input
                id="profit"
                type="text"
                value={formData.profit}
                onChange={(e) => handleInputChange('profit', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reasonForSelling" className="form-label">Reason for selling:</label>
              <textarea
                id="reasonForSelling"
                value={formData.reasonForSelling}
                onChange={(e) => handleInputChange('reasonForSelling', e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>What is your timeline for selling the business?</label>
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Immediately">Immediately</option>
                <option value="1-3 months">1-3 months</option>
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Are you willing to offer support or training after the business sale?</label>
              <select
                value={formData.supportAfterSale}
                onChange={(e) => handleInputChange('supportAfterSale', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="askingPrice" className="form-label">What is your asking price?</label>
              <input
                id="askingPrice"
                type="text"
                value={formData.askingPrice}
                onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>Are you willing to sign a non-disclosure agreement (NDA) before providing sensitive business information?</label>
              <select
                value={formData.ndaAgreement}
                onChange={(e) => handleInputChange('ndaAgreement', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Additional Information</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="additionalInfo" className="form-label">Is there anything else you would like us to know about your business selling preferences?</label>
              <textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary me-2" onClick={handleSkip}>Skip</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessBuyerForm;


*/











/*............................................................................../*
   THIS IS BUSINESS SELLER

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FaRegLightbulb, FaInfoCircle, FaBusinessTime, FaMoneyBillWave, FaHandshake, FaChartLine, FaClipboardList, FaUser, FaBuilding, FaIndustry, FaMapMarkerAlt, FaDollarSign, FaUsers, FaPercentage, FaQuestionCircle, FaBriefcase, FaFileAlt, FaTrophy, FaGavel, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
const BusinessBuyerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sellerName: '',
    businessName: '',
    businessType: '',
    businessStage: '',
    industry: '',
    location: '',
    revenue: '',
    profit: '',
    numberOfEmployees: '',
    ownershipPercentage: '',
    reasonForSelling: '',
    askingPrice: '',
    intellectualProperty: '',
    assetsForSale: '',
    liabilities: '',
    financialHistory: '',
    salesForecast: '',
    marketingStrategy: '',
    competition: '',
    exitStrategy: '',
    legalIssues: '',
    expectedTimeline: '',
    additionalInformation: '',
  });

  const [step, setStep] = useState(0);
  const sections = [
    { title: "Seller Information", icon: <FaInfoCircle /> },
    { title: "Business Details", icon: <FaBusinessTime /> },
    { title: "Financial Information", icon: <FaMoneyBillWave /> },
    { title: "Ownership & Sale Information", icon: <FaHandshake /> },
    { title: "Additional Business Details", icon: <FaChartLine /> },
    { title: "Final Business Information", icon: <FaClipboardList /> },
  ];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch('http://3.101.12.130:5000/businessselle/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(() => navigate('/'));
      console.log(formData)
    } catch (error) {
      console.log(error);
    }
  };





  const handleSkip = () => {
    navigate('/');
  };

  const setCurrentSection = (index) => {
    setStep(index);
  };

  const renderStep = () => {
    const renderFormFields = (fields) => (
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h5 className="fs-4">
            {sections[step].icon} {sections[step].title}
          </h5>
        </Card.Header>
        <Card.Body>
          {fields.map((field, index) => (
            <div className="mb-3" key={index}>
              <label htmlFor={field.id} className="form-label">
                {field.icon} {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  value={formData[field.name]}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="form-control"
                  rows={field.rows || 3}
                  required={field.required}
                />
              ) : (
                <input
                  id={field.id}
                  type={field.inputType || 'text'}
                  value={formData[field.name]}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="form-control"
                  placeholder={field.placeholder || ''}
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
          { id: 'sellerName', label: 'Your Name', name: 'sellerName', icon: <FaUser />, required: true },
          { id: 'businessName', label: 'Business Name', name: 'businessName', icon: <FaBuilding />, required: true },
          {
            id: 'businessType', label: 'Business Type', name: 'businessType', icon: <FaIndustry />, inputType: 'select', required: true,
            options: ['Sole Proprietorship', 'Partnership', 'LLC', 'Corporation', 'Other']
          }
        ]);
      case 1:
        return renderFormFields([
          {
            id: 'businessStage', label: 'Business Stage', name: 'businessStage', icon: <FaBriefcase />, inputType: 'select', required: true,
            options: ['Startup', 'Growth', 'Mature', 'Declining']
          },
          { id: 'industry', label: 'Industry', name: 'industry', icon: <FaIndustry />, required: true },
          { id: 'location', label: 'Location of Business', name: 'location', icon: <FaMapMarkerAlt />, required: true }
        ]);
      case 2:
        return renderFormFields([
          { id: 'revenue', label: 'Annual Revenue', name: 'revenue', icon: <FaDollarSign />, placeholder: 'Annual Revenue', required: true },
          { id: 'profit', label: 'Annual Profit', name: 'profit', icon: <FaDollarSign />, placeholder: 'Annual Profit' },
          { id: 'numberOfEmployees', label: 'Number of Employees', name: 'numberOfEmployees', icon: <FaUsers />, inputType: 'number', required: true }
        ]);
      case 3:
        return renderFormFields([
          { id: 'ownershipPercentage', label: 'Ownership Percentage Available for Sale', name: 'ownershipPercentage', icon: <FaPercentage />, placeholder: 'Ownership Percentage', required: true },
          { id: 'reasonForSelling', label: 'Reason for Selling the Business', name: 'reasonForSelling', icon: <FaQuestionCircle />, required: true },
          { id: 'askingPrice', label: 'Asking Price', name: 'askingPrice', icon: <FaDollarSign />, required: true }
        ]);
      case 4:
        return renderFormFields([
          { id: 'intellectualProperty', label: 'Intellectual Property (Patents, Trademarks, etc.)', name: 'intellectualProperty', icon: <FaFileAlt />, placeholder: 'Intellectual Property Details' },
          { id: 'assetsForSale', label: 'Assets for Sale', name: 'assetsForSale', icon: <FaFileAlt />, placeholder: 'Assets' },
          { id: 'liabilities', label: 'Liabilities', name: 'liabilities', icon: <FaFileAlt />, placeholder: 'Liabilities' }
        ]);
      case 5:
        return renderFormFields([
          { id: 'financialHistory', label: 'Business\'s Financial History', name: 'financialHistory', icon: <FaFileAlt />, type: 'textarea', required: true },
          { id: 'salesForecast', label: 'Sales Forecast for the Next Year', name: 'salesForecast', icon: <FaChartLine />, placeholder: 'Sales Forecast' },
          { id: 'exitStrategy', label: 'Exit Strategy', name: 'exitStrategy', icon: <FaTrophy />, placeholder: 'Exit Strategy', required: true },
          { id: 'legalIssues', label: 'Legal Issues (if any)', name: 'legalIssues', icon: <FaGavel />, placeholder: 'Legal Issues' },
          { id: 'expectedTimeline', label: 'Expected Timeline for Sale', name: 'expectedTimeline', icon: <FaCalendarAlt />, placeholder: 'Expected Timeline' },
          { id: 'additionalInformation', label: 'Additional Information', name: 'additionalInformation', icon: <FaClipboardList />, type: 'textarea' }
        ]);
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Business Seller</h2>
      <div className="d-flex justify-content-center mb-4">
        {sections.map((section, index) => (
          <button
            key={index}
            type="button"
            className={`btn mx-2 ${step === index ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCurrentSection(index)}
          >
            {section.icon} {section.title}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        {renderStep()}
        <div className="d-flex justify-content-between mt-4">
          {step > 0 && <button type="button" className="btn btn-secondary" onClick={() => setStep(step - 1)}>Previous</button>}
          {step < sections.length - 1 && <button type="button" className="btn btn-primary" onClick={() => setStep(step + 1)}>Next</button>}
{step === sections.length - 1 && <button type="submit" className="btn btn-primary">Submit</button>}
          <button type="button" className="btn btn-secondary" onClick={handleSkip}>Skip</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessBuyerForm;




//.......................................................................//
bUSINESS sELLER ENDS HERE



*/




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaBuilding, FaMoneyBillWave, FaToolbox, FaClock, FaBalanceScale, FaHandsHelping, FaFileSignature, FaInfoCircle } from 'react-icons/fa';
import { useAuthContext } from '@/context/useAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LIVE_URL } from '@/utils/api';

const BusinessPreferencesForm = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessType: '',
    businessLocation: '',
    businessModel: '',
    budget: "",
    renovationInvestment: "",
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

  const handleInputChange = (name, value) => {
    // Remove any validation restrictions
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      UserId: user?.id
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user?.id) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }
  
    toast.success("Form submitted successfully!");
  
    try {
      const response1 = await fetch(`http://13.216.146.100/api/v1/businessbuyer/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData }),
      });
  
      if (!response1.ok) {
        throw new Error("Failed to submit business buyer data");
      }
  
      try {
        const response2 = await fetch(`http://13.216.146.100/api/v1/subrole/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserId: user?.id,
            SubRole: "BusinessBuyer"
          }),
        });
  
        if (!response2.ok) {
          throw new Error("Failed to submit subrole data");
        }
  
        navigate('/');
      } catch (error) {
        console.error("Error in second request:", error);
        toast.error("An error occurred while submitting the subrole data.");
      }
  
    } catch (error) {
      console.error("Error in first request:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };
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
          { id: 'businessLocation', label: 'Preferred business location or region:', name: 'businessLocation', icon: <FaMapMarkerAlt />, type: 'text', required: true },
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
          { id: 'growthOrStableCashFlow', label: 'Are you interested in a business with potential for growth or stable cash flow?', name: 'growthOrStableCashFlow', icon: <FaBalanceScale />, type: 'select', options: ['Growth', 'Stable Cash Flow', 'Both'], required: true },
        ]);
      case 3:
        return renderFormFields([
          { id: 'supportAfterPurchase', label: 'Are you interested in any support or training after the business purchase?', name: 'supportAfterPurchase', icon: <FaHandsHelping />, type: 'select', options: ['Yes', 'No', 'Maybe'], required: true },
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

export default BusinessPreferencesForm;
