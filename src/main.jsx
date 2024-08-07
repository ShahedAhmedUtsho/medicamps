import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter,RouterProvider } from 'react-router-dom' 
import Root from './Router/Root'
import HomeComponent from './Components/Pages/Home/HomeComponet/HomeComponent'
import Login from './Components/Pages/Login/Login'
import Register from './Components/Pages/Register/Register'
import AuthProvider from './AuthProvider/AuthProvider'
import Profile from './Components/Pages/Profile/Profile'
import Dashboard from './Components/Pages/Dashboard/Dashboard'
import ErrorPage from './Components/Pages/ErrorPage/ErrorPage'
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AvailableCamps from './Components/Pages/Available-camps/AvailableCamps'
import CampDetails from './Components/Pages/Camp-Details/CampDetails'
import Secure from './Secure/Secure'
import OrganizerProfile from './Components/Pages/Dashboard/OrganizerProfile'
import UpdateProfile from './Components/Pages/Dashboard/UpdateProfile'
import AddCamps from './Components/Pages/Dashboard/AddCamps'
import ManageCamps from './Components/Pages/Dashboard/ManageCamps'
import UpdateCamps from './Components/Pages/Dashboard/UpdateCamps'
import ManageRegisteredCamps from './Components/Pages/Dashboard/ManageRegistered'
import ManageCampsOfParticipant from './Components/Pages/Dashboard/participentThing/ManageCampsOfParticipent'
import Payment from './Components/Pages/Dashboard/Payment/Payment'
import Allpayment from './Components/Pages/Dashboard/Allpayment'
import PaymentHistory from './Components/Pages/Dashboard/PaymentHistory'
import VerifyAdmin from './Admin/VerifyAdmin'
import ChartSection from './Components/Pages/Dashboard/Analysis'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path:"/",
    errorElement:<ErrorPage></ErrorPage>,
    element:<Root></Root> ,
    children:[
      {
        path:"/",
        element:<HomeComponent></HomeComponent>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
        path:"/profile",
        element:<Profile></Profile>
      },
      {
        path:"/dashboard",
        element:<Dashboard></Dashboard> ,
        children :[
          
          {
            path:"/dashboard", 
    
            element:<Secure> <OrganizerProfile></OrganizerProfile></Secure>
          },
          
          {
            path:"/dashboard/update-camp/:campId", 

    
            element: <VerifyAdmin><UpdateCamps></UpdateCamps></VerifyAdmin>
          },
          {
            path:"/dashboard/analysis", 

    
            element: <ChartSection></ChartSection>
          },
          {
            path:"/dashboard/updateProfile", 
    
            element: <Secure><UpdateProfile></UpdateProfile></Secure>
          }
          ,
          {
            path:"/dashboard/addcamps", 
    
            element:<VerifyAdmin> <AddCamps></AddCamps></VerifyAdmin>
          }  ,
          {
            path:"/dashboard/manageregisteredcampsuser", 
    
            element:<VerifyAdmin> <ManageRegisteredCamps></ManageRegisteredCamps></VerifyAdmin>
          } 
          ,
          {
            path:"/dashboard/manageregisteredcamps", 
    
            element:<Secure><ManageCampsOfParticipant></ManageCampsOfParticipant></Secure>
          }  ,
          {
            path:"/dashboard/payment/:id", 
    
            element:<Secure><Payment></Payment></Secure>
          } ,
          {
            path:"/dashboard/allpayment", 
    
            element:<VerifyAdmin><Allpayment></Allpayment></VerifyAdmin>
          }  ,
          {
            path:"/dashboard/paymenthistory", 
    
            element:<Secure><PaymentHistory></PaymentHistory></Secure>
          } 
          
          ,
          {
            path:"/dashboard/managecamps", 
    
            element: <VerifyAdmin><ManageCamps></ManageCamps></VerifyAdmin>
          }
        ]
      },
      {
        path:"/available-camps",
        element:<AvailableCamps></AvailableCamps>
      },
      {
        path:"/camp-details/:campID",

        element: <Secure> <CampDetails></CampDetails></Secure> 
      }
      
      
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
 

<React.StrictMode>
<QueryClientProvider client={queryClient}>
    
<AuthProvider>

<RouterProvider router={router} />
</AuthProvider>


    </QueryClientProvider>



  </React.StrictMode>,

 
)
