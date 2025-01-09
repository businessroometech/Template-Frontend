import AccountSettings from './components/AccountSettings'
import PageMetaData from '@/components/PageMetaData'
import InvestorPreferences from '../roles/components/InvestorForm'
const Account = () => {
  return (
    <>
      <PageMetaData title='Account Settings' />
      <AccountSettings />
      {/* <InvestorPreferences/> */}
    </>
  )
}

export default Account
