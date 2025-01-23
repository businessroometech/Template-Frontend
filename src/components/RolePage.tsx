import BusinessBuyerForm from "@/app/(plain)/BusinessBuyer/BusinessBuyer.tsx";
// import EntrepreneurForm from "@/app/(plain)/Entrepreneur/Entrepreneurform";
import InvestorForm from "@/app/(plain)/Investor/InvestorForm.tsx";
import BusinessSellerForm from '@/app/(plain)/BusinessSeller/BusinessSellerForm';
import { useAuthContext } from "@/context/useAuthContext";

const RolePage = () => {
    const {user} = useAuthContext();
    console.log('-----user-----',user);
    const role = "Entrepreneur"; // Replace with actual role logic or props
    console.log(role);
    const renderContent = () => {
      switch (role) {
        case "Entrepreneur" : 
          // <EntrepreneurForm/>
          break;
        case "Investor":
          return <InvestorForm/>;
          break;
        case "Business Acquirer":
                   return <BusinessBuyerForm/>;
          break;
        case "Business Seller":
          return <BusinessSellerForm/>
          break;
        default:
          return (<div>You have no role</div>);
      }
    };
  
    return <div>{renderContent()}</div>;
  };
  
  export default RolePage;