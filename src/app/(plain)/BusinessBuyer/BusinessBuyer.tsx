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
      fetch('http://localhost:5000/business/buy', {
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
