import '../styles/globals.css'
import Layout from '../components/layout';
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'

// import {useEffect, useState} from 'react-firebase-hooks'

function MyApp({ Component, pageProps }) {

  const userData = useUserData();

  return (
    // @ts-ignore
    <UserContext.Provider value={userData}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </UserContext.Provider>
  )
}

export default MyApp
