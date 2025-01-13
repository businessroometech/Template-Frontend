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
















/*


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
      fetch('https://app-backend-8r74.onrender.com/investor/create', {
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

        {/* Investor Identity Section }
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

        {/* Investor Preferences Section }
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

        {/* Additional Preferences Section }
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

        {/* Experience and Success Section }
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

        {/* Decision and Evaluation Section }
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

        {/* Submit Button }

      </form>
    </div>
  );
};

export default InvestorForm;

*/

import { useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { FaBalanceScale, FaCalendarAlt, FaExchangeAlt, FaListAlt, FaMapMarkerAlt, FaMoneyCheckAlt, FaTasks } from 'react-icons/fa';
import { FaBullhorn, FaBullseye, FaCertificate, FaChartLine, FaDollarSign, FaHandshake, FaHeadset, FaHourglassHalf, FaIndustry, FaMedal, FaRegHandPointUp, FaRocket, FaTag, FaUser, FaUsers, FaUserTie, FaWallet } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useAuthContext } from '@/context/useAuthContext';


const InvestorForm = () => {

  const { user } = useAuthContext();
  console.log(user?.id)


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    investorName: '',
    isAccredited: '',
    groupName: '',
    investorType: '',
    interestedStartups: '',
    preferredStage: [],
    regionPreference: '',
    investmentSize: '',
    totalBudget: '',
    coInvesting: '',
    equityPercentage: '',
    investmentType: '',
    returnExpectations: '',
    involvementLevel: '',
    additionalSupport: '',
    decisionProcess: '',
    evaluationCriteria: [],
    exitStrategyPreference: ''
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
      fetch('https://app-backend-8r74.onrender.com/investor/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData , user?.id) 
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
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="fs-4">
          <FaUserTie className="me-2" style={{ color: "" }} />
          Investor Identity
        </h5>
      </Card.Header>
      <Card.Body>
        <Form>
          {/* Accreditation Group */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="isAccredited">
              <Form.Label className="fs-5">
                <FaCertificate className="me-2" style={{ color: "#757885" }} />
                Are you a member of any accreditation group?
              </Form.Label>
              <Form.Select
                value={formData.isAccredited}
                onChange={(e) => handleInputChange("isAccredited", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Group Name */}
          {formData.isAccredited === "Yes" && (
            <Row className="mb-3">
              <Form.Group as={Col} controlId="groupName">
                <Form.Label className="fs-5">
                  <FaUsers className="me-2" style={{ color: "#757885" }} />
                  Name of group(s)
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.groupName}
                  onChange={(e) => handleInputChange("groupName", e.target.value)}
                  placeholder="Enter group name"
                />
              </Form.Group>
            </Row>
          )}

          {/* Investor Type */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="investorType">
              <Form.Label className="fs-5">
                <FaTag className="me-2" style={{ color: "#757885" }} />
                How will you describe yourself?
              </Form.Label>
              <Form.Select
                value={formData.investorType}
                onChange={(e) => handleInputChange("investorType", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Micro Investor">Micro Investor</option>
                <option value="Angel Investor">Angel Investor</option>
                <option value="Venture Capital">Venture Capital</option>
                <option value="Strategic Investor">Strategic Investor</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="startupType">
              <Form.Label className="fs-5">
                <FaRocket className="me-2" style={{ color: "#757885" }} />
                What type of startups are you interested in investing in?
              </Form.Label>
              <Form.Select
                value={formData.startupType}
                onChange={(e) => handleInputChange("startupType", e.target.value)}
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
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="startupStage">
              <Form.Label className="fs-5">
                <FaCalendarAlt className="me-2" style={{ color: "#757885" }} />
                What is your preferred stage of startup to invest in?
              </Form.Label>
              <Form.Select
                value={formData.startupStage}
                onChange={(e) => handleInputChange("startupStage", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Seed Stage">Seed Stage</option>
                <option value="Early Stage">Early Stage</option>
                <option value="Growth Stage">Growth Stage</option>
                <option value="Mature Stage">Mature Stage</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="regionPreference">
              <Form.Label className="fs-5">
                <FaMapMarkerAlt className="me-2" style={{ color: "#757885" }} />
                Do you prefer investing in startups based in a specific region or country?
              </Form.Label>
              <Form.Control
                type="text"
                value={formData.regionPreference}
                onChange={(e) => handleInputChange("regionPreference", e.target.value)}
                placeholder="Enter your preferred region or country"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="investmentSize">
              <Form.Label className="fs-5">
                <FaMoneyCheckAlt className="me-2" style={{ color: "#757885" }} />
                What is your preferred investment size per startup?
              </Form.Label>
              <Form.Select
                value={formData.investmentSize}
                onChange={(e) => handleInputChange("investmentSize", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Under $50k">Under $50k</option>
                <option value="$50k - $200k">$50k - $200k</option>
                <option value="$200k - $500k">$200k - $500k</option>
                <option value="$500k - $1M">$500k - $1M</option>
                <option value="Over $1M">Over $1M</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="totalBudget">
              <Form.Label className="fs-5">
                <FaWallet className="me-2" style={{ color: "#757885" }} />
                What is your total budget or available capital for investing in startups?
              </Form.Label>
              <Form.Control
                type="text"
                value={formData.totalBudget}
                onChange={(e) => handleInputChange("totalBudget", e.target.value)}
                placeholder="Enter your total budget"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="coInvesting">
              <Form.Label className="fs-5">
                <FaHandshake className="me-2" style={{ color: "#757885" }} />
                Are you open to co-investing with other investors or firms?
              </Form.Label>
              <Form.Select
                value={formData.coInvesting}
                onChange={(e) => handleInputChange("coInvesting", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="equityWillingness">
              <Form.Label className="fs-5">
                <FaBalanceScale className="me-2" style={{ color: "#757885" }} />
                What percentage of equity are you willing to take in exchange for your investment?
              </Form.Label>
              <Form.Select
                value={formData.equityWillingness}
                onChange={(e) => handleInputChange("equityWillingness", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="0-10%">0-10%</option>
                <option value="10-20%">10-20%</option>
                <option value="20-30%">20-30%</option>
                <option value="30-40%">30-40%</option>
                <option value="40-50%">40-50%</option>
                <option value="50%+">50%+</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
      case 2:
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="fs-4">
          <FaWallet className="me-2" style={{ color: "#757885" }} />
          Investment Strategy
        </h5>
      </Card.Header>
      <Card.Body>
        <Form>
          {/* Investment Type */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="investmentType">
              <Form.Label className="fs-5">
                <FaTag className="me-2" style={{ color: "#757885" }} />
                What type of investment do you prefer?
              </Form.Label>
              <Form.Select
                value={formData.investmentType}
                onChange={(e) => handleInputChange("investmentType", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Equity">Equity</option>
                <option value="Convertible Notes">Convertible Notes</option>
                <option value="SAFE Notes">SAFE Notes</option>
                <option value="Debt">Debt</option>
                <option value="Revenue Share">Revenue Share</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Involvement Level */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="investmentInvolvement">
              <Form.Label className="fs-5">
                <FaUsers className="me-2" style={{ color: "#757885" }} />
                What involvement level are you comfortable with in the startup post-investment?
              </Form.Label>
              <Form.Select
                value={formData.investmentInvolvement}
                onChange={(e) => handleInputChange("investmentInvolvement", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Active (Advisory/Board)">Active (Advisory/Board)</option>
                <option value="Passive">Passive</option>
                <option value="Both">Both</option>
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Additional Support */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="additionalSupport">
              <Form.Label className="fs-5">
                <FaHeadset className="me-2" style={{ color: "#757885" }} />
                Are you interested in providing additional support to startups (e.g., mentorship, networking, expertise)?
              </Form.Label>
              <Form.Select
                value={formData.additionalSupport}
                onChange={(e) => handleInputChange("additionalSupport", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
      case 3:
    return (
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h5 className="fs-4">
            <FaChartLine className="me-2" style={{ color: "#757885" }} />
            Investment Experience
          </h5>
        </Card.Header>
        <Card.Body>
          <Form>
            {/* Previous Investment */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="previousInvestment">
                <Form.Label className="fs-5">
                  <FaDollarSign className="me-2" style={{ color: "#757885" }} />
                  Have you previously invested in startups?
                </Form.Label>
                <Form.Select
                  value={formData.previousInvestment}
                  onChange={(e) => handleInputChange("previousInvestment", e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </Form.Group>
            </Row>
  
            {/* Years of Investment Experience */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="investmentExperience">
                <Form.Label className="fs-5">
                  <FaHourglassHalf className="me-2" style={{ color: "#757885" }} />
                  How many years of investment experience do you have?
                </Form.Label>
                <Form.Select
                  value={formData.investmentExperience}
                  onChange={(e) => handleInputChange("investmentExperience", e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="0-2 years">0-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="6-10 years">6-10 years</option>
                  <option value="10+ years">10+ years</option>
                </Form.Select>
              </Form.Group>
            </Row>
  
            {/* Total Number of Startups Invested In */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="startupsInvested">
                <Form.Label className="fs-5">
                  <FaListAlt className="me-2" style={{ color: "#757885" }} />
                  What is the total number of startups you have invested in?
                </Form.Label>
                <Form.Control
                  type="number"
                  value={formData.startupsInvested}
                  onChange={(e) => handleInputChange("startupsInvested", e.target.value)}
                  placeholder="Enter total number"
                />
              </Form.Group>
            </Row>
  
            {/* Success Stories */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="successStories">
                <Form.Label className="fs-5">
                  <FaMedal className="me-2" style={{ color: "#757885" }} />
                  Do you have any specific success stories or notable investments?
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.successStories}
                  onChange={(e) => handleInputChange("successStories", e.target.value)}
                  placeholder="Describe your success stories"
                />
              </Form.Group>
            </Row>
  
            {/* Decision-Making Process */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="decisionMakingProcess">
                <Form.Label className="fs-5">
                  <FaBullseye className="me-2" style={{ color: "#757885" }} />
                  What is your typical investment decision-making process (e.g., individual, committee, team)?
                </Form.Label>
                <Form.Select
                  value={formData.decisionMakingProcess}
                  onChange={(e) => handleInputChange("decisionMakingProcess", e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Individual">Individual</option>
                  <option value="Committee">Committee</option>
                  <option value="Team">Team</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    );
      case 4:
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="fs-4">
          <FaChartLine className="me-2" style={{ color: "#757885" }} />
          Startup Requirements
        </h5>
      </Card.Header>
      <Card.Body>
        <Form>
          {/* Key Criteria */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="startupCriteria">
              <Form.Label className="fs-5">
                <FaListAlt className="me-2" style={{ color: "#757885" }} />
                What are your key criteria for evaluating a startup to invest in?
              </Form.Label>
              <Form.Check
                type="checkbox"
                label="Strong Leadership Team"
                value="Strong Leadership Team"
                onChange={(e) => handleInputChange("startupCriteria", e.target.value)}
                className="fs-6"
              />
              <Form.Check
                type="checkbox"
                label="Scalable Business Model"
                value="Scalable Business Model"
                onChange={(e) => handleInputChange("startupCriteria", e.target.value)}
                className="fs-6"
              />
              <Form.Check
                type="checkbox"
                label="Market Demand"
                value="Market Demand"
                onChange={(e) => handleInputChange("startupCriteria", e.target.value)}
                className="fs-6"
              />
              <Form.Check
                type="checkbox"
                label="Innovation"
                value="Innovation"
                onChange={(e) => handleInputChange("startupCriteria", e.target.value)}
                className="fs-6"
              />
              <Form.Check
                type="checkbox"
                label="Traction (Users/Revenue)"
                value="Traction (Users/Revenue)"
                onChange={(e) => handleInputChange("startupCriteria", e.target.value)}
                className="fs-6"
              />
              <Form.Check
                type="checkbox"
                label="Exit Potential"
                value="Exit Potential"
                onChange={(e) => handleInputChange("startupCriteria", e.target.value)}
                className="fs-6"
              />
              <Form.Check
                type="checkbox"
                label="Other"
                value="Other"
                onChange={(e) => handleInputChange("startupCriteria", e.target.value)}
                className="fs-6"
              />
            </Form.Group>
          </Row>

          {/* Exit Strategy Preference */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="exitStrategy">
              <Form.Label className="fs-5">
                <FaExchangeAlt className="me-2" style={{ color: "#757885" }} />
                Do you prefer investing in startups with an exit strategy (e.g., IPO, acquisition) already defined?
              </Form.Label>
              <Form.Select
                value={formData.exitStrategy}
                onChange={(e) => handleInputChange("exitStrategy", e.target.value)}
                required
                className="fs-6"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Stage of Fundraising Preference */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="fundraisingStage">
              <Form.Label className="fs-5">
                <FaRegHandPointUp className="me-2" style={{ color: "#757885" }} />
                Do you have any preference regarding the startup’s current stage of fundraising (e.g., pre-seed, seed, series A, etc.)?
              </Form.Label>
              <Form.Select
                value={formData.fundraisingStage}
                onChange={(e) => handleInputChange("fundraisingStage", e.target.value)}
                required
                className="fs-6"
              >
                <option value="">Select</option>
                <option value="Pre-seed">Pre-seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B+">Series B+</option>
                <option value="Any stage">Any stage</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
      case 5:
        return (
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="fs-4">
                <FaChartLine className="me-2" style={{ color: "#757885" }} />
                Startup Requirements
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                {/* Expected Involvement */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="investmentGoals">
                    <Form.Label className="fs-5">
                      <FaBullseye className="me-2" style={{ color: "#757885" }} />
                      What is your expected involvement with the startup after the investment?
                    </Form.Label>
                    <Form.Select
                      value={formData.investmentGoals}
                      onChange={(e) => handleInputChange("investmentGoals", e.target.value)}
                      required
                      className="fs-6"
                    >
                      <option value="">Select</option>
                      <option value="Board Position">Board Position</option>
                      <option value="Advisory Role">Advisory Role</option>
                      <option value="Passive Role">Passive Role</option>
                      <option value="Not Involved">Not Involved</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        );
      default:
        return null;
    }
  };

  const stepTitles = [
    'Investment Preferences',
    'Investor Strategy',
    'Investment Experience',
    'Startup Requirements',
    'Investment Goal'
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-start mb-4" style={{ marginRight: '20px' }}>Investor  Form</h2>

      {/* Step navigation links */}
      <div className="d-flex justify-content-center mb-4">
        {stepTitles.map((title, index) => (
          <button
            key={index}
            type="button"
            className={`btn mx-2 ${step === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setStep(index + 1)}
          >
            {title}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        {renderStep()}

        <div className="d-flex justify-content-between mt-4">
  <div>
    <button type="button" className="btn btn-danger" onClick={handleSkip}>
      Skip
    </button>
  </div>
  
  <div>
    {step > 1 && (
      <button type="button" className="btn btn-secondary" onClick={prevStep}>
        Previous
      </button>
    )}
    {step < 5 && (
      <button type="button" className="btn btn-primary" onClick={nextStep}>
        Next
      </button>
    )}
    {step === 5 && (
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    )}
  </div>
</div>

      </form>
    </div>
  );
};

export default InvestorForm;









