import {  Navigate } from 'react-router-dom'; // Adjusted spacing here
import { AppView } from 'src/sections/overview/view'; // Adjusted spacing here
import DashboardLayout from 'src/layouts/dashboard';

const PrivateRoutes = () => {
    const isLoggedIn=localStorage.getItem('userLogin')
    return(
        isLoggedIn?  <DashboardLayout><AppView /></DashboardLayout> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes