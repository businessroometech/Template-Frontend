import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import {
  FaBalanceScale, FaCalendarAlt, FaExchangeAlt, FaListAlt, FaMapMarkerAlt,
  FaMoneyCheckAlt, FaTasks, FaBullhorn, FaBullseye, FaCertificate, FaChartLine,
  FaDollarSign, FaHandshake, FaHeadset, FaHourglassHalf, FaIndustry, FaMedal,
  FaRegHandPointUp, FaRocket, FaTag, FaUser, FaUsers, FaUserTie, FaWallet
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '@/context/useAuthContext';
import { toast } from 'react-toastify';

interface FormData {
  isAccredited: string;
  groupName: string;
  investorType: string;
  startupType: string;
  startupStage: string;
  regionPreference: string;
  investmentSize: string;
  totalBudget: string;
  coInvesting: string;
  equityPercentage: string;
  investmentType: string;
  involvementLevel: string;
  additionalSupport: string;
  previousInvestment: string;
  investmentExperience: string;
  startupsInvested: string;
  successStories: string;
  decisionMakingProcess: string;
  evaluationCriteria: string[];
  exitStrategy: string;
  fundraisingStage: string;
  expectedInvolvement: string;
}

const EditInvestor = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const {id }=useParams()
  
console.log("=============" , id)

  const [formData, setFormData] = useState<FormData>({
    isAccredited: '',
    groupName: '',
    investorType: '',
    startupType: '',
    startupStage: '',
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
    startupsInvested: '',
    successStories: '',
    decisionMakingProcess: '',
    evaluationCriteria: [],
    exitStrategy: '',
    fundraisingStage: '',
    expectedInvolvement: ''
  });
                                                                                 
  const [step, setStep] = useState(1);

  const tabs = [
    { 
      icon: <FaUserTie size={24} />,
      title: "Investment Preferences",
      step: 1 
    },
    { 
      icon: <FaChartLine size={24} />,
      title: "Investment Strategy",
      step: 2 
    },
    { 
      icon: <FaMedal size={24} />,
      title: "Investment Experience",
      step: 3 
    },
    { 
      icon: <FaBullseye size={24} />,
      title: "Requirements & Goals",
      step: 4 
    }
  ];

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  // Fetch investor details when editing
  useEffect(() => {
    const fetchInvestorData = async () => {
      try {
        const response = await fetch(`http://13.216.146.100/api/v1/investor/get/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch investor data");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching investor data:", error);
        toast.error("Failed to load investor details.");
      } 
      
    };

    if (id) fetchInvestorData();
  }, [id]);






  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }
    
    try {
      const response1 = await fetch(`http://13.216.146.100/api/v1/investor/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, UserId: user.id }),
      });
    
      if (!response1.ok) {
        throw new Error("Failed to submit investor data");
      }
    } catch (error) {
      console.error("Error in first request:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const handleSkip = () => navigate('/');
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleTabClick = (tabStep: number) => {
    
      setStep(tabStep);
    
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaUserTie className="me-2" />
                Investment Preferences
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaCertificate className="me-2" />
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

                {formData.isAccredited === "Yes" && (
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>
                        <FaUsers className="me-2" />
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

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaTag className="me-2" />
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
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaRocket className="me-2" />
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
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaCalendarAlt className="me-2" />
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
  <Form.Group as={Col}>
    <Form.Label>
      <FaMapMarkerAlt className="me-2" />
      Do you prefer investing in startups based in a specific region or country?
    </Form.Label>
    <Form.Control
      type="text"
      value={formData.regionPreference}
      onChange={(e) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value)) {  // Allows only letters and spaces
          handleInputChange("regionPreference", value);
        }
      }}
      placeholder="Enter your preferred region or country"
    />
  </Form.Group>
</Row>


                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaMoneyCheckAlt className="me-2" />
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
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaWallet className="me-2" />
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
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaHandshake className="me-2" />
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
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaBalanceScale className="me-2" />
                      What percentage of equity are you willing to take?
                    </Form.Label>
                    <Form.Select
                      value={formData.equityPercentage}
                      onChange={(e) => handleInputChange("equityPercentage", e.target.value)}
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
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaChartLine className="me-2" />
                Investment Strategy
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaTag className="me-2" />
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

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaUsers className="me-2" />
                      What involvement level are you comfortable with post-investment?
                    </Form.Label>
                    <Form.Select
                      value={formData.involvementLevel}
                      onChange={(e) => handleInputChange("involvementLevel", e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Active">Active (Advisory/Board)</option>
                      <option value="Passive">Passive</option>
                      <option value="Both">Both</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaHeadset className="me-2" />
                      Are you interested in providing additional support to startups?
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
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaMedal className="me-2" />
                Investment Experience
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaDollarSign className="me-2" />
                      Have you made any previous investments in startups?
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

                {formData.previousInvestment === "Yes" && (
                  <>
                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Label>
                          <FaHourglassHalf className="me-2" />
                          How many years of investment experience do you have?
                        </Form.Label>
                        <Form.Select
                          value={formData.investmentExperience}
                          onChange={(e) => handleInputChange("investmentExperience", e.target.value)}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Less than 1 year">Less than 1 year</option>
                          <option value="1-3 years">1-3 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5-10 years">5-10 years</option>
                          <option value="10+ years">10+ years</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Label>
                          <FaIndustry className="me-2" />
                          How many startups have you invested in?
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={formData.startupsInvested}
                          onChange={(e) => handleInputChange("startupsInvested", e.target.value)}
                          placeholder="Enter number of startups"
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Label>
                          <FaRegHandPointUp className="me-2" />
                          Share some of your investment success stories
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={formData.successStories}
                          onChange={(e) => handleInputChange("successStories", e.target.value)}
                          placeholder="Describe your successful investments"
                        />
                      </Form.Group>
                    </Row>
                  </>
                )}

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaTasks className="me-2" />
                      Describe your investment decision-making process
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.decisionMakingProcess}
                      onChange={(e) => handleInputChange("decisionMakingProcess", e.target.value)}
                      placeholder="Describe how you evaluate and make investment decisions"
                    />
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        );

      case 4:
        return (
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaBullseye className="me-2" />
                Startup Requirements & Investment Goals
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaListAlt className="me-2" />
                      What are your key evaluation criteria for startups?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.evaluationCriteria}
                      onChange={(e) => handleInputChange("evaluationCriteria", e.target.value.split('\n'))}
                      placeholder="List your key criteria for evaluating startups"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaExchangeAlt className="me-2" />
                      What is your preferred exit strategy?
                    </Form.Label>
                    <Form.Select
                      value={formData.exitStrategy}
                      onChange={(e) => handleInputChange("exitStrategy", e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="IPO">IPO</option>
                      <option value="Acquisition">Acquisition</option>
                      <option value="Buyout">Buyout</option>
                      <option value="Revenue Share">Revenue Share</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaBullhorn className="me-2" />
                      What fundraising stage do you prefer?
                    </Form.Label>
                    <Form.Select
                      value={formData.fundraisingStage}
                      onChange={(e) => handleInputChange("fundraisingStage", e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Pre-seed">Pre-seed</option>
                      <option value="Seed">Seed</option>
                      <option value="Series A">Series A</option>
                      <option value="Series B+">Series B+</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaUser className="me-2" />
                      What is your expected involvement with the startup after the investment?
                    </Form.Label>
                    <Form.Select
                      value={formData.expectedInvolvement}
                      onChange={(e) => handleInputChange("expectedInvolvement", e.target.value)}
                      required
                    >
                      <option value="">Select involvement level</option>
                      <option value="boardPosition">Board Position</option>
                      <option value="advisoryRole">Advisory Role</option>
                      <option value="passiveRole">Passive Role</option>
                      <option value="notInvolved">Not Involved</option>
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

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Investor Profile</h2>
      
      {/* Enhanced Tab Navigation */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center bg-white rounded-3 p-3 shadow-sm">
          {tabs.map((tab) => (
            <div
              key={tab.step}
              onClick={() => handleTabClick(tab.step)}
              className={`flex-grow-1 text-center py-3 px-4 rounded-3 mx-2 tab-item ${
                step === tab.step
                  ? 'bg-primary text-white'
                  : step > tab.step
                  ? 'bg-light text-primary cursor-pointer'
                  : 'text-muted'
              }`}
              style={{ 
                cursor: tab.step <= step ? 'pointer' : 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '200px'
              }}
            >
              <div className="d-flex flex-column align-items-center justify-content-center">
                {tab.icon}
                <span className="mt-2 fw-semibold">{tab.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {renderStep()}

      <div className="d-flex justify-content-between mt-4">
        {step > 1 && (
          <button
            className="btn btn-secondary"
            onClick={prevStep}
          >
            Previous
          </button>
        )}
        
        <div className="ms-auto">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={handleSkip}
          >
            Skip
          </button>
          
          {step < 4 ? (
            <button
              className="btn btn-primary"
              onClick={nextStep}
            >
              Next
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditInvestor;