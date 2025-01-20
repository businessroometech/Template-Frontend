// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const Marketplacedetails = () => {
//   const { id } = useParams(); // Get the id from URL parameters
//   const [businessDetails, setBusinessDetails] = useState(null); // State to hold the business details

//   useEffect(() => {
//     // Fetch data from the API
//     fetch(`http://localhost:5000/businessseller/detailuuid/${id}`)
//       .then(response => response.json())
//       .then(data => setBusinessDetails(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, [id]);

//   if (!businessDetails) {
//     return <div>Loading...</div>; // Show loading while data is being fetched
//   }

//   // Destructure the business details for easier access
  
//   return (
//     <div>
//       <h1>{businessDetails.data.businessName}</h1>
//       <p><strong>Type:</strong> {businessDetails.data.businessType}</p>
//       <p><strong>Stage:</strong> {businessDetails.data.businessStage}</p>
//       <p><strong>Industry:</strong> {businessDetails.data.industry}</p>
//       <p><strong>Location:</strong> {businessDetails.data.location}</p>
//       <p><strong>Revenue:</strong> {businessDetails.data.revenue}</p>
//       <p><strong>Profit:</strong> {businessDetails.data.profit}</p>
//       <p><strong>Number of Employees:</strong> {businessDetails.data.numberOfEmployees}</p>
//       <p><strong>Ownership Percentage:</strong> {businessDetails.data.ownershipPercentage}</p>
//       <p><strong>Reason for Selling:</strong> {businessDetails.data.reasonForSelling}</p>
//       <p><strong>Asking Price:</strong> {businessDetails.data.askingPrice}</p>
//       <p><strong>Intellectual Property:</strong> {businessDetails.data.intellectualProperty}</p>
//       <p><strong>Assets for Sale:</strong> {businessDetails.data.assetsForSale}</p>
//       <p><strong>Liabilities:</strong> {businessDetails.data.liabilities}</p>
//       <p><strong>Financial History:</strong> {businessDetails.data.financialHistory}</p>
//       <p><strong>Sales Forecast:</strong> {businessDetails.data.salesForecast}</p>
//       <p><strong>Marketing Strategy:</strong> {businessDetails.data.marketingStrategy}</p>
//       <p><strong>Competition:</strong> {businessDetails.data.competition}</p>
//       <p><strong>Exit Strategy:</strong> {businessDetails.data.exitStrategy}</p>
//       <p><strong>Legal Issues:</strong> {businessDetails.data.legalIssues}</p>
//       <p><strong>Expected Timeline:</strong> {businessDetails.data.expectedTimeline}</p>
//       <p><strong>Additional Information:</strong> {businessDetails.data.additionalInformation}</p>
//     </div>
//   );
// }

// export default Marketplacedetails;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '@/context/useAuthContext';
import { 
  Building2, BadgeDollarSign, Users, Briefcase, MapPin, TrendingUp,
  PiggyBank, Calendar, Shield, Target, BarChart, FileText,
  Globe, Mail, Phone, Clock, DollarSign, Award, ChevronRight, User
} from 'lucide-react';

const MarketplaceDetails = () => {



const [profile , setProfile] = useState({})


  const fetchUser = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch('http://3.101.12.130:5000/api/v1/auth/get-user-Profile', {
=======
      const response = await fetch(' http://3.101.12.130:5000/api/v1/auth/get-user-Profile', {
>>>>>>> 7d9ec97401d26272f87bfe23684872e8d5978c8a
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          //profileId: user?.id,
        }),
      })

      if (!response.ok) {
        //  navigate('/not-found')
        throw new Error('Network response was not ok')
      }
      if (response.status === 404) {
        // navigate('/not-found')
      }
      const data = await response.json()
      
      setProfile(data?.data)
      console.log(profile.data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } 
  }

  useEffect(() => {

    fetchUser()
  })









  const { id } = useParams();
  const { user } = useAuthContext();
  console.log("user" , user)
  const [businessDetails, setBusinessDetails] = useState(null);
  
  useEffect(() => {
<<<<<<< HEAD
    fetch(`http://3.101.12.130:5000/businessseller/detailuuid/${id}`)
=======
    fetch(` http://3.101.12.130:5000/businessseller/detailuuid/${id}`)
>>>>>>> 7d9ec97401d26272f87bfe23684872e8d5978c8a
      .then(response => response.json())
      .then(data => setBusinessDetails(data))
      .catch(error => console.error('Error:', error));
  }, [id]);






console.log("BusinessDetails" , businessDetails)
  if (!businessDetails) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)' }}>
        <div style={{ padding: '2rem', borderRadius: '12px', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', borderTop: '4px solid #2563eb', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginTop: '1rem', color: '#4b5563' }}>Loading business details...</p>
        </div>
      </div>
    );
  }

  const KeyMetric = ({ icon: Icon, label, value }) => (
    <div className="card" style={{ padding: '1rem', margin: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', transition: 'transform 0.2s', cursor: 'pointer' }}
         onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
         onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ backgroundColor: '#e6f0ff', padding: '0.75rem', borderRadius: '8px' }}>
          <Icon style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{label}</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>{value}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ height: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                <span>Marketplace</span>
                <ChevronRight style={{ width: '1rem', height: '1rem' }} />
                <span>Business Details</span>
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                {businessDetails.data.businessName}
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                <MapPin style={{ width: '1rem', height: '1rem' }} />
                <span style={{ fontSize: '0.875rem' }}>{businessDetails.data.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                <Users style={{ width: '1rem', height: '1rem' }} />
                <span style={{ fontSize: '0.875rem' }}>{businessDetails.data.numberOfEmployees} employees</span>
              </div>
              <button className="btn btn-primary" style={{ backgroundColor: '#2563eb', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ paddingTop: '1.5rem', height: 'calc(100vh - 5rem)' }}>
        <div className="row" style={{ height: '100%' }}>
          <div className="col-8" style={{ paddingRight: '1.5rem', overflowY: 'auto' }}>
            {/* Key Metrics */}
            <div className="row g-3 mb-4">
              <div className="col-3"><KeyMetric icon={TrendingUp} label="TTM Revenue" value={`$${businessDetails.data.revenue}`} /></div>
              <div className="col-3"><KeyMetric icon={BadgeDollarSign} label="Asking Price" value={`$${businessDetails.data.askingPrice}`} /></div>
              <div className="col-3"><KeyMetric icon={PiggyBank} label="TTM Profit" value={`$${businessDetails.data.profit}`} /></div>
              <div className="col-3"><KeyMetric icon={Award} label="Ownership" value={`${businessDetails.data.ownershipPercentage}%`} /></div>
            </div>

            {/* Business Overview */}
            <div className="card mb-4" style={{ padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: '#e6f0ff', padding: '0.75rem', borderRadius: '8px' }}>
                  <Building2 style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Business Overview</h2>
              </div>
              <p style={{ color: '#4b5563', marginBottom: '1rem' }}>{businessDetails.data.additionalInformation}</p>
              <div className="row g-3">
                <div className="col-6">
                  <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Ownership</div>
                    <div style={{ color: '#111827' }}>{businessDetails.data.ownershipPercentage}%</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Industry</div>
                    <div style={{ color: '#111827' }}>{businessDetails.data.industry}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Stage</div>
                    <div style={{ color: '#111827' }}>{businessDetails.data.businessStage}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Employees</div>
                    <div style={{ color: '#111827' }}>{businessDetails.data.numberOfEmployees}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Overview */}
            <div className="card mb-4" style={{ padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: '#e6f0ff', padding: '0.75rem', borderRadius: '8px' }}>
                  <BarChart style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Financial Overview</h2>
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Revenue Breakdown</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#6b7280' }}>Monthly Revenue</span>
                      <span style={{ fontWeight: '500' }}>${businessDetails.data.revenue/12}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>Profit Margin</span>
                      <span style={{ fontWeight: '500' }}>
                        {((businessDetails.data.profit / businessDetails.data.revenue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Assets Included</h3>
                    <p style={{ color: '#6b7280', margin: 0 }}>{businessDetails.data.assetsForSale}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sale Details */}
            <div className="card mb-4" style={{ padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: '#e6f0ff', padding: '0.75rem', borderRadius: '8px' }}>
                  <FileText style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Sale Details</h2>
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Reason for Selling</h3>
                    <p style={{ color: '#6b7280', margin: 0 }}>{businessDetails.data.reasonForSelling}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Expected Timeline</h3>
                    <p style={{ color: '#6b7280', margin: 0 }}>{businessDetails.data.expectedTimeline}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Financing</h3>
                    <p style={{ color: '#6b7280', margin: 0 }}>Bootstrapped</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-4">
            {/* Owner Details */}
            <div className="card mb-4" style={{ padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginTop: 30 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: '#e6f0ff', padding: '0.75rem', borderRadius: '8px' }}>
                  <User style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Owner Details</h2>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <img 
                  src={profile.profileImgUrl || 'https://via.placeholder.com/60'} 
                  alt="Profile" 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #e6f0ff'
                  }} 
                />
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '500', margin: '0 0 0.25rem 0' }}>{user?.firstName +" "+ user?.lastName}</h3>
                  <span style={{ 
                    backgroundColor: '#e6f0ff', 
                    color: '#2563eb',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>{user.occupation}</span>
                  
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Globe style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Location</div>
                    <div style={{ color: '#111827' }}>{user.country}, {user.location}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Email</div>
                    <div style={{ color: '#111827' }}>{user.emailAddress}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div style={{ 
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Interested?</h3>
              <p style={{ color: '#bfdbfe', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Get in touch with the seller to learn more about this opportunity.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button className="btn" style={{ 
                  backgroundColor: 'white',
                  color: '#2563eb',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  fontWeight: '500'
                }}>
                  <Calendar style={{ width: '1rem', height: '1rem' }} />
                  Schedule a Call
                </button>
                <button className="btn" style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  fontWeight: '500'
                }}>
                  <Mail style={{ width: '1rem', height: '1rem' }} />
                  Request Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketplaceDetails;