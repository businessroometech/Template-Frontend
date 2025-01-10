
// BusinessSellerForm


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessSellerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessType: '',
    yearsInOperation: '',
    primaryBusinessModel: '',
    reasonForSale: '',
    askingPrice: '',
    annualRevenue: '',
    annualProfit: '',
    assetValue: '',
    hasOutstandingDebts: '',
    isProfitable: '',
    keyProductsOrServices: '',
    numberOfEmployees: '',
    businessStructure: '',
    businessOwnershipStatus: '',
    leaseTerm: '',
    hasIntellectualProperty: '',
    hasContracts: '',
    hasLegalIssues: '',
    ownershipStructure: '',
    keyOperations: '',
    offersSupportAfterSale: '',
    hadBusinessValuation: '',
    desiredTimelineForSale: '',
    openToSellerFinancing: '',
    sellingPoints: ''
  });

  const [currentSection, setCurrentSection] = useState(0); // Current section index
  const totalSections = 6; // Total number of sections

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      fetch('https://app-backend-8r74.onrender.com/businessseller/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(() => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  const nextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Business Seller Form</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        
        {/* Business Information */}
        {currentSection === 0 && (
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Business Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="businessType" className="form-label">Business Type</label>
                  <input
                    id="businessType"
                    type="text"
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="yearsInOperation" className="form-label">Years in Operation</label>
                  <input
                    id="yearsInOperation"
                    type="number"
                    value={formData.yearsInOperation}
                    onChange={(e) => handleInputChange('yearsInOperation', e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financial Information */}
        {currentSection === 1 && (
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Financial Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="askingPrice" className="form-label">Asking Price</label>
                  <input
                    id="askingPrice"
                    type="number"
                    value={formData.askingPrice}
                    onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="annualRevenue" className="form-label">Annual Revenue</label>
                  <input
                    id="annualRevenue"
                    type="number"
                    value={formData.annualRevenue}
                    onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Operational Details */}
        {currentSection === 2 && (
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Operational Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="hasOutstandingDebts" className="form-label">Has Outstanding Debts</label>
                  <select
                    id="hasOutstandingDebts"
                    value={formData.hasOutstandingDebts}
                    onChange={(e) => handleInputChange('hasOutstandingDebts', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="isProfitable" className="form-label">Is Profitable</label>
                  <select
                    id="isProfitable"
                    value={formData.isProfitable}
                    onChange={(e) => handleInputChange('isProfitable', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employee & Structure Information */}
        {currentSection === 3 && (
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Employee & Structure Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="numberOfEmployees" className="form-label">Number of Employees</label>
                  <input
                    id="numberOfEmployees"
                    type="number"
                    value={formData.numberOfEmployees}
                    onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="businessStructure" className="form-label">Business Structure</label>
                  <input
                    id="businessStructure"
                    type="text"
                    value={formData.businessStructure}
                    onChange={(e) => handleInputChange('businessStructure', e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legal Information */}
        {currentSection === 4 && (
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Legal Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="businessOwnershipStatus" className="form-label">Business Ownership Status</label>
                  <input
                    id="businessOwnershipStatus"
                    type="text"
                    value={formData.businessOwnershipStatus}
                    onChange={(e) => handleInputChange('businessOwnershipStatus', e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="leaseTerm" className="form-label">Lease Term</label>
                  <input
                    id="leaseTerm"
                    type="text"
                    value={formData.leaseTerm}
                    onChange={(e) => handleInputChange('leaseTerm', e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Final Details */}
        {currentSection === 5 && (
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Final Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="keyOperations" className="form-label">Key Operations</label>
                  <input
                    id="keyOperations"
                    type="text"
                    value={formData.keyOperations}
                    onChange={(e) => handleInputChange('keyOperations', e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="offersSupportAfterSale" className="form-label">Offers Support After Sale</label>
                  <select
                    id="offersSupportAfterSale"
                    value={formData.offersSupportAfterSale}
                    onChange={(e) => handleInputChange('offersSupportAfterSale', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="hadBusinessValuation" className="form-label">Had Business Valuation</label>
                  <select
                    id="hadBusinessValuation"
                    value={formData.hadBusinessValuation}
                    onChange={(e) => handleInputChange('hadBusinessValuation', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="desiredTimelineForSale" className="form-label">Desired Timeline for Sale</label>
                  <input
                    id="desiredTimelineForSale"
                    type="text"
                    value={formData.desiredTimelineForSale}
                    onChange={(e) => handleInputChange('desiredTimelineForSale', e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="openToSellerFinancing" className="form-label">Open to Seller Financing</label>
                  <select
                    id="openToSellerFinancing"
                    value={formData.openToSellerFinancing}
                    onChange={(e) => handleInputChange('openToSellerFinancing', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between">
          {currentSection > 0 && (
            <button type="button" onClick={prevSection} className="btn btn-secondary">Previous</button>
          )}
          {currentSection < totalSections - 1 && (
            <button type="button" onClick={nextSection} className="btn btn-primary">Next</button>
          )}
          {currentSection === totalSections - 1 && (
            <button type="submit" className="btn btn-primary">Submit</button>
          )}
          <button type="button" onClick={handleSkip} className="btn btn-secondary">Skip for Now</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessSellerForm;
