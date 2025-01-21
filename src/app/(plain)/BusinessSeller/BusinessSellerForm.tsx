
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
















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card  , ButtonGroup} from 'react-bootstrap';
// import { FaRegLightbulb, FaInfoCircle, FaBusinessTime, FaMoneyBillWave, FaHandshake, FaChartLine, FaClipboardList, FaUser, FaBuilding, FaIndustry, FaMapMarkerAlt, FaDollarSign, FaUsers, FaPercentage, FaQuestionCircle, FaBriefcase, FaFileAlt, FaTrophy, FaGavel, FaCalendarAlt,  } from 'react-icons/fa';
// import axios from 'axios';
// import { useContext } from 'react';
// import { useAuthContext } from '@/context/useAuthContext';
// import {ToastContainer , toast} from "react-toastify"
// import 'react-toastify/dist/ReactToastify.css';


// const BusinessSellerForm = () => {

//   const { user} = useAuthContext();
//   console.log("userid",user?.id)
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     businessName: '',
//     businessType: '',
//     businessStage: '',
//     industry: '',
//     location: '',
//     revenue: '',
//     profit: '',
//     numberOfEmployees: '',
//     ownershipPercentage: '',
//     reasonForSelling: '',
//     askingPrice: '',
//     intellectualProperty: '',
//     assetsForSale: '',
//     liabilities: '',
//     financialHistory: '',
//     salesForecast: '',
//     marketingStrategy: '',
//     competition: '',
//     exitStrategy: '',
//     legalIssues: '',
//     expectedTimeline: '',
//     additionalInformation: '',
//    // businessLogo: '',
//   });
//   const [ UserId , setUserId] = useState('')

//   const [step, setStep] = useState(0);
//   const sections = [
//     { title: "Seller Information", icon: <FaInfoCircle /> },
//     { title: "Business Details", icon: <FaBusinessTime /> },
//     { title: "Financial Information", icon: <FaMoneyBillWave /> },
//     { title: "Ownership & Sale Information", icon: <FaHandshake /> },
//     { title: "Additional Business Details", icon: <FaChartLine /> },
//     { title: "Final Business Information", icon: <FaClipboardList /> },
//   ];

//   const handleInputChange = (name, value) => {
//     if (name === 'businessLogo') {
//       const file = value.target.files[0];
//       setFormData((prev) => ({
//         ...prev,
//         [name]: file,
//       }));
//       // Create a preview URL for the image
//       const imagePreviewUrl = URL.createObjectURL(file);
//       setFormData((prev) => ({
//         ...prev,
//         [`${name}Preview`]: imagePreviewUrl,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Convert formData to a regular object
//     const dataToSend = {
//       ...formData,
//       UserId: user?.id
//     };
  
//     try {
//       const response = await fetch(' http://3.101.12.130:5000/businessseller/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'UserId': user?.id
//         },
//         body: JSON.stringify(dataToSend), // Convert data to JSON string
      
//       });
//       console.log("data to send" ,dataToSend)
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
    
//       const responseData = await response.json(); // Parse JSON response
//       console.log("Response:", responseData);
//       toast.success("Form submitted successfully!");
//       navigate('/');
//     } catch (error) {
//       console.error("Error details:", error.response || error);
//       toast.error("There was an error submitting the form.");
//     }
//   };
  




//   const handleSkip = () => {
//     navigate('/');
//   };

//   const setCurrentSection = (index) => {
//     setStep(index);
//   };

//   const renderStep = () => {
//     const renderFormFields = (fields) => (
//       <Card className="mb-4 shadow-sm">
//         <Card.Header className="bg-transparent text-white">
//           <h5 className="fs-4">
//             {sections[step].icon} {sections[step].title}
//           </h5>
//         </Card.Header>
//         <Card.Body>
//           <ToastContainer />
//           {fields.map((field, index) => (
//             <div className="mb-3" key={index}>
//               <label htmlFor={field.id} className="form-label">
//                 {field.icon} {field.label}
//               </label>
//               {field.name === 'businessLogo' ? (
//                 <>
//                   <input
//                     id={field.id}
//                     type="file"
//                     onChange={(e) => handleInputChange(field.name, e)}
//                     className="form-control"
//                     required={field.required}
//                   />
//                   {formData.businessLogoPreview && (
//                     <div className="mt-3">
//                       <img src={formData.businessLogoPreview} alt="Business Logo Preview" className="img-thumbnail" />
//                     </div>
//                   )}
//                 </>
//               ) : field.type === 'textarea' ? (
//                 <textarea
//                   id={field.id}
//                   value={formData[field.name]}
//                   onChange={(e) => handleInputChange(field.name, e.target.value)}
//                   className="form-control"
//                   rows={field.rows || 3}
//                   required={field.required}
//                 />
//               ) : (
//                 <input
//                   id={field.id}
//                   type={field.inputType || 'text'}
//                   value={formData[field.name]}
//                   onChange={(e) => handleInputChange(field.name, e.target.value)}
//                   className="form-control"
//                   placeholder={field.placeholder || ''}
//                   required={field.required}
//                 />
//               )}
//             </div>
//           ))}
//         </Card.Body>
//       </Card>
//     );
  
//     switch (step) {
//       case 0:
//         return renderFormFields([
//        //   { id: 'sellerName', label: 'Your Name', name: 'sellerName', icon: <FaUser />, required: true },
//           { id: 'businessName', label: 'Business Name', name: 'businessName', icon: <FaBuilding />, required: true },
//           { id: 'businesslocation', label: 'Business Location', name: 'businesslocation', icon: <FaIndustry />, inputType: 'select', required: true, options: ['Sole Proprietorship', 'Partnership', 'LLC', 'Corporation', 'Other'] }
//         ]);
//       case 1:
//         return renderFormFields([
//           { id: 'businessyouareSelling', label: 'What type of business are you selling', name: 'businessyouareSelling', icon: <FaBriefcase />, inputType: 'select', required: true, options: ['Startup', 'Growth', 'Mature', 'Declining'] },
//           { id: 'industry', label: 'Industry', name: 'industry', icon: <FaIndustry />, required: true },
//           { id: 'location', label: 'Location of Business', name: 'location', icon: <FaMapMarkerAlt />, required: true },
//           { id: 'businessLogo', label: 'Upload Business Logo', name: 'businessLogo', icon: <FaBuilding />, inputType: 'file' }
        
//         ]);
//       case 2:
//         return renderFormFields([
//           { id: 'revenue', label: 'Annual Revenue', name: 'revenue', icon: <FaDollarSign />, placeholder: 'Annual Revenue', required: true },
//           { id: 'profit', label: 'Annual Profit', name: 'profit', icon: <FaDollarSign />, placeholder: 'Annual Profit' },
//           { id: 'numberOfEmployees', label: 'Number of Employees', name: 'numberOfEmployees', icon: <FaUsers />, inputType: 'number', required: true }
//         ]);
//       case 3:
//         return renderFormFields([
//           { id: 'ownershipPercentage', label: 'Ownership Percentage Available for Sale', name: 'ownershipPercentage', icon: <FaPercentage />, placeholder: 'Ownership Percentage', required: true },
//           { id: 'reasonForSelling', label: 'Reason for Selling the Business', name: 'reasonForSelling', icon: <FaQuestionCircle />, required: true },
//           { id: 'askingPrice', label: 'Asking Price', name: 'askingPrice', icon: <FaDollarSign />, required: true }
//         ]);
//       case 4:
//         return renderFormFields([
//           { id: 'intellectualProperty', label: 'Intellectual Property (Patents, Trademarks, etc.)', name: 'intellectualProperty', icon: <FaFileAlt />, placeholder: 'Intellectual Property Details' },
//           { id: 'assetsForSale', label: 'Assets for Sale', name: 'assetsForSale', icon: <FaFileAlt />, placeholder: 'Assets' },
//           { id: 'liabilities', label: 'Liabilities', name: 'liabilities', icon: <FaFileAlt />, placeholder: 'Liabilities' }
//         ]);
//       case 5:
//         return renderFormFields([
//           { id: 'financialHistory', label: 'Business\'s Financial History', name: 'financialHistory', icon: <FaFileAlt />, type: 'textarea', required: true },
//           { id: 'salesForecast', label: 'Sales Forecast for the Next Year', name: 'salesForecast', icon: <FaChartLine />, placeholder: 'Sales Forecast' },
//           { id: 'exitStrategy', label: 'Exit Strategy', name: 'exitStrategy', icon: <FaTrophy />, placeholder: 'Exit Strategy', required: true },
//           { id: 'legalIssues', label: 'Legal Issues (if any)', name: 'legalIssues', icon: <FaGavel />, placeholder: 'Legal Issues' },
//           { id: 'expectedTimeline', label: 'Expected Timeline for Sale', name: 'expectedTimeline', icon: <FaCalendarAlt />, placeholder: 'Expected Timeline' },
//           { id: 'additionalInformation', label: 'Additional Information', name: 'additionalInformation', icon: <FaClipboardList />, type: 'textarea' }
//         ]);
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-start mb-4">Business Seller Form</h2>

//       <div className="d-flex justify-content-center mb-4">
//   {sections.map((section, index) => (
//     <button
//       key={index}
//       type="button"
//       className="btn mx-2"
//       style={{
//         backgroundColor: step === index ? '#1ea1f2' : 'transparent',
//         borderColor: '#1ea1f2',
//         color: step === index ? 'white' : '#1ea1f2'
//       }}
//       onClick={() => setCurrentSection(index)}
//     >
//       {section.icon} {section.title}
//     </button>
//   ))}
// </div>
//       <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//         {renderStep()}
//         <div className="d-flex justify-content-between mt-4">
//         <button type="button" className="btn btn-secondary btn-danger" onClick={handleSkip}>Skip</button>
//          <ButtonGroup>
//           {step > 0 && <button type="button" className="btn btn-secondary" onClick={() => setStep(step - 1)}>Previous</button>}
//           {step < sections.length - 1 && <button type="button" className="btn btn-primary" onClick={() => setStep(step + 1)}>Next</button>}
          
//           {step === sections.length - 1 && <button type="submit" className="btn btn-primary">Submit</button>}
//           </ButtonGroup>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BusinessSellerForm;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, ButtonGroup } from 'react-bootstrap';
import { 
  FaRegLightbulb, FaInfoCircle, FaBusinessTime, FaMoneyBillWave, 
  FaHandshake, FaChartLine, FaClipboardList, FaUser, FaBuilding, 
  FaIndustry, FaMapMarkerAlt, FaDollarSign, FaUsers, FaPercentage, 
  FaQuestionCircle, FaBriefcase, FaFileAlt, FaTrophy, FaGavel, 
  FaCalendarAlt 
} from 'react-icons/fa';
import { useAuthContext } from '@/context/useAuthContext';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BusinessSellerForm = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Basic Information
    businessName: '',
    businessLocation: '',
    
    // Business Overview
    businessType: '',
    operatingYears: '',
    businessDescription: '',
    businessLogo: '',
    businessModel: '',
    reasonForSelling: '',
    customerBaseType: '',
    
    // Financial Information
    askingPrice: '',
    annualRevenue: '',
    annualProfit: '',
    assetValue: '',
    hasDebts: '',
    isProfitable: '',
    
    // Business Details
    productsServices: '',
    numberOfEmployees: '',
    businessStructure: '',
    propertyStatus: '',
    leaseTerm: '',
    hasIntellectualProperty: '',
    hasContracts: '',
    hasLegalIssues: '',
    
    // Business Operations
    ownershipStructure: '',
    operationSystems: '',
    offerTraining: '',
    
    // Valuation and Sale Process
    hasValuation: '',
    desiredTimeline: '',
    sellerFinancing: '',
    
    // Additional Information
    keySellingPoints: '',
    additionalInformation: ''
  });

  const [step, setStep] = useState(0);

  const sections = [
    { title: "Basic Information", icon: <FaInfoCircle /> },
    { title: "Business Overview", icon: <FaBusinessTime /> },
    { title: "Financial Information", icon: <FaMoneyBillWave /> },
    { title: "Business Details", icon: <FaClipboardList /> },
    { title: "Business Operations", icon: <FaHandshake /> },
    { title: "Valuation & Sale", icon: <FaChartLine /> },
    { title: "Additional Information", icon: <FaRegLightbulb /> }
  ];

  const handleInputChange = (name, value) => {
    if (name === 'businessLogo') {
      const file = value.target.files[0];
      const imagePreviewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        [name]: file,
        [`${name}Preview`]: imagePreviewUrl
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSend = {
      ...formData,
      UserId: user?.id
    };

    try {
      const response = await fetch('https://strengthholdings.com/businessseller/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'UserId': user?.id
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      toast.success("Form submitted successfully!");
      navigate('/');
    } catch (error) {
      console.error("Error details:", error);
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
    const formSections = {
      0: [ // Basic Information
        { id: 'businessName', name: 'businessName', label: 'Business Name', icon: <FaBuilding />, required: true },
        { id: 'businessLocation', name: 'businessLocation', label: 'Business Location', icon: <FaMapMarkerAlt />, required: true }
      ],
      1: [ // Business Overview
        { id: 'businessType', name: 'businessType', label: 'What type of business are you selling?', icon: <FaBriefcase />, type: 'select', options: ['SaaS', 'Content', 'Marketplace', 'Agency', 'Mobile App', 'Shopify App', 'Main Street', 'Ecommerce', 'Other'], required: true },
        { id: 'operatingYears', name: 'operatingYears', label: 'How long has the business been operating?', icon: <FaCalendarAlt />, type: 'select', options: ['Less than 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'], required: true },
        { id: 'businessDescription', name: 'businessDescription', label: 'Describe your business', icon: <FaFileAlt />, type: 'textarea', required: true },
        { id: 'businessLogo', name: 'businessLogo', label: 'Upload business logo', icon: <FaBuilding />, type: 'file' },
        { id: 'businessModel', name: 'businessModel', label: 'What is the primary business model?', icon: <FaChartLine />, type: 'select', options: ['Independent', 'Franchise', 'Online', 'Hybrid'], required: true },
        { id: 'reasonForSelling', name: 'reasonForSelling', label: 'What is the reason for selling the business?', icon: <FaQuestionCircle />, type: 'select', options: ['Retirement', 'New Opportunity', 'Health Issues', 'Lack of Time', 'Financial Struggles', 'Other'], required: true },
        { id: 'customerBaseType', name: 'customerBaseType', label: 'What is the type of customer base?', icon: <FaUsers />, type: 'select', options: ['B2B', 'B2C', 'Both'], required: true }
      ],
      2: [ // Financial Information
        { id: 'askingPrice', name: 'askingPrice', label: 'What is the asking price for the business?', icon: <FaDollarSign />, inputType: 'number', required: true },
        { id: 'annualRevenue', name: 'annualRevenue', label: 'What is the approximate annual revenue (TTM)?', icon: <FaDollarSign />, inputType: 'number', required: true },
        { id: 'annualProfit', name: 'annualProfit', label: 'What is the approximate annual profit (TTM)?', icon: <FaDollarSign />, inputType: 'number', required: true },
        { id: 'assetValue', name: 'assetValue', label: 'What is the value of business assets?', icon: <FaDollarSign />, inputType: 'number', required: true },
        { id: 'hasDebts', name: 'hasDebts', label: 'Does the business have any outstanding debts or liabilities?', icon: <FaMoneyBillWave />, type: 'select', options: ['Yes', 'No'], required: true },
        { id: 'isProfitable', name: 'isProfitable', label: 'Is the business currently profitable?', icon: <FaChartLine />, type: 'select', options: ['Yes', 'No', 'Break-even'], required: true }
      ],
      3: [ // Business Details
        { id: 'productsServices', name: 'productsServices', label: 'What are the key products or services offered?', icon: <FaClipboardList />, type: 'textarea', required: true },
        { id: 'numberOfEmployees', name: 'numberOfEmployees', label: 'How many employees does the business have?', icon: <FaUsers />, inputType: 'number', required: true },
        { id: 'businessStructure', name: 'businessStructure', label: 'What is the current structure of the business?', icon: <FaBuilding />, type: 'select', options: ['Sole Proprietorship', 'Partnership', 'LLC', 'Corporation', 'Other'], required: true },
        { id: 'propertyStatus', name: 'propertyStatus', label: 'Is the business leased or owned?', icon: <FaBuilding />, type: 'select', options: ['Leased', 'Owned', 'Both'], required: true },
        { id: 'leaseTerm', name: 'leaseTerm', label: 'What is the lease term (if applicable)?', icon: <FaCalendarAlt /> },
        { id: 'hasIntellectualProperty', name: 'hasIntellectualProperty', label: 'Are there any intellectual property assets involved?', icon: <FaFileAlt />, type: 'select', options: ['Yes', 'No'], required: true },
        { id: 'hasContracts', name: 'hasContracts', label: 'Are there any contracts with suppliers or customers?', icon: <FaHandshake />, type: 'select', options: ['Yes', 'No'], required: true },
        { id: 'hasLegalIssues', name: 'hasLegalIssues', label: 'Are there any ongoing legal issues?', icon: <FaGavel />, type: 'select', options: ['Yes', 'No'], required: true }
      ],
      4: [ // Business Operations
        { id: 'ownershipStructure', name: 'ownershipStructure', label: 'What is the current ownership structure?', icon: <FaUsers />, type: 'select', options: ['Sole Ownership', 'Partnership', 'Family-Owned', 'Other'], required: true },
        { id: 'operationSystems', name: 'operationSystems', label: 'What are the key operations or systems in place?', icon: <FaChartLine />, type: 'textarea', required: true },
        { id: 'offerTraining', name: 'offerTraining', label: 'Do you offer support or training for the new owner?', icon: <FaHandshake />, type: 'select', options: ['Yes', 'No', 'Negotiable'], required: true }
      ],
      5: [ // Valuation and Sale Process
        { id: 'hasValuation', name: 'hasValuation', label: 'Have you had a business valuation done?', icon: <FaChartLine />, type: 'select', options: ['Yes', 'No'], required: true },
        { id: 'desiredTimeline', name: 'desiredTimeline', label: 'What is your desired timeline for selling?', icon: <FaCalendarAlt />, type: 'select', options: ['Immediately', '1-3 months', '6 months', '1 year', 'Flexible'], required: true },
        { id: 'sellerFinancing', name: 'sellerFinancing', label: 'Are you open to seller financing?', icon: <FaMoneyBillWave />, type: 'select', options: ['Yes', 'No', 'Maybe'], required: true }
      ],
      6: [ // Additional Information
        { id: 'keySellingPoints', name: 'keySellingPoints', label: 'What are the key selling points or unique advantages?', icon: <FaTrophy />, type: 'textarea', required: true },
        { id: 'additionalInformation', name: 'additionalInformation', label: 'Is there anything else a potential buyer should know?', icon: <FaInfoCircle />, type: 'textarea' }
      ]
    };

    const fields = formSections[step] || [];

    return (
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-transparent border-bottom">
          <h5 className="fs-4 mb-0 text-dark">
            {sections[step].icon} {sections[step].title}
          </h5>
        </Card.Header>
        <Card.Body>
          <ToastContainer />
          {fields.map((field, index) => (
            <div className="mb-4" key={index}>
              <label htmlFor={field.id} className="form-label fw-medium">
                {field.icon} {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  id={field.id}
                  value={formData[field.name]}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="form-select"
                  required={field.required}
                >
                  <option value="">Select an option</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === 'file' ? (
                <>
                  <input
                    id={field.id}
                    type="file"
                    onChange={(e) => handleInputChange(field.name, e)}
                    className="form-control"
                    accept="image/*"
                    required={field.required}
                  />
                  {formData[`${field.name}Preview`] && (
                    <div className="mt-3">
                      <img 
                        src={formData[`${field.name}Preview`]} 
                        alt="Preview" 
                        className="img-thumbnail"
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  )}
                </>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  value={formData[field.name]}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="form-control"
                  rows={4}
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
  };

  return (
    <div className="container mt-5">
      <h2 className="text-start mb-4">Business Seller Form</h2>

      <div className="d-flex justify-content-center mb-4 flex-wrap">
        {sections.map((section, index) => (
          <button
            key={index}
            type="button"
            className="btn mx-2 mb-2"
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
          <button 
            type="button" 
            className="btn btn-outline-danger"
            onClick={handleSkip}
          >
            Skip
          </button>
          
          <ButtonGroup>
            {step > 0 && (
              <button 
                type="button" 
                className="btn btn-outline-primary" 
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
            )}
            
            {step < sections.length - 1 && (
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            )}
            
            {step === sections.length - 1 && (
              <button 
                type="submit" 
                className="btn btn-success"
              >
                Submit
              </button>
            )}
          </ButtonGroup>
        </div>
      </form>
    </div>
  );
};

export default BusinessSellerForm;