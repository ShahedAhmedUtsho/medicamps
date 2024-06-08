// AdminSecure.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Spinner } from 'keep-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const VerifyAdmin = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const { isLoading,  error, data: MongoUser } = useQuery({
    queryKey: [`http://localhost:3000/mediusers/${user?.uid}`],
    queryFn: async () => {
        const response = await axios.get(`http://localhost:3000/mediusers/${user?.uid}`); 
        return response.data;
    }
});

console.log(MongoUser)





// if (isLoading) return <Spinner />;
if (error) return <div>Error loading data... please try again later.</div>;

  if (loading) {
    return <div className=' min-h-screen w-full flex justify-center items-center'><Spinner className="absolute right-0 left-0 mx-auto top-1/3" color="info" size="xl" /></div>;
  }

  if (user && MongoUser.isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} />;
};

VerifyAdmin.propTypes = {
  children: PropTypes.node
};




export default VerifyAdmin;