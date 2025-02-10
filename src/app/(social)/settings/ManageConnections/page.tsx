import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ConnectionRequest } from "@/layouts/ProfileLayout";
import MyConnections from "@/assets/data/clone/MyConnections";
import ConnectionsStatus from "@/assets/data/clone/ConnectionsStatus";
import SuggestedConnections from "@/assets/data/clone/SuggestedConnections";
import { FaUserFriends, FaUserCheck, FaUserPlus, FaUsers } from "react-icons/fa";
import PageMetaData from "@/components/PageMetaData";
import { useSearchParams } from "react-router-dom";

const ManageConnections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(0);

  useEffect(() => {
    let index = searchParams.get("t") || "0";
    let parsedIndex = parseInt(index, 10);
    if (isNaN(parsedIndex)) parsedIndex = 0;
    setStep(parsedIndex % 4);
  }, [searchParams]);

  const sections = [
    { title: "My Connections", icon: <FaUserPlus />, component: <MyConnections /> },
    { title: "Request Sent", icon: <FaUserCheck />, component: <ConnectionsStatus /> },
    { title: "Request Received", icon: <FaUserFriends />, component: <ConnectionRequest /> },
    { title: "Connect & Grow", icon: <FaUsers />, component: <SuggestedConnections /> },
  ];

  const setCurrentSection = (index) => {
    setStep(index);
    setSearchParams({ t: index });
  };

  return (
    <div className="container-fluid px-0">
      <PageMetaData title="Manage Connections" />
      <div className="tabs-container">
      {sections.map((section, index) => (
        <button
        key={index}
        type="button"
        className={`tab-btn ${step === index ? "active" : ""}`}
        onClick={() => setCurrentSection(index)}
        >
        <div className="icon">{section.icon}</div>
        <span className="title">{section.title}</span>
        </button>
      ))}
      </div>
      <div className="content-container">
      {sections[step].component}
      </div>
      <style>
      {`
        .tab-btn {
        background: #f0f2f5;
        border-radius: 12px;
        color: #007bff;
        width: 180px;
        height: 80px;
        font-size: 15px;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        cursor: pointer;
        border: none;
        margin: 10px;
        }

        .tab-btn.active {
        background: #007bff;
        color: white;
        }

        .icon {
        font-size: 24px;
        margin-bottom: 5px;
        }

        .title {
        font-size: 14px;
        }

        .tabs-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        padding:10px;
        background: white;
        border-radius: 12px;
        width: 89%;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        margin: 0 auto 20px auto;
        gap: 5px;
        }

        .content-container {
        padding: 20px;
        background: white;
        border-radius: 12px;
        width: 90%;
        max-width: 900px;
        margin: 0 auto;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
      `}
      </style>
    </div>
  );
};

export default ManageConnections;
