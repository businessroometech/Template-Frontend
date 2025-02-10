import React, { useEffect, useState } from 'react';
import { Building2, MapPin, Briefcase, DollarSign, Clock, TrendingUp, GraduationCap, FileCheck, Info, Loader2, Trash } from 'lucide-react';
import { useAuthContext } from '@/context/useAuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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

// Fallback business data when API fails
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

const BusinessCard: React.FC<{ business: Business }> = ({ business }) => {
const navigate = useNavigate()
const { id } = useParams();

const handledelete = async () => {
  try {
    await fetch(`http://13.216.146.100/api/v1/businessbuyer/delete/${id}`, {
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
















  const isPlaceholder = business.businessType === 'N/A';
 
  return (
    <div className={`card shadow-lg border-0 overflow-hidden ${isPlaceholder ? 'opacity-75' : ''}`}>
      <div className="card-header bg-gradient text-gray py-3" style={{display:"flex"}}>
        <div className="d-flex align-items-center">
          <Building2 className="me-3" size={28} />
          <div>
            <h3 className="mb-0 fw-bold">{business.data.businessType}</h3>
            <p className="mb-0 opacity-75 d-flex align-items-center">
              <MapPin size={16} className="me-1" />
              {business.data.businessLocation}
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
                {business.data.businessModel}
              </div>
              <div className="badge bg-success bg-gradient p-2 d-flex align-items-center">
                <DollarSign size={16} className="me-1" />
                {business.data.budget}
              </div>
              <div className="badge bg-info bg-gradient p-2 d-flex align-items-center">
                <Clock size={16} className="me-1" />
                {business.data.timeline}
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="col-md-6">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <DollarSign className="me-2 text-primary" size={24} />
                  Financial Overview
                </h5>
                <ul className="list-group list-group-flush bg-transparent">
                  <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Total Budget</span>
                    <span className="badge bg-primary rounded-pill">{business.data.budget}</span>
                  </li>
                  <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Renovation Investment</span>
                    <span className="badge bg-primary rounded-pill">{business.data.renovationInvestment}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Growth & Support */}
          <div className="col-md-6">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <TrendingUp className="me-2 text-primary" size={24} />
                  Growth Strategy
                </h5>
                <ul className="list-group list-group-flush bg-transparent">
                  <li className="list-group-item bg-transparent">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-semibold">Growth Preference</span>
                      <span className="badge bg-success rounded-pill">{business.data.growthOrStableCashFlow}</span>
                    </div>
                  </li>
                  <li className="list-group-item bg-transparent">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-semibold">Timeline</span>
                      <span className="badge bg-success rounded-pill">{business.data.timeline}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="col-12">
            <div className="card border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <Info className="me-2 text-primary" size={24} />
                  Additional Details
                </h5>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="p-3 border rounded bg-white">
                      <h6 className="fw-bold mb-2 d-flex align-items-center">
                        <GraduationCap size={18} className="me-2" />
                        Support & Training
                      </h6>
                      <p className="mb-0 text-muted">{business.data.supportAfterPurchase}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 border rounded bg-white">
                      <h6 className="fw-bold mb-2 d-flex align-items-center">
                        <FileCheck size={18} className="me-2" />
                        NDA Status
                      </h6>
                      <p className="mb-0 text-muted">{business.data.ndaAgreement}</p>
                    </div>
                  </div>
                  {business.additionalInfo !== 'N/A' && (
                    <div className="col-12">
                      <div className="p-3 border rounded bg-white">
                        <h6 className="fw-bold mb-2">Additional Information</h6>
                        <p className="mb-0 text-muted">{business.data.additionalInfo}</p>
                      </div>
                    </div>
                  )}
                <Button onClick={()=> {
                  navigate(`/profile/editabout/${id}`)
                }}>Edit Your Profile</Button>
                  <Button style={{ cursor:"pointer", marginTop:"4px", backgroundColor:"red"}}   onClick={() => {
                                      handledelete()
                                      }}>
                                    <Trash></Trash>
                                      Delete Your Profile
                                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function AboutBusinessBuyer() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const {user} = useAuthContext()
const { id } = useParams();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(`http://13.216.146.100/api/v1/businessbuyer/get/${id}`); // Replace with your actual API endpoint

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBusinesses(Array.isArray(data) ? data : [data]); // Handle both array and single object responses
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
  }, []);
  
  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <Loader2 className="animate-spin mb-2" size={40} />
          <p className="text-muted">Loading business profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
       
       
        <div className="row g-4">
          {businesses.map((business, index) => (
            <div key={index} className="col-12">
              <BusinessCard business={business} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutBusinessBuyer;