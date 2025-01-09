import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Briefcase, LineChart, Lightbulb } from 'lucide-react';

const FourProfiles = () => {
  const profiles = [
    {
      title: "Business Seller",
      description: "List your business and connect with potential buyers",
      icon: <Building2 size={32} className="mb-4" />,
      path: "/businesssellerform",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Investor",
      description: "Discover promising investment opportunities",
      icon: <LineChart size={32} className="mb-4" />,
      path: "/investor",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Business Acquirer",
      description: "Find and purchase established businesses",
      icon: <Briefcase size={32} className="mb-4" />,
      path: "/business-acquirer",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      title: "Entrepreneur",
      description: "Start your journey as a business owner",
      icon: <Lightbulb size={32} className="mb-4" />,
      path: "/entrepreneur",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left Side Hero Section */}
      <div className="w-1/2 relative">
        <div 
          className="h-full bg-cover bg-center" 
          style={{ backgroundImage: "url('/api/placeholder/800/1200')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          <div className="relative h-full flex flex-col justify-center p-12">
            <h1 className="text-6xl font-bold text-white mb-6">
              Your Journey <br />
              Starts Here
            </h1>
            <p className="text-xl text-gray-200 max-w-md">
              Connect with opportunities that match your goals and expertise in the business marketplace.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side Profiles */}
      <div className="w-1/2 bg-gray-50">
        <div className="h-full flex flex-col justify-center p-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Choose Your Path
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Select the role that best describes your business goals
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            {profiles.map((profile, index) => (
              <Link 
                key={index}
                to={profile.path}
                className="group transform transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`
                  h-full p-6 rounded-xl bg-white shadow-lg
                  border border-gray-100 hover:shadow-xl
                  transition-all duration-300
                `}>
                  <div className={`
                    w-16 h-16 rounded-full mb-4
                    flex items-center justify-center
                    bg-gradient-to-r ${profile.gradient}
                    text-white
                  `}>
                    {profile.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {profile.title}
                  </h3>
                  <p className="text-gray-600">
                    {profile.description}
                  </p>
                  <div className="mt-4 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                    Get Started →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourProfiles;