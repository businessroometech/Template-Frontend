import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ConnectionRequest } from "@/layouts/ProfileLayout";
import MyConnections from '@/assets/data/clone/MyConnections';
import ConnectionsStatus from '@/assets/data/clone/ConnectionsStatus';
import SuggestedConnections from '@/assets/data/clone/SuggestedConnections';
import { FaUserFriends, FaUserCheck, FaUserPlus, FaUsers } from 'react-icons/fa';
import PageMetaData from '@/components/PageMetaData';
import { useSearchParams } from 'react-router-dom';

const ManageConnections = () => {
  
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0); // Default step

  useEffect(() => {
    let index = searchParams.get("t");
    if (index === null) index = "0";

    let parsedIndex = parseInt(index, 10);
    if (isNaN(parsedIndex)) parsedIndex = 0;
    
    setStep(parsedIndex % 4); // Ensure it's within bounds
  }, [searchParams]); // Run effect when searchParams change

  const sections = [
    { title: "My Connections", icon: <FaUserPlus style={{ marginRight: "8px" }} />, component: <MyConnections /> },
    { title: "Request Sent", icon: <FaUserCheck style={{ marginRight: "8px" }} />, component: <ConnectionsStatus /> },
    { title: "Request Received", icon: <FaUserFriends style={{ marginRight: "8px" }} />, component: <ConnectionRequest /> },
    { title: "Suggested Connections", icon: <FaUsers style={{ marginRight: "8px" }} />, component: <SuggestedConnections /> },
  ];

  const setCurrentSection = (index) => {
    setStep(index);
  };

  return (
    <div className="container-fluid px-0">
    <PageMetaData title="ManageConnections" />
  
    {/* Section Tabs */}
    <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
      {sections.map((section, index) => (
        <button
          key={index}
          type="button"
          className={`btn d-flex align-items-center ${
            step === index ? "btn-primary text-white" : "btn-outline-primary"
          }`}
          onClick={() => setCurrentSection(index)}
        >
          {section.icon} {section.title}
        </button>
      ))}
    </div>
  
    {/* Section Content */}
    <div className="w-100 mx-auto">
      {sections[step].component}
    </div>
  </div>
  
  );
};

export default ManageConnections;
