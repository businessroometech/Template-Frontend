// import React, { useEffect, useState } from 'react';
// import { Building2, MapPin, Lightbulb, Target, Briefcase, DollarSign, TrendingUp, Users, FileCheck, BarChart as ChartBar, Milestone, Goal, Info, Loader2, HandshakeIcon, Brain, Shield, FileText, Clock, Trash } from 'lucide-react';
// import { useAuthContext } from '@/context/useAuthContext';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button } from 'react-bootstrap';

// interface StartupProfile {
//   businessName: string;
//   businessLocationCountry: string;
//   businessLocationCity: string;
//   businessIdea: string;
//   businessStage: string;
//   industrySector: string;
//   businessDuration: string;
//   problemSolving: string;
//   traction: string;
//   investorType: string;
//   fundingAmount: string;
//   useOfFunds: string;
//   investmentType: string;
//   businessValuation: string;
//   equityInExchange: string;
//   exitPlans: string;
//   partnerType: string;
//   partnerSkills: string;
//   partnerInvolvement: string;
//   partnerEquityCompensation: string;
//   partnershipStructure: string;
//   businessChallenges: string;
//   keyPriorities: string;
//   supportNeeded: string;
//   businessPlanStatus: string;
//   milestones: string;
//   longTermGoals: string;
//   additionalInfo: string;
// }

// // Fallback data when API fails
// const fallbackProfile: StartupProfile = {
//   businessName: "N/A",
//   businessLocationCountry: "N/A",
//   businessLocationCity: "N/A",
//   businessIdea: "N/A",
//   businessStage: "N/A",
//   industrySector: "N/A",
//   businessDuration: "N/A",
//   problemSolving: "N/A",
//   traction: "N/A",
//   investorType: "N/A",
//   fundingAmount: "N/A",
//   useOfFunds: "N/A",
//   investmentType: "N/A",
//   businessValuation: "N/A",
//   equityInExchange: "N/A",
//   exitPlans: "N/A",
//   partnerType: "N/A",
//   partnerSkills: "N/A",
//   partnerInvolvement: "N/A",
//   partnerEquityCompensation: "N/A",
//   partnershipStructure: "N/A",
//   businessChallenges: "N/A",
//   keyPriorities: "N/A",
//   supportNeeded: "N/A",
//   businessPlanStatus: "N/A",
//   milestones: "N/A",
//   longTermGoals: "N/A",
//   additionalInfo: "N/A"
// };

// const StartupCard: React.FC<{ profile: StartupProfile }> = ({ profile }) => {
//   const isPlaceholder = profile.businessName === "N/A";
//   const navigate = useNavigate()
//  const {id} = useParams()

//  const handledelete = async () => {
//   try {
//     await fetch(`http://13.216.146.100/api/v1/entrepreneur/delete/${id}`, {
//       method: "DELETE",
//     });
//     await fetch(`http://13.216.146.100/api/v1/subrole/delete/${id}`, {
//       method: "DELETE",
//     });
//     // Reload the page
//     window.location.reload();
//   } catch (error) {
//     console.error("Error while deleting:", error);
//     alert("Unable to delete Entrepreneur and Subrole");
//   }
// };


//   return (
//     <div className={`card shadow-lg border-0 overflow-hidden ${isPlaceholder ? 'opacity-75' : ''}`}>
//       <div className="card-header bg-gradient text-gray py-3">
//         <div className="d-flex align-items-center">
//           <Building2 className="me-3" size={28} />
//           <div>
//             <h3 className="mb-0 fw-bold">{profile.data.businessName}</h3>
//             <p className="mb-0 opacity-75 d-flex align-items-center">
//               <MapPin size={16} className="me-1" />
//               {profile.data.businessLocationCity}, {profile.data.businessLocationCountry}
//             </p>
//           </div>
//           <div>

//           </div>
//         </div>
//       </div>
      
//       <div className="card-body py-4">
//         <div className="row g-4">
//           {/* Quick Overview */}
//           <div className="col-12">
//             <div className="d-flex flex-wrap gap-3 mb-4">
//               <div className="badge bg-primary bg-gradient p-2 d-flex align-items-center">
//                 <Briefcase size={16} className="me-1" />
//                 {profile.data.industrySector}
//               </div>
//               <div className="badge bg-success bg-gradient p-2 d-flex align-items-center">
//                 <Target size={16} className="me-1" />
//                 {profile.data.businessStage}
//               </div>
//               <div className="badge bg-info bg-gradient p-2 d-flex align-items-center">
//                 <Clock size={16} className="me-1" />
//                 {profile.data.businessDuration}
//               </div>
//             </div>
//           </div>

//           {/* Business Overview */}
//           <div className="col-md-6">
//             <div className="card h-100 border-0 bg-light">
//               <div className="card-body">
//                 <h5 className="card-title d-flex align-items-center mb-3">
//                   <Lightbulb className="me-2 text-primary" size={24} />
//                   Business Overview
//                 </h5>
//                 <div className="p-3 border rounded bg-white mb-3">
//                   <h6 className="fw-bold mb-2">Business Idea</h6>
//                   <p className="mb-0 text-muted">{profile.data.businessIdea}</p>
//                 </div>
//                 <div className="p-3 border rounded bg-white">
//                   <h6 className="fw-bold mb-2">Problem Solving</h6>
//                   <p className="mb-0 text-muted">{profile.data.problemSolving}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Investment Details */}
//           <div className="col-md-6">
//             <div className="card h-100 border-0 bg-light">
//               <div className="card-body">
//                 <h5 className="card-title d-flex align-items-center mb-3">
//                   <DollarSign className="me-2 text-primary" size={24} />
//                   Investment Details
//                 </h5>
//                 <ul className="list-group list-group-flush bg-transparent">
//                   <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
//                     <span className="fw-semibold">Funding Required</span>
//                     <span className="badge bg-primary rounded-pill">{profile.data.fundingAmount}</span>
//                   </li>
//                   <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
//                     <span className="fw-semibold">Valuation</span>
//                     <span className="badge bg-primary rounded-pill">{profile.data.businessValuation}</span>
//                   </li>
//                   <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
//                     <span className="fw-semibold">Equity Offered</span>
//                     <span className="badge bg-primary rounded-pill">{profile.data.equityInExchange}</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Partnership Requirements */}
//           <div className="col-md-6">
//             <div className="card h-100 border-0 bg-light">
//               <div className="card-body">
//                 <h5 className="card-title d-flex align-items-center mb-3">
//                   <HandshakeIcon className="me-2 text-primary" size={24} />
//                   Partnership Details
//                 </h5>
//                 <div className="p-3 border rounded bg-white mb-3">
//                   <h6 className="fw-bold mb-2">Partner Profile</h6>
//                   <p className="mb-0 text-muted">{profile.data.partnerType}</p>
//                 </div>
//                 <div className="p-3 border rounded bg-white">
//                   <h6 className="fw-bold mb-2">Required Skills</h6>
//                   <p className="mb-0 text-muted">{profile.data.partnerSkills}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Growth & Milestones */}
//           <div className="col-md-6">
//             <div className="card h-100 border-0 bg-light">
//               <div className="card-body">
//                 <h5 className="card-title d-flex align-items-center mb-3">
//                   <ChartBar className="me-2 text-primary" size={24} />
//                   Growth & Milestones
//                 </h5>
//                 <div className="p-3 border rounded bg-white mb-3">
//                   <h6 className="fw-bold mb-2">Current Traction</h6>
//                   <p className="mb-0 text-muted">{profile.data.traction}</p>
//                 </div>
//                 <div className="p-3 border rounded bg-white">
//                   <h6 className="fw-bold mb-2">Key Milestones</h6>
//                   <p className="mb-0 text-muted">{profile.data.milestones}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Strategic Information */}
//           <div className="col-12">
//             <div className="card border-0 bg-light">
//               <div className="card-body">
//                 <h5 className="card-title d-flex align-items-center mb-3">
//                   <Target className="me-2 text-primary" size={24} />
//                   Strategic Overview
//                 </h5>
//                 <div className="row g-4">
//                   <div className="col-md-4">
//                     <div className="p-3 border rounded bg-white h-100">
//                       <h6 className="fw-bold mb-2 d-flex align-items-center">
//                         <Shield size={18} className="me-2" />
//                         Challenges
//                       </h6>
//                       <p className="mb-0 text-muted">{profile.data.businessChallenges}</p>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="p-3 border rounded bg-white h-100">
//                       <h6 className="fw-bold mb-2 d-flex align-items-center">
//                         <Goal size={18} className="me-2" />
//                         Long-term Goals
//                       </h6>
//                       <p className="mb-0 text-muted">{profile.data.longTermGoals}</p>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="p-3 border rounded bg-white h-100">
//                       <h6 className="fw-bold mb-2 d-flex align-items-center">
//                         <FileText size={18} className="me-2" />
//                         Business Plan
//                       </h6>
//                       <p className="mb-0 text-muted">{profile.data.businessPlanStatus}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Additional Information */}
//           {profile.additionalInfo !== 'N/A' && (
//             <div className="col-12">
//               <div className="card border-0 bg-light">
//                 <div className="card-body">
//                   <h5 className="card-title d-flex align-items-center mb-3">
//                     <Info className="me-2 text-primary" size={24} />
//                     Additional Information
//                   </h5>
//                   <div className="p-3 border rounded bg-white">
//                     <p className="mb-0 text-muted">{profile.data.additionalInfo}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//           <Button onClick={() => {
//             navigate(`/profile/editfounder/${id}`)
//           }}>Edit About</Button>
//            <Button style={{ cursor:"pointer", marginTop:"4px", backgroundColor:"red"}}   onClick={() => {
//                       handledelete()
//                       }}>
//                     <Trash></Trash>
//                       Delete Your Profile
//                   </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// function AboutFounder() {
  
//   const [profiles, setProfiles] = useState<StartupProfile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
// const {user} = useAuthContext()
// const { id } = useParams();
// const navigate = useNavigate()



// console.log("----------//ids--------" , id)
//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const response = await fetch(`http://13.216.146.100/api/v1/entrepreneur/detail/${id}`); // Replace with your actual API endpoint
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setProfiles(Array.isArray(data) ? data : [data]);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching profiles:', err);
//         setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
//         setProfiles([fallbackProfile]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
//         <div className="text-center">
//           <Loader2 className="animate-spin mb-2" size={40} />
//           <p className="text-muted">Loading startup profiles...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-light min-vh-100 py-4">
//       <div className="container">
//         <h1 className="text-center mb-5 display-4"></h1>
        
        
//         <div className="row g-4">
//           {profiles.map((profile, index) => (
//             <div key={index} className="col-12">
//               <StartupCard profile={profile} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AboutFounder;









import React, { useEffect, useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Lightbulb, 
  Target, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Users, 
  FileCheck, 
  BarChart as ChartBar, 
  Milestone, 
  Goal, 
  Info, 
  Loader2, 
  HandshakeIcon, 
  Brain, 
  Shield, 
  FileText, 
  Clock, 
  Trash 
} from 'lucide-react';
import { useAuthContext } from '@/context/useAuthContext';
import { useNavigate, useParams } from 'react-router-dom';

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

const Card = ({ children, className = '' }) => (
  <div className={`card shadow-sm border-0 ${className}`} style={{
    borderRadius: '16px',
    backgroundColor: '#fff',
    marginBottom: '24px'
  }}>
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="d-flex align-items-center mb-4">
    <div style={{
      padding: '12px',
      backgroundColor: '#EBF5FF',
      borderRadius: '12px',
      marginRight: '16px'
    }}>
      <Icon style={{ width: '24px', height: '24px', color: '#2563EB' }} />
    </div>
    <h2 className="h4 mb-0" style={{ color: '#111827' }}>{title}</h2>
  </div>
);

const StartupCard: React.FC<{ profile: StartupProfile }> = ({ profile }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handledelete = async () => {
    try {
      await fetch(`http://13.216.146.100/api/v1/entrepreneur/delete/${id}`, {
        method: "DELETE",
      });
      await fetch(`http://13.216.146.100/api/v1/subrole/delete/${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error while deleting:", error);
      alert("Unable to delete Entrepreneur and Subrole");
    }
  };

  return (
    <div className="" style={{ maxWidth: '1280px' }}>
      {/* Profile Overview */}
      <Card className="p-4 p-lg-5">
        <div className="d-flex align-items-center mb-4">
          <div style={{
            padding: '20px',
            backgroundColor: '#EBF5FF',
            borderRadius: '16px',
            marginRight: '24px'
          }}>
            <Building2 style={{ width: '48px', height: '48px', color: '#2563EB' }} />
          </div>
          <div>
            <h1 className="h2 mb-1" style={{ color: '#111827', fontWeight: '700' }}>
              {profile.data.businessName}
            </h1>
            <p className="h5 mb-0" style={{ color: '#6B7280' }}>
              <MapPin style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              {profile.data.businessLocationCity}, {profile.data.businessLocationCountry}
            </p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div style={{
              padding: '16px',
              backgroundColor: '#EBF5FF',
              borderRadius: '12px',
              height: '100%'
            }}>
              <div className="d-flex align-items-center">
                <Briefcase style={{ width: '20px', height: '20px', color: '#2563EB', marginRight: '12px' }} />
                <div>
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Industry</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {profile.data.industrySector}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div style={{
              padding: '16px',
              backgroundColor: '#F0FDF4',
              borderRadius: '12px',
              height: '100%'
            }}>
              <div className="d-flex align-items-center">
                <Target style={{ width: '20px', height: '20px', color: '#16A34A', marginRight: '12px' }} />
                <div>
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Stage</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {profile.data.businessStage}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div style={{
              padding: '16px',
              backgroundColor: '#F3E8FF',
              borderRadius: '12px',
              height: '100%'
            }}>
              <div className="d-flex align-items-center">
                <Clock style={{ width: '20px', height: '20px', color: '#9333EA', marginRight: '12px' }} />
                <div>
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Duration</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {profile.data.businessDuration}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Business Overview */}
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <Card className="p-4">
            <SectionTitle icon={Lightbulb} title="Business Overview" />
            <div className="d-flex flex-column gap-3">
              <div className="p-4" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <h6 className="fw-bold mb-2" style={{ color: '#111827' }}>Business Idea</h6>
                <p className="mb-0" style={{ color: '#374151', lineHeight: '1.6' }}>
                  {profile.data.businessIdea}
                </p>
              </div>
              <div className="p-4" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <h6 className="fw-bold mb-2" style={{ color: '#111827' }}>Problem Solving</h6>
                <p className="mb-0" style={{ color: '#374151', lineHeight: '1.6' }}>
                  {profile.data.problemSolving}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 col-md-6">
          <Card className="p-4">
            <SectionTitle icon={DollarSign} title="Investment Details" />
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>Funding Required</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {profile.data.fundingAmount}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>Valuation</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {profile.data.businessValuation}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>Equity Offered</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {profile.data.equityInExchange}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Partnership Details */}
      <Card className="p-4">
        <SectionTitle icon={HandshakeIcon} title="Partnership Requirements" />
        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-4" style={{
              backgroundColor: '#F9FAFB',
              borderRadius: '12px'
            }}>
              <h6 className="fw-bold mb-2" style={{ color: '#111827' }}>Partner Profile</h6>
              <p className="mb-0" style={{ color: '#374151', lineHeight: '1.6' }}>
                {profile.data.partnerType}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-4" style={{
              backgroundColor: '#F9FAFB',
              borderRadius: '12px'
            }}>
              <h6 className="fw-bold mb-2" style={{ color: '#111827' }}>Required Skills</h6>
              <p className="mb-0" style={{ color: '#374151', lineHeight: '1.6' }}>
                {profile.data.partnerSkills}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Strategic Overview */}
      <Card className="p-4">
        <SectionTitle icon={Target} title="Strategic Overview" />
        <div className="row g-4">
          {[
            { icon: Shield, title: 'Challenges', content: profile.data.businessChallenges },
            { icon: Goal, title: 'Long-term Goals', content: profile.data.longTermGoals },
            { icon: FileText, title: 'Business Plan', content: profile.data.businessPlanStatus }
          ].map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="p-4" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px',
                height: '100%'
              }}>
                <h6 className="fw-bold mb-2 d-flex align-items-center" style={{ color: '#111827' }}>
                  <item.icon style={{ width: '18px', height: '18px', marginRight: '8px' }} />
                  {item.title}
                </h6>
                <p className="mb-0" style={{ color: '#374151', lineHeight: '1.6' }}>
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-end mt-4">
        <button
          className="btn btn-primary"
          style={{
            backgroundColor: '#2563EB',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontWeight: '500'
          }}
          onClick={() => navigate(`/profile/editfounder/${id}`)}
        >
          Edit Profile
        </button>
        <button
          className="btn btn-danger d-flex align-items-center gap-2"
          style={{
            backgroundColor: '#DC2626',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontWeight: '500'
          }}
          onClick={handledelete}
        >
          <Trash style={{ width: '20px', height: '20px' }} />
          Delete Profile
        </button>
      </div>
    </div>
  );
};

const AboutFounder = () => {
  const [profiles, setProfiles] = useState<StartupProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`http://13.216.146.100/api/v1/entrepreneur/detail/${id}`);
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
  }, [id]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="text-center">
          <Loader2 className="mb-3" style={{
            width: '48px',
            height: '48px',
            color: '#2563EB',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#6B7280' }}>Loading startup profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '', minHeight: '100vh', paddingTop: '32px', paddingBottom: '32px' }}>
      <div className="container-fluid" style={{ maxWidth: '1280px' }}>
        {error && (
          <div className="alert alert-danger mb-4" role="alert" style={{ borderRadius: '12px' }}>
            <strong>Error!</strong>
            <span className="ms-2">{error}</span>
          </div>
        )}
        {profiles.map((profile, index) => (
          <div key={index}>
            <StartupCard profile={profile} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutFounder;