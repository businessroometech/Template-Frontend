import React, { useEffect, useState } from 'react';
import { Building2, DollarSign, Users, Target, Map, Briefcase, Award, Brain, TrendingUp, Globe, Rocket, HandshakeIcon, Loader2 } from 'lucide-react';
import { useAuthContext } from '@/context/useAuthContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// Fallback investor data when API fails
const fallbackInvestor = {
  investorName: "N/A",
  isAccredited: "N/A",
  groupName: "N/A",
  investorType: "N/A",
  interestedStartups: "N/A",
  preferredStage: "N/A",
  regionPreference: "N/A",
  investmentSize: "N/A",
  totalBudget: "N/A",
  coInvesting: "N/A",
  equityPercentage: "N/A",
  investmentType: "N/A",
  involvementLevel: "N/A",
  additionalSupport: "N/A",
  previousInvestment: "N/A",
  investmentExperience: "N/A",
  numberOfStartups: 0,
  successStories: "N/A",
  decisionProcess: "N/A",
  evaluationCriteria: "N/A",
  exitStrategyPreference: "N/A",
  fundraisingStage: "N/A",
  expectedInvolvement: "N/A"
};

const InvestorCard: React.FC<{ investor }> = ({ investor }) => {
  const isPlaceholder = investor.investorName === "N/A"


const {id} = useParams()



  return (
    <div className={`card shadow-lg border-0 overflow-hidden ${isPlaceholder ? 'opacity-75' : ''}`}>
      <div className="card-header  text-black py-3">
        <div className="d-flex align-items-center">
          <Building2 className="me-3" size={28}  color='gray'/>
          <div>
            <h1 className="mb-0 fw-bold " >{investor.investorName}</h1>
            <h3 className="mb-0 opacity-75">{investor.data.groupName}</h3>
          </div>
        </div>
      </div>
      
      <div className="card-body py-4">
        <div className="row g-4">
          {/* Quick Overview */}
          <div className="col-12">
            <div className="d-flex flex-wrap gap-3 mb-4">
              <div className="badge bg-primary bg-gradient p-2 d-flex align-items-center">
                <DollarSign size={16} className="me-1" />
                {investor.data.investmentSize}
              </div>
              <div className="badge bg-success bg-gradient p-2 d-flex align-items-center">
                <Rocket size={16} className="me-1" />
                {investor.data.startupStage}
              </div>
              <div className="badge bg-info bg-gradient p-2 d-flex align-items-center">
                <Globe size={16} className="me-1" />
                {investor.data.regionPreference}
              </div>
              <div className="badge bg-warning bg-gradient p-2 d-flex align-items-center text-dark">
                <HandshakeIcon size={16} className="me-1" />
                {investor.data.investmentType}
              </div>
            </div>
          </div>

          {/* Investment Details */}
          <div className="col-md-6">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <DollarSign className="me-2 text-primary" size={24} />
                  Investment Profile
                </h5>
                <ul className="list-group list-group-flush bg-transparent">
                  <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Total Budget</span>
                    <span className="badge bg-primary rounded-pill">{investor.data.totalBudget}</span>
                  </li>
                  <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Equity Range</span>
                    <span className="badge bg-primary rounded-pill">{investor.data.equityPercentage}</span>
                  </li>
                  <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Co-Investing</span>
                    <span className="badge bg-primary rounded-pill">{investor.data.coInvesting}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Experience & Track Record */}
          <div className="col-md-6">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <Briefcase className="me-2 text-primary" size={24} />
                  Track Record
                </h5>
                <ul className="list-group list-group-flush bg-transparent">
                  <li className="list-group-item bg-transparent">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-semibold">Portfolio Companies</span>
                      <span className="badge bg-success rounded-pill">
                        {investor.data.startupsInvested || "N/A"}
                      </span>
                    </div>
                  </li>
                  <li className="list-group-item bg-transparent">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-semibold">Experience</span>
                      <span className="badge bg-success rounded-pill">{investor.data.investmentExperience}</span>
                    </div>
                  </li>
                  <li className="list-group-item bg-transparent">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-semibold">Success Stories</span>
                      <span className="badge bg-success rounded-pill">{investor.data.successStories}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Evaluation Criteria */}
          <div className="col-12">
            <div className="card border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <Brain className="me-2 text-primary" size={24} />
                  Investment Criteria
                 
                </h5>
                <div className="d-flex flex-wrap gap-2">
                 
                    
                    
                
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="col-12">
            <div className="card border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <TrendingUp className="me-2 text-primary" size={24} />
                  Investment Approach
                </h5>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="p-3 border rounded bg-white">
                      <h6 className="fw-bold mb-2">Decision Process</h6>
                      <p className="mb-0 text-muted">{investor.data.decisionMakingProcess}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 border rounded bg-white">
                      <h6 className="fw-bold mb-2">Exit Strategy</h6>
                      <p className="mb-0 text-muted">{investor.data.exitStrategy}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 border rounded bg-white">
                      <h6 className="fw-bold mb-2">Fund Raising Stage</h6>
                      <p className="mb-0 text-muted">{investor.data.fundraisingStage}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 border rounded bg-white">
                      <h6 className="fw-bold mb-2">Involvement Level</h6>
                      <p className="mb-0 text-muted">{investor.data.involvementLevel}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 border rounded bg-white">
                      <h6 className="fw-bold mb-2">Expected Involvment</h6>
                      <p className="mb-0 text-muted">{investor.data.expectedInvolvement}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 border rounded bg-white">
                      <h6 className="fw-bold mb-2">Exit Stratergy</h6>
                      <p className="mb-0 text-muted">{investor.data.exitStrategy}</p>
                    </div>
                  </div>
                </div>
              </div>
         <Link to = {`/profile/editinvestor/${id}`}>    <Button>Edit Your Profile</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function InvestorCards() {
const { id } = useParams();
console.log("----------//ids--------" , id)
const {user} = useAuthContext()

  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await fetch(`http://13.216.146.100/api/v1/investor/get/${id}`); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInvestors(Array.isArray(data) ? data : [data]); // Handle both array and single object responses
        setError(null);
      } catch (err) {
        console.error('Error fetching investors:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
        setInvestors([fallbackInvestor]);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <Loader2 className="animate-spin mb-2" size={40} />
          <p className="text-muted">Loading investors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-4" style={{width:"100%"}}>
      <div className="container">
        <h1 className="text-center mb-5 display-4"></h1>
        {error && (
          <div></div>
        )}
        <div className="row g-4">
          {investors.map((investor, index) => (
            <div key={index} className="col-12">
              <InvestorCard investor={investor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InvestorCards;