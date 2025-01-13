import AccountSettings from './components/AccountSettings'
import PageMetaData from '@/components/PageMetaData'
import InvestorPreferences from '../roles/components/InvestorForm'
import EntrepreneurForm from '@/app/(plain)/Entrepreneur/Entrepreneurform'
import InvestorForm from '@/app/(plain)/Investor/InvestorForm.tsx'
const Account = () => {
  return (
    <>
      <PageMetaData title='Account Settings' />
      {/*<AccountSettings /> */}
     { /* <EntrepreneurForm/> */}
       {<InvestorForm/>} 
      {/* <InvestorPreferences/> */}
    </>
  )
}

export default Account
