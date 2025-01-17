import AccountSettings from './components/AccountSettings'
import PageMetaData from '@/components/PageMetaData'
import InvestorPreferences from '../roles/components/InvestorForm.tsx'
import EntrepreneurForm from '@/app/(plain)/Entrepreneur/Entrepreneurform'
import InvestorForm from '@/app/(plain)/Investor/InvestorForm.tsx'
import BusinessBuyerForm from '@/app/(plain)/BusinessBuyer/BusinessBuyer.tsx'
import BusinessSellerForm from '@/app/(plain)/BusinessSeller/BusinessSellerForm.tsx'
const Account = () => {
  return (
    <>
      <PageMetaData title='Account Settings' />
      <AccountSettings />  
     { /* <EntrepreneurForm/> */}
  {/* <BusinessBuyerForm></BusinessBuyerForm> */}
       {/*<InvestorForm/>*/} 
      {/* <InvestorPreferences/> */}
    </>
  )
}

export default Account
