import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'
import '../styles/globals.css'

import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {

  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Component {...pageProps} />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </UserContext.Provider>
  )
}

export default MyApp
