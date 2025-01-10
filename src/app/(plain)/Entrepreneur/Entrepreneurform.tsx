import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Entrepreneurform = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    businessLocationCountry: '',
    businessLocationCity: '',
    businessIdea: '',
    businessStage: '',
    industrySector: '',
    businessDuration: '',
    problemSolving: '',
    traction: '',
    investorType: '',
    fundingAmount: '',
    useOfFunds: '',
    investmentType: '',
    businessValuation: '',
    equityInExchange: '',
    exitPlans: '',
    partnerType: '',
    partnerSkills: '',
    partnerInvolvement: '',
    partnerEquityCompensation: '',
    partnershipStructure: '',
    businessChallenges: '',
    keyPriorities: '',
    supportNeeded: '',
    businessPlanStatus: '',
    milestones: '',
    longTermGoals: '',
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
      fetch('https://app-backend-8r74.onrender.com/entrepreneur/create', {
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
      <h2 className="text-center mb-4">Entrepreneur Form</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Business Information</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="businessName" className="form-label">What is the name of your business?</label>
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
              <label htmlFor="businessLocationCountry" className="form-label">Where is your business located?</label>
              <select
                value={formData.businessLocationCountry}
                onChange={(e) => handleInputChange('businessLocationCountry', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="India">India</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="businessLocationCity" className="form-label">City</label>
              <input
                id="businessLocationCity"
                type="text"
                value={formData.businessLocationCity}
                onChange={(e) => handleInputChange('businessLocationCity', e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="businessIdea" className="form-label">What is your business idea about?</label>
              <textarea
                id="businessIdea"
                value={formData.businessIdea}
                onChange={(e) => handleInputChange('businessIdea', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>What stage is your business currently at?</label>
              <select
                value={formData.businessStage}
                onChange={(e) => handleInputChange('businessStage', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Idea/Concept">Idea/Concept</option>
                <option value="Prototype">Prototype</option>
                <option value="Pre-revenue">Pre-revenue</option>
                <option value="Revenue-generating">Revenue-generating</option>
                <option value="Growth">Growth</option>
                <option value="Scaling">Scaling</option>
              </select>
            </div>
            <div className="mb-3">
              <label>What is the industry/sector of your business?</label>
              <select
                value={formData.industrySector}
                onChange={(e) => handleInputChange('industrySector', e.target.value)}
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
              <label>How long has your business been operating?</label>
              <select
                value={formData.businessDuration}
                onChange={(e) => handleInputChange('businessDuration', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Less than 6 months">Less than 6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2+ years">2+ years</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="problemSolving" className="form-label">What problem does your business solve, and who is your target audience?</label>
              <textarea
                id="problemSolving"
                value={formData.problemSolving}
                onChange={(e) => handleInputChange('problemSolving', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>Do you have any traction?</label>
              <select
                value={formData.traction}
                onChange={(e) => handleInputChange('traction', e.target.value)}
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
            <h5 className="mb-0">Investor Preferences</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label>What type of investor are you looking for?</label>
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
            <div className="mb-3">
              <label>What is the amount of funding you are seeking?</label>
              <select
                value={formData.fundingAmount}
                onChange={(e) => handleInputChange('fundingAmount', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Under $50k">Under $50k</option>
                <option value="$50k - $200k">$50k - $200k</option>
                <option value="$200k - $500k">$200k - $500k</option>
                <option value="$500k - $1M">$500k - $1M</option>
                <option value="Over $1M">Over $1M</option>
              </select>
            </div>
            <div className="mb-3">
              <label>What is the intended use of the investment funds?</label>
              <select
                value={formData.useOfFunds}
                onChange={(e) => handleInputChange('useOfFunds', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Product Development">Product Development</option>
                <option value="Marketing & Sales">Marketing & Sales</option>
                <option value="Hiring">Hiring</option>
                <option value="Scaling Operations">Scaling Operations</option>
                <option value="Technology Infrastructure">Technology Infrastructure</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label>What type of investment are you open to?</label>
              <select
                value={formData.investmentType}
                onChange={(e) => handleInputChange('investmentType', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Equity">Equity</option>
                <option value="Convertible Notes">Convertible Notes</option>
                <option value="SAFE Notes">SAFE Notes</option>
                <option value="Debt">Debt</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="businessValuation" className="form-label">What is the current valuation of your business (if applicable)?</label>
              <input
                id="businessValuation"
                type="text"
                value={formData.businessValuation}
                onChange={(e) => handleInputChange('businessValuation', e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Are you open to giving equity in exchange for investment?</label>
              <select
                value={formData.equityInExchange}
                onChange={(e) => handleInputChange('equityInExchange', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Negotiable">Negotiable</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exitPlans" className="form-label">What are your exit plans or expected timeline for exit?</label>
              <textarea
                id="exitPlans"
                value={formData.exitPlans}
                onChange={(e) => handleInputChange('exitPlans', e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Business Partner Preferences</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label>What type of business partners are you looking for?</label>
              <select
                value={formData.partnerType}
                onChange={(e) => handleInputChange('partnerType', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Co-founder">Co-founder</option>
                <option value="Strategic Partner">Strategic Partner</option>
                <option value="Technical Co-founder">Technical Co-founder</option>
                <option value="Sales/Marketing Expert">Sales/Marketing Expert</option>
                <option value="Operations Expert">Operations Expert</option>
                <option value="Mentor">Mentor</option>
                <option value="Advisor">Advisor</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="partnerSkills" className="form-label">What specific expertise or skills are you seeking in a business partner?</label>
              <textarea
                id="partnerSkills"
                value={formData.partnerSkills}
                onChange={(e) => handleInputChange('partnerSkills', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>What is the desired level of involvement from a business partner?</label>
              <select
                value={formData.partnerInvolvement}
                onChange={(e) => handleInputChange('partnerInvolvement', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Advisory">Advisory</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Are you open to partners who are willing to work in exchange for equity or other non-cash compensation?</label>
              <select
                value={formData.partnerEquityCompensation}
                onChange={(e) => handleInputChange('partnerEquityCompensation', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Negotiable">Negotiable</option>
              </select>
            </div>
            <div className="mb-3">
              <label>What type of partnership structure are you looking for?</label>
              <select
                value={formData.partnershipStructure}
                onChange={(e) => handleInputChange('partnershipStructure', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Co-founder">Co-founder</option>
                <option value="Equity-based Partnership">Equity-based Partnership</option>
                <option value="Joint Venture">Joint Venture</option>
                <option value="Advisory Role">Advisory Role</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Business Needs & Goals</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="businessChallenges" className="form-label">What are the biggest challenges your business is currently facing?</label>
              <textarea
                id="businessChallenges"
                value={formData.businessChallenges}
                onChange={(e) => handleInputChange('businessChallenges', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="keyPriorities" className="form-label">What are your key priorities over the next 6-12 months?</label>
              <textarea
                id="keyPriorities"
                value={formData.keyPriorities}
                onChange={(e) => handleInputChange('keyPriorities', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="supportNeeded" className="form-label">What specific support are you looking for from an investor or business partner?</label>
              <textarea
                id="supportNeeded"
                value={formData.supportNeeded}
                onChange={(e) => handleInputChange('supportNeeded', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>Do you have a clear business plan or roadmap for growth?</label>
              <select
                value={formData.businessPlanStatus}
                onChange={(e) => handleInputChange('businessPlanStatus', e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="In progress">In progress</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="milestones" className="form-label">What milestones do you plan to achieve in the next 6 months?</label>
              <textarea
                id="milestones"
                value={formData.milestones}
                onChange={(e) => handleInputChange('milestones', e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Additional Information</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="longTermGoals" className="form-label">What are your long-term goals for the business?</label>
              <textarea
                id="longTermGoals"
                value={formData.longTermGoals}
                onChange={(e) => handleInputChange('longTermGoals', e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="additionalInfo" className="form-label">Is there anything else a potential investor or partner should know about you or your business?</label>
              <textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-secondary me-2" onClick={handleSkip}>Skip</button>
          
        </div>
      </form>
    </div>
  );
};

export default Entrepreneurform;
