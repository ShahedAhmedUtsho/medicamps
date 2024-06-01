import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter,RouterProvider } from 'react-router-dom' 
import Root from './Router/Root'
import HomeComponent from './Components/Pages/Home/HomeComponet/HomeComponent'
import Login from './Components/Pages/Login/Login'
import Register from './Components/Pages/Register/Register'
const router = createBrowserRouter([
  {
    path:"/",
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
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
