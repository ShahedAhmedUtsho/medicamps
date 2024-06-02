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
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AvailableCamps from './Components/Pages/Available-camps/AvailableCamps'
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
        element:<Dashboard></Dashboard>
      },
      {
        path:"/available-camps",
        element:<AvailableCamps></AvailableCamps>
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
