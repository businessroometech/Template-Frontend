
// BusinessSellerForm

/*
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
      fetch('http://3.101.12.130:5000/businessseller/create', {
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
        
        {/* Business Information }
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

        {/* Financial Information }
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

        {/* Operational Details }
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

        {/* Employee & Structure Information }
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

        {/* Legal Information }
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

        {/* Final Details }
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

        {/* Navigation Buttons }
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

*/
















import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card  , ButtonGroup} from 'react-bootstrap';
import { FaRegLightbulb, FaInfoCircle, FaBusinessTime, FaMoneyBillWave, FaHandshake, FaChartLine, FaClipboardList, FaUser, FaBuilding, FaIndustry, FaMapMarkerAlt, FaDollarSign, FaUsers, FaPercentage, FaQuestionCircle, FaBriefcase, FaFileAlt, FaTrophy, FaGavel, FaCalendarAlt,  } from 'react-icons/fa';
import axios from 'axios';
import { useContext } from 'react';
import { useAuthContext } from '@/context/useAuthContext';
import {ToastContainer , toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const BusinessSellerForm = () => {

  const { user} = useAuthContext();
  console.log("userid",user?.id)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
   // businessLogo: '',
  });
  const [ UserId , setUserId] = useState('')

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
    if (name === 'businessLogo') {
      const file = value.target.files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      // Create a preview URL for the image
      const imagePreviewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [`${name}Preview`]: imagePreviewUrl,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert formData to a regular object
    const dataToSend = {
      ...formData,
      UserId: user?.id
    };
  
    try {
<<<<<<< HEAD
      const response = await fetch('http://3.101.12.130:5000/businessseller/create', {
=======
      const response = await fetch(' http://3.101.12.130:5000/businessseller/create', {
>>>>>>> 7d9ec97401d26272f87bfe23684872e8d5978c8a
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'UserId': user?.id
        },
        body: JSON.stringify(dataToSend), // Convert data to JSON string
      
      });
      console.log("data to send" ,dataToSend)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const responseData = await response.json(); // Parse JSON response
      console.log("Response:", responseData);
      toast.success("Form submitted successfully!");
      navigate('/');
    } catch (error) {
      console.error("Error details:", error.response || error);
      toast.error("There was an error submitting the form.");
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
              {field.name === 'businessLogo' ? (
                <>
                  <input
                    id={field.id}
                    type="file"
                    onChange={(e) => handleInputChange(field.name, e)}
                    className="form-control"
                    required={field.required}
                  />
                  {formData.businessLogoPreview && (
                    <div className="mt-3">
                      <img src={formData.businessLogoPreview} alt="Business Logo Preview" className="img-thumbnail" />
                    </div>
                  )}
                </>
              ) : field.type === 'textarea' ? (
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
       //   { id: 'sellerName', label: 'Your Name', name: 'sellerName', icon: <FaUser />, required: true },
          { id: 'businessName', label: 'Business Name', name: 'businessName', icon: <FaBuilding />, required: true },
          { id: 'businessType', label: 'Business Type', name: 'businessType', icon: <FaIndustry />, inputType: 'select', required: true, options: ['Sole Proprietorship', 'Partnership', 'LLC', 'Corporation', 'Other'] }
        ]);
      case 1:
        return renderFormFields([
          { id: 'businessStage', label: 'Business Stage', name: 'businessStage', icon: <FaBriefcase />, inputType: 'select', required: true, options: ['Startup', 'Growth', 'Mature', 'Declining'] },
          { id: 'industry', label: 'Industry', name: 'industry', icon: <FaIndustry />, required: true },
          { id: 'location', label: 'Location of Business', name: 'location', icon: <FaMapMarkerAlt />, required: true },
          { id: 'businessLogo', label: 'Upload Business Logo', name: 'businessLogo', icon: <FaBuilding />, inputType: 'file' }
        
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
      <h2 className="text-start mb-4">Business Seller Form</h2>

      <div className="d-flex justify-content-center mb-4">
  {sections.map((section, index) => (
    <button
      key={index}
      type="button"
      className="btn mx-2"
      style={{
        backgroundColor: step === index ? '#1ea1f2' : 'transparent',
        borderColor: '#1ea1f2',
        color: step === index ? 'white' : '#1ea1f2'
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

export default BusinessSellerForm;

