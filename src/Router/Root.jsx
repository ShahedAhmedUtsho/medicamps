
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Success from '../Model/SuccessModel';
import ErrorModel from '../Model/ErrorModel';

const Root = () => {
    return (
        <div className='min-h-screen flex flex-col relative
          bg-gradient-to-b from-slate-50 to-blue-400  
           '>
             {/* <StyleReset /> */}
           <div className='mx-auto  relative w-full lg:container '>
           <Header></Header> 
           </div>
            <Outlet />
            <Success></Success>
            
      <ErrorModel></ErrorModel>
        </div>
    );
};

export default Root;