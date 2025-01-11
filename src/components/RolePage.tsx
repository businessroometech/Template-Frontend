import BusinessBuyerForm from "@/app/(plain)/BusinessSeller/BusinessSellerForm.tsx";
import EntrepreneurForm from "@/app/(plain)/Entrepreneur/Entrepreneurform";
import InvestorForm from "@/app/(plain)/Investor/InvestorForm.tsx";
import BusinessSellerForm from '@/app/(plain)/BusinessSeller/BusinessSellerForm';
import { useAuthContext } from "@/context/useAuthContext";

const RolePage = () => {
    const {user} = useAuthContext();
    console.log('-----user-----',user);
    const role = user.userRole; // Replace with actual role logic or props
    console.log(role);
    const renderContent = () => {
      switch (role) {
        case "Entrepreneur" :
          return <EntrepreneurForm/>;
        case "Investor":
          return <InvestorForm/>;
        case "BussinessAcquirer":
          return <BusinessBuyerForm/>;
        case "BussinessSeller":
          return <BusinessSellerForm/>;
        default:
          return (<div>Error configuring roles</div>);
      }
    };
  
    return <div>{renderContent()}</div>;
  };
  
  export default RolePage;