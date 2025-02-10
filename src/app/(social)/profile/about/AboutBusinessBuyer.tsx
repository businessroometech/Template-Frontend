// import React, { useEffect, useState } from 'react';
// import { Building2, MapPin, Briefcase, DollarSign, Clock, TrendingUp, GraduationCap, FileCheck, Info, Loader2, Trash } from 'lucide-react';
// import { useAuthContext } from '@/context/useAuthContext';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Button } from 'react-bootstrap';

// interface Business {
//   businessType: string;
// businessLocation: string;
//   businessModel: string;
//   budget: string;
//   renovationInvestment: string;
//   timeline: string;
//   growthPreference: string;
//   supportTraining: string;
//   ndaAgreement: string;
//   additionalInfo: string;
// }

// // Fallback business data when API fails
// const fallbackBusiness: Business = {
//   businessType: 'N/A',
//   businessLocation: 'N/A',
//   businessModel: 'N/A',
//   budget: "N/A",
//   renovationInvestment: "N/A",
//   timeline: 'N/A',
//   growthPreference: 'N/A',
//   supportTraining: 'N/A',
//   ndaAgreement: 'N/A',
//   additionalInfo: 'N/A'
// };

// const BusinessCard: React.FC<{ business: Business }> = ({ business }) => {
// const navigate = useNavigate()
// const { id } = useParams();

// const handledelete = async () => {
//   try {
//     await fetch(`http://13.216.146.100/api/v1/businessbuyer/delete/${id}`, {
//       method: "DELETE",
//     });
//     await fetch(`http://13.216.146.100/api/v1/subrole/delete/${id}`, {
//       method: "DELETE",
//     });

//     // Reload the page
//     window.location.reload();
//   } catch (error) {
//     console.error("Error while deleting:", error);
//     alert("Unable to delete Investor and Subrole");
//   }
// };
//   const isPlaceholder = business.businessType === 'N/A';
 
//   return (
//     <div className={`card shadow-lg border-0 overflow-hidden ${isPlaceholder ? 'opacity-75' : ''}`}>
//       <div className="card-header bg-gradient text-gray py-3" style={{display:"flex"}}>
//         <div className="d-flex align-items-center">
//           <Building2 className="me-3" size={28} />
//           <div>
//             <h3 className="mb-0 fw-bold">{business.data.businessType}</h3>
//             <p className="mb-0 opacity-75 d-flex align-items-center">
//               <MapPin size={16} className="me-1" />
//               {business.data.businessLocation}
//             </p>
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
//                 {business.data.businessModel}
//               </div>
//               <div className="badge bg-success bg-gradient p-2 d-flex align-items-center">
//                 <DollarSign size={16} className="me-1" />
//                 {business.data.budget}
//               </div>
//               <div className="badge bg-info bg-gradient p-2 d-flex align-items-center">
//                 <Clock size={16} className="me-1" />
//                 {business.data.timeline}
//               </div>
//             </div>
//           </div>

//           {/* Financial Details */}
//           <div className="col-md-6">
//             <div className="card h-100 border-0 bg-light">
//               <div className="card-body">
//                 <h5 className="card-title d-flex align-items-center mb-3">
//                   <DollarSign className="me-2 text-primary" size={24} />
//                   Financial Overview
//                 </h5>
//                 <ul className="list-group list-group-flush bg-transparent">
//                   <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
//                     <span className="fw-semibold">Total Budget</span>
//                     <span className="badge bg-primary rounded-pill">{business.data.budget}</span>
//                   </li>
//                   <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
//                     <span className="fw-semibold">Renovation Investment</span>
//                     <span className="badge bg-primary rounded-pill">{business.data.renovationInvestment}</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Growth & Support */}
//           <div className="col-md-6">
//             <div className="card h-100 border-0 bg-light">
//               <div className="card-body">
//                 <h5 className="card-title d-flex align-items-center mb-3">
//                   <TrendingUp className="me-2 text-primary" size={24} />
//                   Growth Strategy
//                 </h5>
//                 <ul className="list-group list-group-flush bg-transparent">
//                   <li className="list-group-item bg-transparent">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <span className="fw-semibold">Growth Preference</span>
//                       <span className="badge bg-success rounded-pill">{business.data.growthOrStableCashFlow}</span>
//                     </div>
//                   </li>
//                   <li className="list-group-item bg-transparent">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <span className="fw-semibold">Timeline</span>
//                       <span className="badge bg-success rounded-pill">{business.data.timeline}</span>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Additional Information */}
//           <div className="col-12">
//             <div className="card border-0 bg-light">
//               <div className="card-body">
//                 <h5 className="card-title d-flex align-items-center mb-3">
//                   <Info className="me-2 text-primary" size={24} />
//                   Additional Details
//                 </h5>
//                 <div className="row g-4">
//                   <div className="col-md-6">
//                     <div className="p-3 border rounded bg-white">
//                       <h6 className="fw-bold mb-2 d-flex align-items-center">
//                         <GraduationCap size={18} className="me-2" />
//                         Support & Training
//                       </h6>
//                       <p className="mb-0 text-muted">{business.data.supportAfterPurchase}</p>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="p-3 border rounded bg-white">
//                       <h6 className="fw-bold mb-2 d-flex align-items-center">
//                         <FileCheck size={18} className="me-2" />
//                         NDA Status
//                       </h6>
//                       <p className="mb-0 text-muted">{business.data.ndaAgreement}</p>
//                     </div>
//                   </div>
//                   {business.additionalInfo !== 'N/A' && (
//                     <div className="col-12">
//                       <div className="p-3 border rounded bg-white">
//                         <h6 className="fw-bold mb-2">Additional Information</h6>
//                         <p className="mb-0 text-muted">{business.data.additionalInfo}</p>
//                       </div>
//                     </div>
//                   )}
//                 <Button onClick={()=> {
//                   navigate(`/profile/editabout/${id}`)
//                 }}>Edit Your Profile</Button>
//                   <Button style={{ cursor:"pointer", marginTop:"4px", backgroundColor:"red"}}   onClick={() => {
//                                       handledelete()
//                                       }}>
//                                     <Trash></Trash>
//                                       Delete Your Profile
//                                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// function AboutBusinessBuyer() {
//   const [businesses, setBusinesses] = useState<Business[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
// const {user} = useAuthContext()
// const { id } = useParams();

//   useEffect(() => {
//     const fetchBusinesses = async () => {
//       try {
//         const response = await fetch(`http://13.216.146.100/api/v1/businessbuyer/get/${id}`); // Replace with your actual API endpoint

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setBusinesses(Array.isArray(data) ? data : [data]); // Handle both array and single object responses
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching businesses:', err);
//         setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
//         setBusinesses([fallbackBusiness]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBusinesses();
//   }, []);
  
//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
//         <div className="text-center">
//           <Loader2 className="animate-spin mb-2" size={40} />
//           <p className="text-muted">Loading business profiles...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-light min-vh-100 py-4">
//       <div className="container">
       
       
//         <div className="row g-4">
//           {businesses.map((business, index) => (
//             <div key={index} className="col-12">
//               <BusinessCard business={business} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AboutBusinessBuyer;




import React, { useEffect, useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  GraduationCap, 
  FileCheck, 
  Info, 
  Loader2, 
  Trash,
  Target,
  Settings
} from 'lucide-react';
import { useAuthContext } from '@/context/useAuthContext';
import { useNavigate, useParams } from 'react-router-dom';

interface Business {
  businessType: string;
  businessLocation: string;
  businessModel: string;
  budget: string;
  renovationInvestment: string;
  timeline: string;
  growthPreference: string;
  supportTraining: string;
  ndaAgreement: string;
  additionalInfo: string;
}

const fallbackBusiness: Business = {
  businessType: 'N/A',
  businessLocation: 'N/A',
  businessModel: 'N/A',
  budget: "N/A",
  renovationInvestment: "N/A",
  timeline: 'N/A',
  growthPreference: 'N/A',
  supportTraining: 'N/A',
  ndaAgreement: 'N/A',
  additionalInfo: 'N/A'
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

const BusinessCard: React.FC<{ business: Business }> = ({ business }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handledelete = async () => {
    try {
      await fetch(`http://13.216.146.100/api/v1/businessbuyer/delete/${id}`, {
        method: "DELETE",
      });
      await fetch(`http://13.216.146.100/api/v1/subrole/delete/${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error while deleting:", error);
      alert("Unable to delete Business Buyer and Subrole");
    }
  };

  return (
    <div className=" " style={{ maxWidth: '1350px' }}>
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
              {business.data.businessType}
            </h1>
            <p className="h5 mb-0" style={{ color: '#6B7280' }}>
              <MapPin style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              {business.data.businessLocation}
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
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Business Model</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {business.data.businessModel}
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
                <Clock style={{ width: '20px', height: '20px', color: '#16A34A', marginRight: '12px' }} />
                <div>
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Timeline</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {business.data.timeline}
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
                <Target style={{ width: '20px', height: '20px', color: '#9333EA', marginRight: '12px' }} />
                <div>
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Growth Strategy</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {business.data.growthOrStableCashFlow}
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
            <SectionTitle icon={DollarSign} title="Financial Overview" />
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>Total Budget</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {business.data.budget}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>Renovation Investment</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {business.data.renovationInvestment}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 col-md-6">
          <Card className="p-4">
            <SectionTitle icon={Settings} title="Business Requirements" />
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>Support & Training</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {business.data.supportAfterPurchase}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3" style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#6B7280' }}>NDA Agreement</span>
                <span className="fw-semibold" style={{ color: '#111827' }}>
                  {business.data.ndaAgreement}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Additional Information */}
      {business.data.additionalInfo && (
        <Card className="p-4">
          <SectionTitle icon={Info} title="Additional Information" />
          <div className="p-4" style={{
            backgroundColor: '#F9FAFB',
            borderRadius: '12px'
          }}>
            <p className="mb-0" style={{ color: '#374151', lineHeight: '1.6' }}>
              {business.data.additionalInfo}
            </p>
          </div>
        </Card>
      )}

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
          onClick={() => navigate(`/profile/editabout/${id}`)}
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

const AboutBusinessBuyer = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(`http://13.216.146.100/api/v1/businessbuyer/get/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBusinesses(Array.isArray(data) ? data : [data]);
        setError(null);
      } catch (err) {
        console.error('Error fetching businesses:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
        setBusinesses([fallbackBusiness]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
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
          <p style={{ color: '#6B7280' }}>Loading business profiles...</p>
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
        {businesses.map((business, index) => (
          <div key={index}>
            <BusinessCard business={business} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutBusinessBuyer;