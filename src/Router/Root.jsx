
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Success from '../Model/SuccessModel';
import ErrorModel from '../Model/ErrorModel';

const Root = () => {

  const location = useLocation()
  const show = location.pathname !== "/login" &&
   location.pathname !== "/register" && 
  location.pathname !== "/profile " && 
  location.pathname !== "/dashboard" ; 
  console.log(show)
  console.log(location)
    return (
        <div className='min-h-screen   flex flex-col relative
          
           '>
             {/* <StyleReset /> */}
         {
show &&  <div className='mx-auto    absolute  left-0 right-0 z-50 w-full lg:container '>
<Header></Header> 
</div> 
         }
            <Outlet />
            <Success></Success>
            
      <ErrorModel></ErrorModel>
        </div>
    );
};

export default Root;