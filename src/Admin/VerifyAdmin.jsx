// AdminSecure.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Spinner } from 'keep-react';


const VerifyAdmin = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner className="absolute right-0 left-0 mx-auto top-1/3" color="info" size="xl" />;
  }

  if (user && user.isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} />;
};

VerifyAdmin.propTypes = {
  children: PropTypes.node
};




export default VerifyAdmin;