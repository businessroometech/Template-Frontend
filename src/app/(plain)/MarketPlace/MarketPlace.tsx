import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  'Technology', 'Software Development', 'Consulting', 'Manufacturing',
  'Retail', 'Healthcare', 'E-commerce', 'Others'
];

const MarketPlace = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  console.log(user)
  const [myBusinessData, setMyBusinessData] = useState([]);
  const [allBusinessData, setAllBusinessData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('myBusiness');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBusiness = async () => {
      if (user?.id) {
        try {
       //   const response = await fetch(`https://app-backend-8r74.onrender.com/businessseller/detail/${user.id}`);
          //const data = await response.json();
          setMyBusinessData(Array.isArray(data) ? data : [data]);
        } catch (error) {
          console.error("Error fetching my business data:", error);
          setMyBusinessData([]);
        }
      }
    };

    const fetchAllBusiness = async () => {
      try {
        const response = await fetch('https://app-backend-8r74.onrender.com/businessseller/getall');
        const data = await response.json();
        setAllBusinessData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching all business data:", error);
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
    const data = activeTab === 'myBusiness' ? myBusinessData : allBusinessData;
    return selectedCategory === 'All' 
      ? data 
      : data.filter(business => business.data.industry === selectedCategory);
  };

  const formatCurrency = (value) => value ? (value.startsWith('$') ? value : `$${value}`) : 'N/A';

  const tabStyle = (isActive) => ({
      padding: '8px 16px',
      cursor: 'pointer',
      border: '1.6px solid transparent',
      borderBottom: isActive ? '1.6px solid #007bff' : '1.6px solid transparent',
      color: isActive ? '#007bff' : '#fff',
      marginRight: '16px',
      transition: 'all 0.3s ease',
      fontSize: '0.8rem',
      backgroundColor: 'transparent', // Added to make background transparent
     
    
  });

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-md-3 border-end border-secondary p-4">
          <div className="text-center mb-4">
            <div className="position-relative d-inline-block">
              <img
                src="https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg"
                alt="Profile"
                className="rounded-circle mb-3 h-60px"
              />
            </div>
            <h3 className="h5 mb-1">{user?.firstName + " "+ user?.lastName}</h3>
            <p className="text-muted mb-1">{user?.role}</p>
            <p className="text-muted small">{user?.country}</p>
          </div>

          <div className="nav flex-column">
            <Link to="/feed/home" className="nav-link text-light py-2">🏠 Feed</Link>
            <Link to="/" className="nav-link text-light py-2">👥 Connections</Link>
            <Link to="/" className="nav-link text-light py-2">📰 Latest News</Link>
            <Link to="/settings/account" className="nav-link text-light py-2">⚙️ Settings</Link>
          </div>

          <div className="mt-4">
            <Link to="/profile/about">
              <button className="btn btn-outline-light w-100">View Profile</button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3">Acquireroom Marketplace</h1>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/business-seller')}
            >
              Register Your Business
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="mb-3">
            <label htmlFor="categorySelect" className="form-label text-light">Sort By Category</label>
            <select 
              id="categorySelect" 
              className="form-select bg-dark text-light border-secondary"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Tab Slider */}
          <div className="d-flex border-bottom border-secondary mb-4">
            <button
              style={tabStyle(activeTab === 'myBusiness')}
              onClick={() => setActiveTab('myBusiness')}
            >
             <h6>My Business</h6> 
            </button>
            <button
              style={tabStyle(activeTab === 'exploreMore')}
              onClick={() => setActiveTab('exploreMore')}
            >
            <h6>Explore More</h6>
            </button>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4 h-10px">
              {getCurrentData().map((business) => (
                <div key={business.data.id} className="col-md-6 mb-4">
                  <div className="card bg-dark border border-secondary h-100">
                    <div className="card-header border-bottom border-secondary">
                      {/* <h5 className="card-title mb-0">
                        {business.data.businessName || business.data.businessType || "Unnamed"}
                      </h5> */}
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <span className="badge bg-secondary">{business.data.industry || "undefined"}</span>
                        <span className="badge bg-info">{business.data.businessStage}</span>
                      </div>
                      <div className="mb-3">
                        <i className="bi bi-geo-alt me-2"></i>
                        {business.data.location}
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col-6">
                          <div className="p-3 border border-secondary rounded">
                            <div className="small text-muted">Revenue</div>
                            <div className="fw-bold">{formatCurrency(business.data.revenue)}</div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="p-3 border border-secondary rounded">
                            <div className="small text-muted">Asking Price</div>
                            <div className="fw-bold">{formatCurrency(business.data.askingPrice)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <h6>Business Details</h6>
                        <ul className="list-unstyled">
                          <li className="mb-2">Profit: {formatCurrency(business.data.profit)}</li>
                          <li className="mb-2">Ownership: {business.data.ownershipPercentage}</li>
                        </ul>
                      </div>
                      <div className="mb-3">
                        <h6>Additional Information</h6>
                        <p className="small">{business.data.additionalInformation}</p>
                      </div>
                      <button className="btn btn-primary w-100 mt-3">
                        {activeTab === 'myBusiness' ? 'Edit Details' : 'Connect'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {getCurrentData().length === 0 && (
                <div className="col-12 text-center py-5">
                  <h4 className="text-muted">
                    {activeTab === 'myBusiness' 
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
  );
};

export default MarketPlace;
