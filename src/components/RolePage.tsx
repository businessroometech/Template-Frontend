import BusinessBuyerForm from "@/app/(plain)/BusinessSeller/BusinessSellerForm.tsx";
import EntrepreneurForm from "@/app/(plain)/Entrepreneur/Entrepreneurform";
import InvestorForm from "@/app/(plain)/Investor/InvestorForm.tsx";
import BusinessSellerForm from '@/app/(plain)/BusinessSeller/BusinessSellerForm';

const RolePage = () => {
    const role = "entrepreuer"; // Replace with actual role logic or props
  
    const renderContent = () => {
      switch (role) {
        case "entrepreuer" :
          return <EntrepreneurForm/>;
        case "Investor":
          return <InvestorForm/>;
        case "bussiness-buyer":
          return <BusinessBuyerForm/>;
        case "bussiness-seller":
          return <BusinessSellerForm/>;
        default:
          return (<div>Please log in to see your role-specific content.</div>);
      }
    };
  
    return <div>{renderContent()}</div>;
  };
  
  export default RolePage;