// import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  // const isLoggedIn=localStorage.getItem('userLogin')
  
  // useEffect(()=>{
  //   if(!isLoggedIn){
  //     window.location.href="/login"
  //   }
  // },[isLoggedIn])
    
  return (
    <>
      <Helmet>
        <title> Dashboard  </title>
      </Helmet>

      <AppView />
    </>
  );
}
