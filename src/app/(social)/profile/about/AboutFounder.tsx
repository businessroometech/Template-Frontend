import React, { useEffect, useState } from 'react';
import { Building2, MapPin, Lightbulb, Target, Briefcase, DollarSign, TrendingUp, Users, FileCheck, BarChart as ChartBar, Milestone, Goal, Info, Loader2, HandshakeIcon, Brain, Shield, FileText, Clock } from 'lucide-react';

interface StartupProfile {
  businessName: string;
  businessLocationCountry: string;
  businessLocationCity: string;
  businessIdea: string;
  businessStage: string;
  industrySector: string;
  businessDuration: string;
  problemSolving: string;
  traction: string;
  investorType: string;
  fundingAmount: string;
  useOfFunds: string;
  investmentType: string;
  businessValuation: string;
  equityInExchange: string;
  exitPlans: string;
  partnerType: string;
  partnerSkills: string;
  partnerInvolvement: string;
  partnerEquityCompensation: string;
  partnershipStructure: string;
  businessChallenges: string;
  keyPriorities: string;
  supportNeeded: string;
  businessPlanStatus: string;
  milestones: string;
  longTermGoals: string;
  additionalInfo: string;
}

// Fallback data when API fails
const fallbackProfile: StartupProfile = {
  businessName: "N/A",
  businessLocationCountry: "N/A",
  businessLocationCity: "N/A",
  businessIdea: "N/A",
  businessStage: "N/A",
  industrySector: "N/A",
  businessDuration: "N/A",
  problemSolving: "N/A",
  traction: "N/A",
  investorType: "N/A",
  fundingAmount: "N/A",
  useOfFunds: "N/A",
  investmentType: "N/A",
  businessValuation: "N/A",
  equityInExchange: "N/A",
  exitPlans: "N/A",
  partnerType: "N/A",
  partnerSkills: "N/A",
  partnerInvolvement: "N/A",
  partnerEquityCompensation: "N/A",
  partnershipStructure: "N/A",
  businessChallenges: "N/A",
  keyPriorities: "N/A",
  supportNeeded: "N/A",
  businessPlanStatus: "N/A",
  milestones: "N/A",
  longTermGoals: "N/A",
  additionalInfo: "N/A"
};

const StartupCard: React.FC<{ profile: StartupProfile }> = ({ profile }) => {
  const isPlaceholder = profile.businessName === "N/A";

  return (
    <div className={`card shadow-lg border-0 overflow-hidden ${isPlaceholder ? 'opacity-75' : ''}`}>
      <div className="card-header bg-primary bg-gradient text-white py-3">
        <div className="d-flex align-items-center">
          <Building2 className="me-3" size={28} />
          <div>
            <h3 className="mb-0 fw-bold">{profile.businessName}</h3>
            <p className="mb-0 opacity-75 d-flex align-items-center">
              <MapPin size={16} className="me-1" />
              {profile.businessLocationCity}, {profile.businessLocationCountry}
            </p>
          </div>
        </div>
      </div>
      
      <div className="card-body py-4">
        <div className="row g-4">
          {/* Quick Overview */}
          <div className="col-12">
            <div className="d-flex flex-wrap gap-3 mb-4">
              <div className="badge bg-primary bg-gradient p-2 d-flex align-items-center">
                <Briefcase size={16} className="me-1" />
                {profile.industrySector}
              </div>
              <div className="badge bg-success bg-gradient p-2 d-flex align-items-center">
                <Target size={16} className="me-1" />
                {profile.businessStage}
              </div>
              <div className="badge bg-info bg-gradient p-2 d-flex align-items-center">
                <Clock size={16} className="me-1" />
                {profile.businessDuration}
              </div>
            </div>
          </div>

          {/* Business Overview */}
          <div className="col-md-6">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <Lightbulb className="me-2 text-primary" size={24} />
                  Business Overview
                </h5>
                <div className="p-3 border rounded bg-white mb-3">
                  <h6 className="fw-bold mb-2">Business Idea</h6>
                  <p className="mb-0 text-muted">{profile.businessIdea}</p>
                </div>
                <div className="p-3 border rounded bg-white">
                  <h6 className="fw-bold mb-2">Problem Solving</h6>
                  <p className="mb-0 text-muted">{profile.problemSolving}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Details */}
          <div className="col-md-6">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <DollarSign className="me-2 text-primary" size={24} />
                  Investment Details
                </h5>
                <ul className="list-group list-group-flush bg-transparent">
                  <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Funding Required</span>
                    <span className="badge bg-primary rounded-pill">{profile.fundingAmount}</span>
                  </li>
                  <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Valuation</span>
                    <span className="badge bg-primary rounded-pill">{profile.businessValuation}</span>
                  </li>
                  <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Equity Offered</span>
                    <span className="badge bg-primary rounded-pill">{profile.equityInExchange}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Partnership Requirements */}
          <div className="col-md-6">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <HandshakeIcon className="me-2 text-primary" size={24} />
                  Partnership Details
                </h5>
                <div className="p-3 border rounded bg-white mb-3">
                  <h6 className="fw-bold mb-2">Partner Profile</h6>
                  <p className="mb-0 text-muted">{profile.partnerType}</p>
                </div>
                <div className="p-3 border rounded bg-white">
                  <h6 className="fw-bold mb-2">Required Skills</h6>
                  <p className="mb-0 text-muted">{profile.partnerSkills}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Growth & Milestones */}
          <div className="col-md-6">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <ChartBar className="me-2 text-primary" size={24} />
                  Growth & Milestones
                </h5>
                <div className="p-3 border rounded bg-white mb-3">
                  <h6 className="fw-bold mb-2">Current Traction</h6>
                  <p className="mb-0 text-muted">{profile.traction}</p>
                </div>
                <div className="p-3 border rounded bg-white">
                  <h6 className="fw-bold mb-2">Key Milestones</h6>
                  <p className="mb-0 text-muted">{profile.milestones}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Information */}
          <div className="col-12">
            <div className="card border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <Target className="me-2 text-primary" size={24} />
                  Strategic Overview
                </h5>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="p-3 border rounded bg-white h-100">
                      <h6 className="fw-bold mb-2 d-flex align-items-center">
                        <Shield size={18} className="me-2" />
                        Challenges
                      </h6>
                      <p className="mb-0 text-muted">{profile.businessChallenges}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 border rounded bg-white h-100">
                      <h6 className="fw-bold mb-2 d-flex align-items-center">
                        <Goal size={18} className="me-2" />
                        Long-term Goals
                      </h6>
                      <p className="mb-0 text-muted">{profile.longTermGoals}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 border rounded bg-white h-100">
                      <h6 className="fw-bold mb-2 d-flex align-items-center">
                        <FileText size={18} className="me-2" />
                        Business Plan
                      </h6>
                      <p className="mb-0 text-muted">{profile.businessPlanStatus}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {profile.additionalInfo !== 'N/A' && (
            <div className="col-12">
              <div className="card border-0 bg-light">
                <div className="card-body">
                  <h5 className="card-title d-flex align-items-center mb-3">
                    <Info className="me-2 text-primary" size={24} />
                    Additional Information
                  </h5>
                  <div className="p-3 border rounded bg-white">
                    <p className="mb-0 text-muted">{profile.additionalInfo}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function AboutFounder() {
  const [profiles, setProfiles] = useState<StartupProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('https://api.example.com/startup-profiles'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfiles(Array.isArray(data) ? data : [data]);
        setError(null);
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
        setProfiles([fallbackProfile]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <Loader2 className="animate-spin mb-2" size={40} />
          <p className="text-muted">Loading startup profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <h1 className="text-center mb-5 display-4">Startup Profiles</h1>
        
        
        <div className="row g-4">
          {profiles.map((profile, index) => (
            <div key={index} className="col-12">
              <StartupCard profile={profile} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutFounder;