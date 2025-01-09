
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
    fetch('http://localhost:5000/businessseller/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then(() => navigate("/"))
    console.log(formData);

  } catch (error) {
   console.log(error) 
  }
    
    
  
  
  //"error": "Table 'testDB.BusinessForSale' doesn't exist"
  
  
  
  
  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Business Seller Form</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        
        {/* Business Information */}
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

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="primaryBusinessModel" className="form-label">Primary Business Model</label>
                <input
                  id="primaryBusinessModel"
                  type="text"
                  value={formData.primaryBusinessModel}
                  onChange={(e) => handleInputChange('primaryBusinessModel', e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="reasonForSale" className="form-label">Reason for Sale</label>
                <input
                  id="reasonForSale"
                  type="text"
                  value={formData.reasonForSale}
                  onChange={(e) => handleInputChange('reasonForSale', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Information */}
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

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="annualProfit" className="form-label">Annual Profit</label>
                <input
                  id="annualProfit"
                  type="number"
                  value={formData.annualProfit}
                  onChange={(e) => handleInputChange('annualProfit', e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="assetValue" className="form-label">Asset Value</label>
                <input
                  id="assetValue"
                  type="number"
                  value={formData.assetValue}
                  onChange={(e) => handleInputChange('assetValue', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Operational Details */}
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
            <div className="mb-3">
              <label htmlFor="sellingPoints" className="form-label">Selling Points</label>
              <textarea
                id="sellingPoints"
                value={formData.sellingPoints}
                onChange={(e) => handleInputChange('sellingPoints', e.target.value)}
                className="form-control"
                rows="4"
              />
            </div>
          </div>
        </div>

        {/* Employee & Structure Information */}
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

        {/* Legal Information */}
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
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="hasIntellectualProperty" className="form-label">Has Intellectual Property</label>
                <select
                  id="hasIntellectualProperty"
                  value={formData.hasIntellectualProperty}
                  onChange={(e) => handleInputChange('hasIntellectualProperty', e.target.value)}
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="hasContracts" className="form-label">Has Contracts</label>
                <select
                  id="hasContracts"
                  value={formData.hasContracts}
                  onChange={(e) => handleInputChange('hasContracts', e.target.value)}
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
                <label htmlFor="hasLegalIssues" className="form-label">Has Legal Issues</label>
                <select
                  id="hasLegalIssues"
                  value={formData.hasLegalIssues}
                  onChange={(e) => handleInputChange('hasLegalIssues', e.target.value)}
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="ownershipStructure" className="form-label">Ownership Structure</label>
                <input
                  id="ownershipStructure"
                  type="text"
                  value={formData.ownershipStructure}
                  onChange={(e) => handleInputChange('ownershipStructure', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Final Details */}
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

        {/* Action Buttons */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" onClick={handleSkip} className="btn btn-secondary">Skip for Now</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessSellerForm;
