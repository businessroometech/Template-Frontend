
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
      fetch('https://app-backend-8r74.onrender.com/businessbuyer/create', {
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
      fetch('https://app-backend-8r74.onrender.com/businessseller/create', {
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const [step, setStep] = useState(1);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch('https://app-backend-8r74.onrender.com/business-seller/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(() => navigate('/'));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h5>Seller Information</h5>
            <div className="mb-3">
              <label htmlFor="sellerName" className="form-label">Your Name</label>
              <input
                id="sellerName"
                type="text"
                value={formData.sellerName}
                onChange={(e) => handleInputChange('sellerName', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="businessName" className="form-label">Business Name</label>
              <input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>Business Type</label>
              <select
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="Partnership">Partnership</option>
                <option value="LLC">LLC</option>
                <option value="Corporation">Corporation</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h5>Business Details</h5>
            <div className="mb-3">
              <label>Business Stage</label>
              <select
                value={formData.businessStage}
                onChange={(e) => handleInputChange('businessStage', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Startup">Startup</option>
                <option value="Growth">Growth</option>
                <option value="Mature">Mature</option>
                <option value="Declining">Declining</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Industry</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>Location of Business</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h5>Financial Information</h5>
            <div className="mb-3">
              <label>Annual Revenue</label>
              <input
                type="text"
                value={formData.revenue}
                onChange={(e) => handleInputChange('revenue', e.target.value)}
                className="form-control"
                placeholder="Annual Revenue"
                required
              />
            </div>
            <div className="mb-3">
              <label>Annual Profit</label>
              <input
                type="text"
                value={formData.profit}
                onChange={(e) => handleInputChange('profit', e.target.value)}
                className="form-control"
                placeholder="Annual Profit"
              />
            </div>
            <div className="mb-3">
              <label>Number of Employees</label>
              <input
                type="number"
                value={formData.numberOfEmployees}
                onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h5>Ownership & Sale Information</h5>
            <div className="mb-3">
              <label>Ownership Percentage Available for Sale</label>
              <input
                type="text"
                value={formData.ownershipPercentage}
                onChange={(e) => handleInputChange('ownershipPercentage', e.target.value)}
                className="form-control"
                placeholder="Ownership Percentage"
                required
              />
            </div>
            <div className="mb-3">
              <label>Reason for Selling the Business</label>
              <input
                type="text"
                value={formData.reasonForSelling}
                onChange={(e) => handleInputChange('reasonForSelling', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>Asking Price</label>
              <input
                type="text"
                value={formData.askingPrice}
                onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h5>Additional Business Details</h5>
            <div className="mb-3">
              <label>Intellectual Property (Patents, Trademarks, etc.)</label>
              <input
                type="text"
                value={formData.intellectualProperty}
                onChange={(e) => handleInputChange('intellectualProperty', e.target.value)}
                className="form-control"
                placeholder="Intellectual Property Details"
              />
            </div>
            <div className="mb-3">
              <label>Assets for Sale</label>
              <input
                type="text"
                value={formData.assetsForSale}
                onChange={(e) => handleInputChange('assetsForSale', e.target.value)}
                className="form-control"
                placeholder="Assets"
              />
            </div>
            <div className="mb-3">
              <label>Liabilities</label>
              <input
                type="text"
                value={formData.liabilities}
                onChange={(e) => handleInputChange('liabilities', e.target.value)}
                className="form-control"
                placeholder="Liabilities"
              />
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <h5>Final Business Information</h5>
            <div className="mb-3">
              <label>Business's Financial History</label>
              <textarea
                value={formData.financialHistory}
                onChange={(e) => handleInputChange('financialHistory', e.target.value)}
                className="form-control"
                rows="3"
                required
              />
            </div>
            <div className="mb-3">
              <label>Sales Forecast for the Next Year</label>
              <input
                type="text"
                value={formData.salesForecast}
                onChange={(e) => handleInputChange('salesForecast', e.target.value)}
                className="form-control"
                placeholder="Sales Forecast"
              />
            </div>
            <div className="mb-3">
              <label>Exit Strategy</label>
              <input
                type="text"
                value={formData.exitStrategy}
                onChange={(e) => handleInputChange('exitStrategy', e.target.value)}
                className="form-control"
                placeholder="Exit Strategy"
                required
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Business Seller Form</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        {renderStep()}
        <div className="d-flex justify-content-between mt-4">
          {step > 1 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Previous</button>}
          {step < 6 && <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>}
          {step === 6 && <button type="submit" className="btn btn-primary">Submit</button>}
          <button type="button" className="btn btn-secondary" onClick={handleSkip}>Skip</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessBuyerForm;
