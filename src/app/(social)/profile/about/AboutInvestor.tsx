// import React, { useEffect, useState } from 'react';
// import {
//   Building2,
//   DollarSign,
//   Rocket,
//   Globe,
//   Briefcase,
//   Brain,
//   TrendingUp,
//   Trash,
//   Loader2,
//   ChartBar,
//   FileText,
//   Settings,
// } from 'lucide-react';
// import { useAuthContext } from '@/context/useAuthContext';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import axios from 'axios';

// // Fallback investor data when API fails
// const fallbackInvestor = {
//   investorName: "N/A",
//   isAccredited: "N/A",
//   groupName: "N/A",
//   investorType: "N/A",
//   interestedStartups: "N/A",
//   preferredStage: "N/A",
//   regionPreference: "N/A",
//   investmentSize: "N/A",
//   totalBudget: "N/A",
//   coInvesting: "N/A",
//   equityPercentage: "N/A",
//   investmentType: "N/A",
//   involvementLevel: "N/A",
//   additionalSupport: "N/A",
//   previousInvestment: "N/A",
//   investmentExperience: "N/A",
//   numberOfStartups: 0,
//   successStories: "N/A",
//   decisionProcess: "N/A",
//   evaluationCriteria: "N/A",
//   exitStrategyPreference: "N/A",
//   fundraisingStage: "N/A",
//   expectedInvolvement: "N/A"
// };
                                      


// const Card = ({ children, className = '' }) => (
//   <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`}>
//     {children}
//   </div>
// );

// const SectionTitle = ({ icon: Icon, title }) => (
//   <div className="flex items-center gap-3 mb-6">
//     <div className="p-2 bg-blue-50 rounded-lg">
//       <Icon className="w-6 h-6 text-blue-600" />
//     </div>
//     <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
//   </div>
// );

// const InvestorCard: React.FC<{ investor }> = ({ investor }) => {
//   const isPlaceholder = investor.investorName === "N/A"



// const {id} = useParams()
// const navigate = useNavigate()


// const handledelete = async () => {
//   try {
//     await fetch(`http://13.216.146.100/api/v1/investor/delete/${id}`, {
                        
//       method: "DELETE",
//     });
//     await fetch(`http://localhost:5000/v1/subrole/delete/${id}`, {
//       method: "DELETE",
//     });
//     // Reload the page
//     window.location.reload();
//   } catch (error) {
//     console.error("Error while deleting:", error);
//     alert("Unable to delete Investor and Subrole");
//   }
// };


// return (
//   <div className="max-w-7xl mx-auto p-6 space-y-6">
//   {/* Profile Overview */}
//   <Card className="p-8">
//     <div className="flex items-center gap-6 mb-8">
//       <div className="p-4 bg-blue-50 rounded-xl">
//         <Building2 className="w-12 h-12 text-blue-600" />
//       </div>
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-1">{investor.investorName}</h1>
//         <p className="text-lg text-gray-600">{investor.data.groupName}</p>
//       </div>
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//       <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
//         <DollarSign className="w-5 h-5 text-blue-600" />
//         <div>
//           <p className="text-sm text-gray-600">Investment Size</p>
//           <p className="font-semibold text-gray-900">{investor.data.investmentSize}</p>
//         </div>
//       </div>
//       <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
//         <Rocket className="w-5 h-5 text-green-600" />
//         <div>
//           <p className="text-sm text-gray-600">Stage</p>
//           <p className="font-semibold text-gray-900">{investor.data.startupStage}</p>
//         </div>
//       </div>
//       <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-3">
//         <Globe className="w-5 h-5 text-purple-600" />
//         <div>
//           <p className="text-sm text-gray-600">Region</p>
//           <p className="font-semibold text-gray-900">{investor.data.regionPreference}</p>
//         </div>
//       </div>
//       <div className="bg-amber-50 rounded-xl p-4 flex items-center gap-3">
//         <Briefcase className="w-5 h-5 text-amber-600" />
//         <div>
//           <p className="text-sm text-gray-600">Type</p>
//           <p className="font-semibold text-gray-900">{investor.data.investmentType}</p>
//         </div>
//       </div>
//     </div>
//   </Card>

//   {/* Financial Overview */}
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     <Card className="p-6">
//       <SectionTitle icon={ChartBar} title="Investment Profile" />
//       <div className="space-y-4">
//         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//           <span className="text-gray-600">Total Budget</span>
//           <span className="font-semibold text-gray-900">{investor.data.totalBudget}</span>
//         </div>
//         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//           <span className="text-gray-600">Equity Range</span>
//           <span className="font-semibold text-gray-900">{investor.data.equityPercentage}</span>
//         </div>
//         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//           <span className="text-gray-600">Co-Investing</span>
//           <span className="font-semibold text-gray-900">{investor.data.coInvesting}</span>
//         </div>
//       </div>
//     </Card>

//     <Card className="p-6">
//       <SectionTitle icon={Briefcase} title="Track Record" />
//       <div className="space-y-4">
//         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//           <span className="text-gray-600">Portfolio Companies</span>
//           <span className="font-semibold text-gray-900">{investor.data.startupsInvested || "N/A"}</span>
//         </div>
//         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//           <span className="text-gray-600">Experience</span>
//           <span className="font-semibold text-gray-900">{investor.data.investmentExperience}</span>
//         </div>
//         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//           <span className="text-gray-600">Exit Strategy</span>
//           <span className="font-semibold text-gray-900">{investor.data.exitStrategy}</span>
//         </div>
//       </div>
//     </Card>
//   </div>

//   {/* Investment Details */}
//   <Card className="p-6">
//     <SectionTitle icon={FileText} title="Investment Criteria" />
//     <div className="bg-gray-50 rounded-xl p-6">
//       {Array.isArray(investor.data.successStories) ? (
//         investor.data.successStories.map((story, index) => (
//           <p key={index} className="mb-4 last:mb-0 text-gray-700 leading-relaxed">{story}</p>
//         ))
//       ) : (
//         <p className="text-gray-700 leading-relaxed whitespace-pre-line">{investor.data.successStories}</p>
//       )}
//     </div>
//   </Card>

//   {/* Business Operations */}
//   <Card className="p-6">
//     <SectionTitle icon={Settings} title="Investment Approach" />
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {[
//         { title: 'Decision Process', content: investor.data.decisionMakingProcess },
//         { title: 'Exit Strategy', content: investor.data.exitStrategy },
//         { title: 'Fund Raising Stage', content: investor.data.fundraisingStage },
//         { title: 'Involvement Level', content: investor.data.involvementLevel },
//         { title: 'Expected Involvement', content: investor.data.expectedInvolvement }
//       ].map((item, index) => (
//         <div key={index} className="bg-gray-50 rounded-xl p-6">
//           <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
//           <p className="text-gray-700 leading-relaxed">{item.content}</p>
//         </div>
//       ))}
//     </div>
//   </Card>

//   {/* Action Buttons */}
//   <div className="flex flex-col sm:flex-row gap-4 justify-end">
//     <Button
//       className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
//       onClick={() => navigate(`/profile/editinvestor/${id}`)}
//     >
//       Edit Profile
//     </Button>
//     <Button
//       className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
//       onClick={handledelete}
//     >
//       <Trash className="w-5 h-5" />
//       Delete Profile
//     </Button>
//   </div>
// </div>
// );
// };

// const InvestorCards = () => {
// const { id } = useParams();
// const { user } = useAuthContext();
// const [investors, setInvestors] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

// useEffect(() => {
// const fetchInvestors = async () => {
//   try {
//     const response = await fetch(`http://13.216.146.100/api/v1/investor/get/${id}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     setInvestors(Array.isArray(data) ? data : [data]);
//     setError(null);
//   } catch (err) {
//     console.error('Error fetching investors:', err);
//     setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
//     setInvestors([fallbackInvestor]);
//   } finally {
//     setLoading(false);
//   }
// };

// fetchInvestors();
// }, [id]);

// if (loading) {
// return (
//   <div className="min-h-screen flex justify-center items-center bg-gray-50">
//     <div className="text-center">
//       <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
//       <p className="text-gray-600">Loading investors...</p>
//     </div>
//   </div>
// );
// }

// return (
// <div className="bg-gray-50 min-h-screen py-8">
//   <div className="max-w-7xl mx-auto px-4">
//     {error && (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6" role="alert">
//         <strong className="font-bold">Error!</strong>
//         <span className="block sm:inline ml-2">{error}</span>
//       </div>
//     )}
//     {investors.map((investor, index) => (
//       <div key={index}>
//         <InvestorCard investor={investor} />
//       </div>
//     ))}
//   </div>
// </div>
// );
// };

// export default InvestorCards;




import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '@/context/useAuthContext';
import {
  Building2,
  DollarSign,
  Rocket,
  Globe,
  Briefcase,
  Brain,
  TrendingUp,
  Trash,
  Loader2,
  ChartBar,
  FileText,
  Settings,
} from 'lucide-react';
import { Button } from './ui/button';

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

const InvestorCard = ({ investor, isPlaceholder = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();


  const handledelete = async () => {
    try {
      await fetch(`http://13.216.146.100/api/v1/investor/delete/${id}`, {
                          
        method: "DELETE",
      });
      await fetch(`http://13.216.146.100/api/v1/subrole/delete/${id}`, {
        method: "DELETE",
      });
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("Error while deleting:", error);
      alert("Unable to delete Investor and Subrole");
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
              {investor.investorName}
            </h1>
            <p className="h5 mb-0" style={{ color: '#6B7280' }}>
              {investor.data.groupName}
            </p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-3">
            <div style={{
              padding: '16px',
              backgroundColor: '#EBF5FF',
              borderRadius: '12px',
              height: '100%'
            }}>
              <div className="d-flex align-items-center">
                <DollarSign style={{ width: '20px', height: '20px', color: '#2563EB', marginRight: '12px' }} />
                <div>
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Investment Size</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {investor.data.investmentSize}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div style={{
              padding: '16px',
              backgroundColor: '#F0FDF4',
              borderRadius: '12px',
              height: '100%'
            }}>
              <div className="d-flex align-items-center">
                <Rocket style={{ width: '20px', height: '20px', color: '#16A34A', marginRight: '12px' }} />
                <div>
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Stage</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {investor.data.startupStage}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div style={{
              padding: '16px',
              backgroundColor: '#F3E8FF',
              borderRadius: '12px',
              height: '100%'
            }}>
              <div className="d-flex align-items-center">
                <Globe style={{ width: '20px', height: '20px', color: '#9333EA', marginRight: '12px' }} />
                <div>
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Region</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {investor.data.regionPreference}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div style={{
              padding: '16px',
              backgroundColor: '#FEF3C7',
              borderRadius: '12px',
              height: '100%'
            }}>
              <div className="d-flex align-items-center">
                <Briefcase style={{ width: '20px', height: '20px', color: '#D97706', marginRight: '12px' }} />
                <div>
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Type</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {investor.data.investmentType}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Financial Overview */}
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <Card className="p-4">
            <SectionTitle icon={ChartBar} title="Investment Profile" />
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>Total Budget</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {investor.data.totalBudget}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>Equity Range</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {investor.data.equityPercentage}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>Co-Investing</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {investor.data.coInvesting}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 col-md-6">
          <Card className="p-4">
            <SectionTitle icon={Briefcase} title="Track Record" />
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>Portfolio Companies</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {investor.data.startupsInvested || "N/A"}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>Experience</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {investor.data.investmentExperience}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>Exit Strategy</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {investor.data.exitStrategy}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Investment Details */}
      <Card className="p-4">
        <SectionTitle icon={FileText} title="Investment Criteria" />
        <div className="p-4" style={{
          backgroundColor: '#F9FAFB',
          borderRadius: '12px'
        }}>
          {Array.isArray(investor.data.successStories) ? (
            investor.data.successStories.map((story, index) => (
              <p key={index} className="mb-3" style={{ color: '#374151', lineHeight: '1.6' }}>
                {story}
              </p>
            ))
          ) : (
            <p style={{ color: '#374151', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
              {investor.data.successStories}
            </p>
          )}
        </div>
      </Card>

      {/* Business Operations */}
      <Card className="p-4">
        <SectionTitle icon={Settings} title="Investment Approach" />
        <div className="row g-4">
          {[
            { title: 'Decision Process', content: investor.data.decisionMakingProcess },
            { title: 'Exit Strategy', content: investor.data.exitStrategy },
            { title: 'Fund Raising Stage', content: investor.data.fundraisingStage },
            { title: 'Involvement Level', content: investor.data.involvementLevel },
            { title: 'Expected Involvement', content: investor.data.expectedInvolvement }
          ].map((item, index) => (
            <div key={index} className="col-12 col-md-6">
              <div className="p-4" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <h3 className="h6 fw-semibold mb-2" style={{ color: '#111827' }}>
                  {item.title}
                </h3>
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
          onClick={() => navigate(`/profile/editinvestor/${id}`)}
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

const InvestorCards = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await fetch(`http://13.216.146.100/api/v1/investor/get/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInvestors(Array.isArray(data) ? data : [data]);
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
          <p style={{ color: '#6B7280' }}>Loading investors...</p>
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
        {investors.map((investor, index) => (
          <div key={index}>
            <InvestorCard investor={investor} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorCards;