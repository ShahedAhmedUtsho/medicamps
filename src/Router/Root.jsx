
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Success from '../Model/SuccessModel';
import ErrorModel from '../Model/ErrorModel';
import Footer from '../Components/Footer/Footer';


import ScrollToTop from 'react-scroll-to-top';

const Root = () => {

  const location = useLocation()
  const show = location.pathname !== "/login" &&
   location?.pathname !== "/register" && 
  location?.pathname !== "/profile " && 
  location?.pathname?.slice(0, 10) !== "/dashboard"
  
  ; 

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
            {
show &&  <div className='mx-auto mt-auto   z-50 w-full  '>

  <Footer></Footer>

</div> 
         }
            <Success></Success>
            
      <ErrorModel></ErrorModel>
      <ScrollToTop className='z-50 bg-black ' smooth  top={20} />
        </div>
    );
};
export default Root;