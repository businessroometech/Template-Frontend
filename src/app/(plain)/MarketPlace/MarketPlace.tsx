// import React, { useState, useEffect } from 'react';
// import { useAuthContext } from '@/context/useAuthContext';
// import { Link, useNavigate } from 'react-router-dom';

// const categories = [
//   'Technology', 'Software Development', 'Consulting', 'Manufacturing',
//   'Retail', 'Healthcare', 'E-commerce', 'Others'
// ];

// const MarketPlace = () => {
//   const navigate = useNavigate();
//   const { user } = useAuthContext();
//   const [myBusinessData, setMyBusinessData] = useState([]);
//   const [allBusinessData, setAllBusinessData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [activeTab, setActiveTab] = useState('myBusiness');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMyBusiness = async () => {
//       if (user?.id) {
//         try {
//           const response = await fetch(`http://localhost:5000/businessseller/detail/${user.id}`);
//           const data = await response.json();
//           setMyBusinessData(Array.isArray(data) ? data : [data]);
//         } catch (error) {
//           console.error("Error fetching my business data:", error);
//           setMyBusinessData([]);
//         }
//       }
//     };

//     const fetchAllBusiness = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/businessseller/getall');
//         const result = await response.json();
        
//         // Extract the data array from the response
//         if (result.success && Array.isArray(result.data)) {
//           // Filter out entries with null businessName
//           const validBusinesses = result.data.filter(business => 
//             business.businessName !== null && 
//             business.businessType !== null
//           );
//           setAllBusinessData(validBusinesses);
//         } else {
//           console.error("Unexpected data format:", result);
//           setAllBusinessData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching all business data:", error);
//         setAllBusinessData([]);
//       }
//     };

//     const fetchData = async () => {
//       setLoading(true);
//       if (activeTab === 'myBusiness') {
//         await fetchMyBusiness();
//       } else {
//         await fetchAllBusiness();
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [user?.id, activeTab]);

//   const getCurrentData = () => {
//     const data = activeTab === 'myBusiness' ? myBusinessData : allBusinessData;
//     return selectedCategory === 'All' 
//       ? data 
//       : data.filter(business => business.industry === selectedCategory);
//   };
//   const formatCurrency = (value) => value ? (value.startsWith('$') ? value : `$${value}`) : 'N/A';

//   const tabStyle = (isActive) => ({
//       padding: '8px 16px',
//       cursor: 'pointer',
//       border: '1.6px solid transparent',
//       borderBottom: isActive ? '1.6px solid #007bff' : '1.6px solid transparent',
//       color: isActive ? '#007bff' : '#fff',
//       marginRight: '16px',
//       transition: 'all 0.3s ease',
//       fontSize: '0.8rem',
//       backgroundColor: 'transparent', // Added to make background transparent
     
    
//   });

//   return (
//     <div className="container-fluid bg-dark text-light min-vh-100">
//       <div className="row">
//         {/* Left Sidebar */}
//         <div className="col-md-3 border-end border-secondary p-4">
//           <div className="text-center mb-4">
//             <div className="position-relative d-inline-block">
//               <img
//                 src="https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg"
//                 alt="Profile"
//                 className="rounded-circle mb-3 h-60px"
//               />
//             </div>
//             <h3 className="h5 mb-1">{user?.firstName + " "+ user?.lastName}</h3>
//             <p className="text-muted mb-1">{user?.role}</p>
//             <p className="text-muted small">{user?.country}</p>
//           </div>

//           <div className="nav flex-column">
//             <Link to="/feed/home" className="nav-link text-light py-2">🏠 Feed</Link>
//             <Link to="/" className="nav-link text-light py-2">👥 Connections</Link>
//             <Link to="/" className="nav-link text-light py-2">📰 Latest News</Link>
//             <Link to="/settings/account" className="nav-link text-light py-2">⚙️ Settings</Link>
//           </div>

//           <div className="mt-4">
//             <Link to="/profile/about">
//               <button className="btn btn-outline-light w-100">View Profile</button>
//             </Link>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-9 p-4">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h1 className="h3">Acquireroom Marketplace</h1>
//             <button 
//               className="btn btn-primary" 
//               onClick={() => navigate('/business-seller')}
//             >
//               Register Your Business
//             </button>
//           </div>

//           {/* Sort By Dropdown */}
//           <div className="mb-3">
//             <label htmlFor="categorySelect" className="form-label text-light">Sort By Category</label>
//             <select 
//               id="categorySelect" 
//               className="form-select bg-dark text-light border-secondary"
//               value={selectedCategory} 
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               <option value="All">All Categories</option>
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>

//           {/* Tab Slider */}
//           <div className="d-flex border-bottom border-secondary mb-4">
//             <button
//               style={tabStyle(activeTab === 'myBusiness')}
//               onClick={() => setActiveTab('myBusiness')}
//             >
//              <h6>My Business</h6> 
//             </button>
//             <button
//               style={tabStyle(activeTab === 'exploreMore')}
//               onClick={() => setActiveTab('exploreMore')}
//             >
//             <h6>Explore More</h6>
//             </button>
//           </div>

//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-light" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           ) : (
//               <div className="row g-4 h-10px">
//       {getCurrentData().map((business) => (
//         <div key={business.id} className="col-md-6 mb-4">
//           <div className="card bg-dark border border-secondary h-100">
//             <div className="card-header border-bottom border-secondary">
//               <h5 className="card-title mb-0">
//                 {activeTab == "myBusiness" ? business.data.businessName :business.businessName || business.businessType || "Unnamed"}
//               </h5>
//             </div>
//             <div className="card-body">
//               <div className="d-flex justify-content-between mb-3">
//                 <span className="badge bg-secondary">{activeTab == "myBusiness" ? business.data.industry :business.industry || "undefined"}</span>
//                 <span className="badge bg-info">{activeTab == "myBusiness" ? business.data.businessStage :business.businessStage}</span>
//               </div>
//               <div className="mb-3">
//                 <i className="bi bi-geo-alt me-2"></i>
//                 {activeTab == "myBusiness" ? business.data.location :business.location}
//               </div>
//               <div className="row g-3 mb-3">
//                 <div className="col-6">
//                   <div className="p-3 border border-secondary rounded">
//                     <div className="small text-muted">Revenue</div>
//                     <div className="fw-bold">{activeTab == "myBusiness" ? formatCurrency(business.data.revenue) :formatCurrency(business.revenue)}</div>
//                   </div>
//                 </div>
//                 <div className="col-6">
//                   <div className="p-3 border border-secondary rounded">
//                     <div className="small text-muted">Asking Price</div>
//                     <div className="fw-bold">{activeTab == "myBusiness" ? formatCurrency(business.data.askingPrice) :formatCurrency(business.askingPrice)}</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <h6>Business Details</h6>
//                 <ul className="list-unstyled">
//                   <li className="mb-2">Profit: {activeTab == "myBusiness" ? formatCurrency(business.data.profit) :formatCurrency(business.profit)}</li>
//                   <li className="mb-2">Ownership: {activeTab == "myBusiness" ? business.data.ownershipPercentage :business.ownershipPercentage}</li>
//                 </ul>
//               </div>
//               <div className="mb-3">
//                 <h6>Additional Information</h6>
//                 <p className="small">{activeTab == "myBusiness" ? business.data.additionalInformation :business.additionalInformation}</p>
//               </div>
//               <button className="btn btn-primary w-100 mt-3">
//                 {activeTab === 'myBusiness' ? 'Edit Details' : 'Connect'}
//               </button>
//             </div>
//           </div>
//         </div>
//       ))} 
         
//               {getCurrentData().length === 0 && (
//                 <div className="col-12 text-center py-5">
//                   <h4 className="text-muted">
//                     {activeTab === 'myBusiness' 
//                       ? "You haven't registered any businesses yet" 
//                       : "No businesses available to explore"}
//                   </h4>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default MarketPlace;




import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Users, DollarSign, TrendingUp, PiggyBank } from 'lucide-react';

const categories = [
   'Agency', 'SaaS', 'Mobile App',
  'Retail', 'Healthcare', 'E-commerce' , "Shopify app", "Content","Main Street", 'Others'
];

const MarketPlace = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  console.log("user" , user)
  const [myBusinessData, setMyBusinessData] = useState([]);
  const [allBusinessData, setAllBusinessData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('myBusiness');
  const [loading, setLoading] = useState(true);
  const isMyBusiness = activeTab === 'myBusiness';

  useEffect(() => {
    const fetchMyBusiness = async () => {
      console.log(user?.id)
      if (user?.id) {
        try {
<<<<<<< HEAD
          const response = await fetch(`http://3.101.12.130:5000/businessseller/detail/${user.id}`);
=======
          const response = await fetch(` http://3.101.12.130:5000/businessseller/detail/${user.id}`);
>>>>>>> 7d9ec97401d26272f87bfe23684872e8d5978c8a
          const data = await response.json();
          
          setMyBusinessData(Array.isArray(data) ? data : [data]);
        } catch (error) {
          console.error("Error fetching my business data:", error);
          setMyBusinessData([]);
        }
      }
    };

    const fetchAllBusiness = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch('http://3.101.12.130:5000/businessseller/getall');
=======
        const response = await fetch(' http://3.101.12.130:5000/businessseller/getall');
>>>>>>> 7d9ec97401d26272f87bfe23684872e8d5978c8a
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          const validBusinesses = result.data.filter(business => 
            business.businessName !== null && business.businessType !== null
          );
          setAllBusinessData(validBusinesses);
        } else {
          setAllBusinessData([]);
        }
      } catch (error) {
        setAllBusinessData([]);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      if (activeTab === 'myBusiness') {
        await fetchMyBusiness();
      } else {
        await fetchAllBusiness();
      }
      setLoading(false);
    };

    fetchData();
  }, [user?.id, activeTab]);

  const getCurrentData = () => {
    const data = isMyBusiness ? myBusinessData : allBusinessData;
    return selectedCategory === 'All' 
      ? data 
      : data.filter(business => business.industry === selectedCategory);
  };

  const formatCurrency = (value) => value ? (value.startsWith('$') ? value : `$${value}`) : 'N/A';

  const tabStyle = (isActive) => ({
    padding: '12px 24px',
    cursor: 'pointer',
    borderBottom: isActive ? '3px solid #0d6efd' : '3px solid transparent',
    color: isActive ? '#0d6efd' : '#6c757d',
    marginRight: '24px',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontWeight: isActive ? '600' : '500',
    backgroundColor: 'transparent',
    border: 'none',
  });

  const MetricBox = ({ icon: Icon, label, value }) => (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      flex: 1 
    }}>
      <Icon style={{ width: '1.25rem', height: '1.25rem', color: '#0d6efd' }} />
      <div>
        <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>{label}</div>
        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#212529' }}>{value}</div>
      </div>
    </div>
  );
  console.log('My Business Data:', myBusinessData);
  console.log('All Business Data:', allBusinessData);
  
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3" style={{ 
            backgroundColor: 'white', 
            padding: '2rem',
            borderRight: '1px solid #dee2e6',
            minHeight: '100vh'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  style={{ 
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '3px solid #e9ecef'
                  }}
                />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{user?.firstName} {user?.lastName}</h3>
              <p style={{ color: '#6c757d', marginBottom: '0.25rem' }}>{user?.role}</p>
              <p style={{ color: '#6c757d', fontSize: '0.875rem' }}>{user?.country}</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Link to="/feed/home" className="d-flex align-items-center text-decoration-none text-dark p-2 mb-2 rounded hover-bg-light">
                🏠 <span className="ms-2">Feed</span>
              </Link>
              <Link to="/" className="d-flex align-items-center text-decoration-none text-dark p-2 mb-2 rounded hover-bg-light">
                👥 <span className="ms-2">Connections</span>
              </Link>
              <Link to="/" className="d-flex align-items-center text-decoration-none text-dark p-2 mb-2 rounded hover-bg-light">
                📰 <span className="ms-2">Latest News</span>
              </Link>
              <Link to="/settings/account" className="d-flex align-items-center text-decoration-none text-dark p-2 rounded hover-bg-light">
                ⚙️ <span className="ms-2">Settings</span>
              </Link>
            </div>

            <Link to="/profile/about" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #212529',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: '#212529',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}>
                View Profile
              </button>
            </Link>
          </div>

          {/* Main Content */}
          <div className="col-md-9" style={{ padding: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '2rem' 
            }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '600', margin: 0 }}>Acquireroom Marketplace</h1>
              <button 
                className="btn btn-primary"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: '500'
                }}
                onClick={() => navigate('/business-seller')}
              >
                List Your Business
              </button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ marginBottom: '0.5rem', display: 'block' }}>Sort By Category</label>
              <select 
                className="form-select"
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                  backgroundColor: 'white'
                }}
              >
                <option value="All">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div style={{ 
              display: 'flex',
              borderBottom: '1px solid #dee2e6',
              marginBottom: '2rem'
            }}>
              <button
                style={tabStyle(activeTab === 'exploreMore')}
                onClick={() => setActiveTab('exploreMore')}
              >
                Explore More
              </button>
              <button
                style={tabStyle(activeTab === 'myBusiness')}
                onClick={() => setActiveTab('myBusiness')}
              >
                My Listing
              </button>
            </div>

            {loading ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '200px' 
              }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {getCurrentData().map((business) => {
                  console.log("business" ,business)
                  const data = isMyBusiness ? business.data[0] : business;
                  return (
                    <div key={business.id} className="col-md-6">
                      <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        height: '100%',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'pointer',
                      }} className="hover-card">
                        <div style={{ padding: '1.5rem' }}>
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'start',
                            marginBottom: '1rem'
                          }}>
                            <div>
                              <h5 style={{ 
                                fontSize: '1.25rem', 
                                fontWeight: '600',
                                marginBottom: '0.5rem'
                              }}>
                                {isMyBusiness ? business.data[0].businessName : business.businessName || "Unnamed"}
                              </h5>
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem',
                                color: '#6c757d'
                              }}>
                                <MapPin size={16} />
                                <span style={{ fontSize: '0.875rem' }}>{isMyBusiness ? business.data[0].location : business.location}</span>
                              </div>
                            </div>
                            <div style={{ 
                              backgroundColor: '#e9ecef',
                              padding: '0.5rem 1rem',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: '500'
                            }}>
                              {isMyBusiness ? business.data[0].industry : business.industry || "undefined"}
                            </div>
                          </div>

                          <div style={{ 
                            display: 'flex', 
                            gap: '0.75rem',
                            marginBottom: '1.5rem' 
                          }}>
                            <MetricBox 
                              icon={DollarSign}
                              label="Asking Price"
                              value={formatCurrency(isMyBusiness ? business.data[0].askingPrice : business.askingPrice)}
                              
                            />
                            <MetricBox 
                              icon={TrendingUp}
                              label="TTM Revenue"
                              value={formatCurrency(isMyBusiness ? business.data[0].revenue : business.revenue)}
                            />
                            <MetricBox 
                              icon={PiggyBank}
                              label="TTM Profit"
                              value={formatCurrency(isMyBusiness ? business.data[0].profit : business.profit)}
                            />
                          </div>
                          <div style={{ marginBottom: '1.5rem' }}>
                            <h6 style={{ 
                              fontSize: '0.875rem', 
                              fontWeight: '600',
                              marginBottom: '0.5rem'
                            }}>
                              About
                            </h6>
                            <p style={{ 
                              fontSize: '0.875rem',
                              color: '#6c757d',
                              margin: 0,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {isMyBusiness ? business.data[0].additionalInformation : business.additionalInformation}
                            </p>
                          </div>

                          <Link 
                            to={`/marketplacedetails/${isMyBusiness ? business.data[0].id : business.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <button style={{
                              width: '100%',
                              padding: '0.75rem',
                              backgroundColor: '#0d6efd',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              fontWeight: '500',
                              transition: 'background-color 0.2s ease'
                            }}>
                              {isMyBusiness ? 'View Details' : 'Learn More'}
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {getCurrentData().length === 0 && (
                  <div style={{ 
                    textAlign: 'center',
                    padding: '3rem',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    width: '100%'
                  }}>
                    <h4 style={{ color: '#6c757d', margin: 0 }}>
                      {isMyBusiness 
                        ? "You haven't registered any businesses yet" 
                        : "No businesses available to explore"}
                    </h4>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .hover-bg-light:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default MarketPlace;