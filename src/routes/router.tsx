import { Navigate, Route, Routes, type RouteProps } from 'react-router-dom'

import OtherLayout from '@/layouts/OtherLayout'
import { useAuthContext } from '@/context/useAuthContext'
import { appRoutes, authRoutes, feedRoutes, profilePagesRoutes, settingPagesRoutes, socialWithTopbarRoutes, } from '@/routes/index'
import FeedLayout from '@/layouts/FeedLayout'
import SocialLayout from '@/layouts/SocialLayout'
import ProfileLayout from '@/layouts/ProfileLayout'
import SettingLayout from '@/layouts/SettingLayout'
import BusinessSellerForm from '@/app/(plain)/BusinessSeller/BusinessSellerForm'
import JoinRoom from '@/components/live/StreamerInterface'
import Live from '@/components/live/viewerInterface'
import BusinessBuyerForm from '@/app/(plain)/BusinessBuyer/BusinessBuyer'
import Entrepreneurform from '@/app/(plain)/Entrepreneur/Entrepreneurform'
import InvestorForm from '@/app/(plain)/Investor/InvestorForm'
import MarketPlace from '@/app/(plain)/MarketPlace/MarketPlace'
import Founderforms from '@/app/(plain)/Founderform/Founderform'
import AccountSettings from '@/assets/data/clone/accountClone'
import MarketplaceDetails from '@/app/(plain)/Marketplacedetails/Marketplacedetails'
import VisitProfile from '@/components/VisitProfile'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { SOCKET_URL } from '@/utils/api'




const AppRouter = (props: RouteProps) => {
  const socket = io(SOCKET_URL, {
    // path: "/socket.io",
    transports: ['websocket'],
  })
  const {user} = useAuthContext()
  const { isAuthenticated } = useAuthContext()
   useEffect(() => {
      if (user) {
        socket.emit("userOnline", user.id);
        // console.log('userOnline', user.id)
      }
      return () => {
        try {
          if (user) {
            socket.emit("userOffline", user.id);
          }
        } catch (error) {
          console.error('Error during socket disconnection:', error);
        }
      };
    }, [user]);

  return (
    <Routes>
      {(authRoutes || []).map((route, idx) => (
        <Route key={idx + route.name} path={route.path} element={<OtherLayout {...props}>{route.element}</OtherLayout>} />
      ))}

      {(feedRoutes || []).map((route, idx) => (
        <Route 
        key={idx + route.name} 
        path={route.path} 
        element={isAuthenticated ? (
          <FeedLayout {...props}>{route.element}</FeedLayout>
        ) : (
          <Navigate to={{ pathname: '/auth/sign-in', search: 'redirectTo=' + route.path, }} />
        )
        } />
      ))}
    
      {(socialWithTopbarRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={isAuthenticated ? (
            <SocialLayout {...props}>{route.element}</SocialLayout>
          ) :
            (
              <Navigate to={{ pathname: '/auth/sign-in', search: 'redirectTo=' + route.path, }} />
            )
          } />
      ))}

      {(profilePagesRoutes || []).map((route, idx) => (
        <Route 
        key={idx + route.name} 
        path={route.path} 
        element={isAuthenticated ? (
          <ProfileLayout {...props}>{route.element}</ProfileLayout>
        ) :
          (
            <Navigate to={{ pathname: '/auth/sign-in', search: 'redirectTo=' + route.path, }} />
            
            
          )
        } />
      ))}

      {(settingPagesRoutes || []).map((route, idx) => (
        <Route 
        key={idx + route.name} 
        path={route.path} 
        element={isAuthenticated ? (
          <SettingLayout {...props}>{route.element}</SettingLayout>
        ) :
          (
            <Navigate to={{ pathname: '/auth/sign-in', search: 'redirectTo=' + route.path, }} />
          )
        } />
      ))}

      {(appRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={isAuthenticated ? (
            <OtherLayout {...props}>{route.element}</OtherLayout>
          ) :
            (
              <Navigate to={{ pathname: '/auth/sign-in', search: 'redirectTo=' + route.path, }} />
            )
          }
        />
      ))}
      <Route path='/business-seller' element={<BusinessSellerForm/>}></Route>
      <Route path='/business-acquirer' element={<BusinessBuyerForm/>}></Route>
      { <Route path='/entreprenuer' element={<Entrepreneurform/>}></Route> }
      <Route path='/investor' element={<InvestorForm/>}></Route>
      <Route path='/join-live' element={<JoinRoom/>} />
      <Route path='/live' element={<Live/>} />
      <Route path='/AccountClone' element={<AccountSettings/>} />
      <Route path='/marketplace' element={<MarketPlace/>} />
      <Route path='/founder' element={<Founderforms></Founderforms>} />
      <Route path='/marketplacedetails/:id' element={<MarketplaceDetails/>}></Route>
      <Route path='/profile-visitors' element={<VisitProfile/>}></Route>
      {/* <Route path='/coming-soon' element={<PreRegisterPage/>}></Route> */}
    </Routes>
  )
}

export default AppRouter
