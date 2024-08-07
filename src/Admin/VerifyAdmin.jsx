// AdminSecure.js
import  { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Spinner } from 'keep-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const VerifyAdmin = ({ children }) => {
  
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const {  error, data: MongoUser } = useQuery({
    queryKey: [`https://medicamp-server-tau.vercel.app/mediusers/${user?.uid}`],
    queryFn: async () => {
        const response = await axios.get(`https://medicamp-server-tau.vercel.app/mediusers/${user?.uid}`,{withCredentials:true}); 
        return response.data;
    }
});








if (error) return <div>Error loading data... please try again later. is you are a admin ?</div>;

  if (loading) {
    return <div className=' min-h-screen w-full flex justify-center items-center'><Spinner className="absolute right-0 left-0 mx-auto top-1/3" color="info" size="xl" /></div>;
  }

  if (user && user?.email === "admin@gmail.com") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} />;
};

VerifyAdmin.propTypes = {
  children: PropTypes.node
};




export default VerifyAdmin;