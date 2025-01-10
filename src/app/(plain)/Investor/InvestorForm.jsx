//InvestorForm
/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InvestorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    investmentFocus: '',
    preferredIndustries: '',
    investmentSizeRange: '',
    preferredBusinessStage: '',
    preferredLocation: '',
    investmentStrategy: '',
    riskTolerance: '',
    decisionMakingProcess: '',
    desiredReturnOnInvestment: '',
    expectedTimeframe: '',
    investmentHistory: '',
    availableSupport: '',
    openToJointVentures: '',
    preferredEquityStake: '',
    strategicInvolvement: '',
    contactMethod: '',
    availableCapital: '',
    investmentCriteria: '',
    previousInvestments: '',
    exitStrategy: '',
    geographicPreferences: '',
    investmentGoals: '',
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
      fetch('http://localhost:5000/investor/create', {
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
      <h2 className="text-center mb-4">Investor Form</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        
        {/* Investment Preferences }
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Investment Preferences</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="investmentFocus" className="form-label">Investment Focus</label>
                <input
                  id="investmentFocus"
                  type="text"
                  value={formData.investmentFocus}
                  onChange={(e) => handleInputChange('investmentFocus', e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="preferredIndustries" className="form-label">Preferred Industries</label>
                <input
                  id="preferredIndustries"
                  type="text"
                  value={formData.preferredIndustries}
                  onChange={(e) => handleInputChange('preferredIndustries', e.target.value)}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="investmentSizeRange" className="form-label">Investment Size Range</label>
                <input
                  id="investmentSizeRange"
                  type="text"
                  value={formData.investmentSizeRange}
                  onChange={(e) => handleInputChange('investmentSizeRange', e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="preferredBusinessStage" className="form-label">Preferred Business Stage</label>
                <input
                  id="preferredBusinessStage"
                  type="text"
                  value={formData.preferredBusinessStage}
                  onChange={(e) => handleInputChange('preferredBusinessStage', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="preferredLocation" className="form-label">Preferred Location</label>
                <input
                  id="preferredLocation"
                  type="text"
                  value={formData.preferredLocation}
                  onChange={(e) => handleInputChange('preferredLocation', e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="investmentStrategy" className="form-label">Investment Strategy</label>
                <input
                  id="investmentStrategy"
                  type="text"
                  value={formData.investmentStrategy}
                  onChange={(e) => handleInputChange('investmentStrategy', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="riskTolerance" className="form-label">Risk Tolerance</label>
                <select
                  id="riskTolerance"
                  value={formData.riskTolerance}
                  onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="decisionMakingProcess" className="form-label">Decision Making Process</label>
                <input
                  id="decisionMakingProcess"
                  type="text"
                  value={formData.decisionMakingProcess}
                  onChange={(e) => handleInputChange('decisionMakingProcess', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="desiredReturnOnInvestment" className="form-label">Desired Return on Investment</label>
                <input
                  id="desiredReturnOnInvestment"
                  type="text"
                  value={formData.desiredReturnOnInvestment}
                  onChange={(e) => handleInputChange('desiredReturnOnInvestment', e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="expectedTimeframe" className="form-label">Expected Timeframe</label>
                <input
                  id="expectedTimeframe"
                  type="text"
                  value={formData.expectedTimeframe}
                  onChange={(e) => handleInputChange('expectedTimeframe', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="investmentHistory" className="form-label">Investment History</label>
                <textarea
                  id="investmentHistory"
                  value={formData.investmentHistory}
                  onChange={(e) => handleInputChange('investmentHistory', e.target.value)}
                  className="form-control"
                  rows="4"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="availableSupport" className="form-label">Available Support</label>
                <textarea
                  id="availableSupport"
                  value={formData.availableSupport}
                  onChange={(e) => handleInputChange('availableSupport', e.target.value)}
                  className="form-control"
                  rows="4"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="openToJointVentures" className="form-label">Open to Joint Ventures</label>
                <select
                  id="openToJointVentures"
                  value={formData.openToJointVentures}
                  onChange={(e) => handleInputChange('openToJointVentures', e.target.value)}
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="preferredEquityStake" className="form-label">Preferred Equity Stake</label>
                <input
                  id="preferredEquityStake"
                  type="text"
                  value={formData.preferredEquityStake}
                  onChange={(e) => handleInputChange('preferredEquityStake', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="strategicInvolvement" className="form-label">Strategic Involvement</label>
                <textarea
                  id="strategicInvolvement"
                  value={formData.strategicInvolvement}
                  onChange={(e) => handleInputChange('strategicInvolvement', e.target.value)}
                  className="form-control"
                  rows="4"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="contactMethod" className="form-label">Preferred Contact Method</label>
                <input
                  id="contactMethod"
                  type="text"
                  value={formData.contactMethod}
                  onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="availableCapital" className="form-label">Available Capital</label>
                <input
                  id="availableCapital"
                  type="text"
                  value={formData.availableCapital}
                  onChange={(e) => handleInputChange('availableCapital', e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="investmentCriteria" className="form-label">Investment Criteria</label>
                <textarea
                  id="investmentCriteria"
                  value={formData.investmentCriteria}
                  onChange={(e) => handleInputChange('investmentCriteria', e.target.value)}
                  className="form-control"
                  rows="4"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="previousInvestments" className="form-label">Previous Investments</label>
                <textarea
                  id="previousInvestments"
                  value={formData.previousInvestments}
                  onChange={(e) => handleInputChange('previousInvestments', e.target.value)}
                  className="form-control"
                  rows="4"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="exitStrategy" className="form-label">Exit Strategy</label>
                <textarea
                  id="exitStrategy"
                  value={formData.exitStrategy}
                  onChange={(e) => handleInputChange('exitStrategy', e.target.value)}
                  className="form-control"
                  rows="4"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="geographicPreferences" className="form-label">Geographic Preferences</label>
                <input
                  id="geographicPreferences"
                  type="text"
                  value={formData.geographicPreferences}
                  onChange={(e) => handleInputChange('geographicPreferences', e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="investmentGoals" className="form-label">Investment Goals</label>
                <textarea
                  id="investmentGoals"
                  value={formData.investmentGoals}
                  onChange={(e) => handleInputChange('investmentGoals', e.target.value)}
                  className="form-control"
                  rows="4"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons }
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" onClick={handleSkip} className="btn btn-secondary">Skip for Now</button>
        </div>
      </form>
    </div>
  );
};

export default InvestorForm;
*/


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InvestorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    investorName: '',
    isAccredited: '',
    groupName: '',
    investorType: '',
    interestedStartups: '',
    preferredStage: '',
    regionPreference: '',
    investmentSize: '',
    totalBudget: '',
    coInvesting: '',
    equityPercentage: '',
    investmentType: '',
    involvementLevel: '',
    additionalSupport: '',
    previousInvestment: '',
    investmentExperience: '',
    numberOfStartups: '',
    successStories: '',
    decisionProcess: '',
    evaluationCriteria: [],
    exitStrategyPreference: '',
    fundraisingStage: '',
    expectedInvolvement: '',
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
      fetch('https://app-backend-8r74.onrender.com//investor/create', {
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
      <h2 className="text-center mb-4">Investor Form</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>

        {/* Investor Identity Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Investor Identity</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="investorName" className="form-label">Investor Name</label>
              <input
                id="investorName"
                type="text"
                value={formData.investorName}
                onChange={(e) => handleInputChange('investorName', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>Are you a member of any accreditation group?</label>
              <select
                value={formData.isAccredited}
                onChange={(e) => handleInputChange('isAccredited', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {formData.isAccredited === 'Yes' && (
              <div className="mb-3">
                <label htmlFor="groupName" className="form-label">Name of group(s)</label>
                <input
                  id="groupName"
                  type="text"
                  value={formData.groupName}
                  onChange={(e) => handleInputChange('groupName', e.target.value)}
                  className="form-control"
                />
              </div>
            )}
            <div className="mb-3">
              <label>How will you describe yourself?</label>
              <select
                value={formData.investorType}
                onChange={(e) => handleInputChange('investorType', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Micro Investor">Micro Investor</option>
                <option value="Angel Investor">Angel Investor</option>
                <option value="Venture Capital">Venture Capital</option>
                <option value="Strategic Investor">Strategic Investor</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Investor Preferences Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Investor Preferences</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label>What type of startups are you interested in investing in?</label>
              <select
                value={formData.interestedStartups}
                onChange={(e) => handleInputChange('interestedStartups', e.target.value)}
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
              <label>Preferred Stage of Investment</label>
              <select
                value={formData.preferredStage}
                onChange={(e) => handleInputChange('preferredStage', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B">Series B</option>
                <option value="Growth">Growth</option>
                <option value="Late Stage">Late Stage</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Region Preference</label>
              <input
                type="text"
                value={formData.regionPreference}
                onChange={(e) => handleInputChange('regionPreference', e.target.value)}
                className="form-control"
                placeholder="Region or Country"
                required
              />
            </div>
            <div className="mb-3">
              <label>Investment Size</label>
              <input
                type="number"
                value={formData.investmentSize}
                onChange={(e) => handleInputChange('investmentSize', e.target.value)}
                className="form-control"
                placeholder="Amount in USD"
                required
              />
            </div>
            <div className="mb-3">
              <label>Total Budget for Investment</label>
              <input
                type="number"
                value={formData.totalBudget}
                onChange={(e) => handleInputChange('totalBudget', e.target.value)}
                className="form-control"
                placeholder="Total Budget in USD"
                required
              />
            </div>
          </div>
        </div>

        {/* Additional Preferences Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Additional Preferences</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label>Are you open to co-investing?</label>
              <select
                value={formData.coInvesting}
                onChange={(e) => handleInputChange('coInvesting', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Preferred Equity Percentage</label>
              <input
                type="number"
                value={formData.equityPercentage}
                onChange={(e) => handleInputChange('equityPercentage', e.target.value)}
                className="form-control"
                placeholder="Equity Percentage"
                required
              />
            </div>
            <div className="mb-3">
              <label>Investment Type</label>
              <select
                value={formData.investmentType}
                onChange={(e) => handleInputChange('investmentType', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Equity">Equity</option>
                <option value="Debt">Debt</option>
                <option value="Convertible Notes">Convertible Notes</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Level of Involvement</label>
              <select
                value={formData.involvementLevel}
                onChange={(e) => handleInputChange('involvementLevel', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Passive">Passive</option>
                <option value="Active">Active</option>
                <option value="Very Active">Very Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* Experience and Success Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Experience and Success Stories</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label>Previous Investment</label>
              <input
                type="text"
                value={formData.previousInvestment}
                onChange={(e) => handleInputChange('previousInvestment', e.target.value)}
                className="form-control"
                placeholder="Describe previous investments"
                required
              />
            </div>
            <div className="mb-3">
              <label>Investment Experience</label>
              <textarea
                value={formData.investmentExperience}
                onChange={(e) => handleInputChange('investmentExperience', e.target.value)}
                className="form-control"
                rows="3"
                required
              />
            </div>
            <div className="mb-3">
              <label>Number of Startups Invested In</label>
              <input
                type="number"
                value={formData.numberOfStartups}
                onChange={(e) => handleInputChange('numberOfStartups', e.target.value)}
                className="form-control"
                placeholder="Total number of startups"
                required
              />
            </div>
            <div className="mb-3">
              <label>Success Stories</label>
              <textarea
                value={formData.successStories}
                onChange={(e) => handleInputChange('successStories', e.target.value)}
                className="form-control"
                rows="3"
                required
              />
            </div>
          </div>
        </div>

        {/* Decision and Evaluation Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Decision and Evaluation Criteria</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label>Decision Process</label>
              <textarea
                value={formData.decisionProcess}
                onChange={(e) => handleInputChange('decisionProcess', e.target.value)}
                className="form-control"
                rows="3"
                required
              />
            </div>
            <div className="mb-3">
              <label>Evaluation Criteria</label>
              <textarea
                value={formData.evaluationCriteria}
                onChange={(e) => handleInputChange('evaluationCriteria', e.target.value)}
                className="form-control"
                rows="3"
                required
              />
            </div>
            <div className="mb-3">
              <label>Exit Strategy Preference</label>
              <input
                type="text"
                value={formData.exitStrategyPreference}
                onChange={(e) => handleInputChange('exitStrategyPreference', e.target.value)}
                className="form-control"
                placeholder="Exit Strategy"
                required
              />
            </div>
            <div className="mb-3">
              <label>Fundraising Stage</label>
              <select
                value={formData.fundraisingStage}
                onChange={(e) => handleInputChange('fundraisingStage', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B">Series B</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Expected Involvement</label>
              <select
                value={formData.expectedInvolvement}
                onChange={(e) => handleInputChange('expectedInvolvement', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Minimal">Minimal</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary me-2" onClick={handleSkip}>Skip</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
          </div>
        </div>

        {/* Submit Button */}

      </form>
    </div>
  );
};

export default InvestorForm;

