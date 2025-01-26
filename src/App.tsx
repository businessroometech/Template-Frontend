import { useEffect, useState } from "react"
import AppProvidersWrapper from "./components/wrappers/AppProvidersWrapper"
import configureFakeBackend from "./helpers/fake-backend"
import AppRouter from "./routes/router"
import { OnlineUsersProvider } from "./context/OnlineUser."
import '@/assets/scss/style.scss'

configureFakeBackend()

function App() {

  return (
    <AppProvidersWrapper>
      <OnlineUsersProvider>
        <AppRouter />
      </OnlineUsersProvider>
    </AppProvidersWrapper>
  )
}

export default App
