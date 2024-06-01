"use client";
import { Spinner } from "keep-react";
import { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'
import { AuthContext } from "../AuthProvider/AuthProvider";
const PrivetRoute = ({children}) => {
    const location = useLocation()
const {user,loading} = useContext(AuthContext)

if(loading){
    return <Spinner className=' absolute right-0 left-0 mx-auto top-1/3' color="info" size="xl" />; 
}
if(user){
    return children
}
return <Navigate to='/login' state={location.pathname}></Navigate>
};
PrivetRoute.propTypes = {
    children : PropTypes.node
}
export default PrivetRoute;