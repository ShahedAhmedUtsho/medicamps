import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { Camera, Image, Pen, Warning } from 'phosphor-react';
import { useQuery } from '@tanstack/react-query';
import { Spinner, Button, Input } from 'keep-react';
import defaultCover  from '../../../Assets/svg/profileCover.svg' ;
import { Link } from 'react-router-dom';
const OrganizerProfile = () => {
    const {user} = useContext(AuthContext) ;

    const url = `http://localhost:3000/mediusers/${user?.uid}`
    console.log(url)

    const { isLoading, error, data: profile } = useQuery({
        queryKey: [url],
        queryFn: async () => {
          const response = await fetch(url);
          return response.json();
        },
      });
    

console.log(profile)






const ProfileName = profile?.name || user?.displayName
    const profileImg = profile?.photoURL ||  user?.photoURL ; 
    const profileCover = profile?.cover ||  defaultCover  ;
    const ProfileEmail = profile?.email || user?.email ;
    const ProfileNumber = profile?.number || "" ;
    const ProfileDescreption = profile?.description || "" ;





  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (error) {
    return (
      <div  className="  min-h-40 flex apple justify-center   text-red-500 dark:text-red-400 items-center">
        <Warning size={30} />
        <p className="ml-2">
            Error loading data... please try again later.</p>
      </div>
    );
  }

    return (
        <div className='w-full min-h-[600px] box-shadow rounded-lg overflow-hidden '>

            <div className='w-full  relative rounded-xl md:h-[24vw] h-[12vh] lg:h-[18vw] max-h-[300px] bg-slate-600'>
                <img src={profileCover} alt="" className='w-full h-full  object-cover ' />
                {/* <Camera   className=' bg-white lg:w-8 lg:h-8 md:h-6 md:w-6  text-white lg:p-2 p-1 rounded-md bg-opacity-30 absolute  right-4 bottom-[5%]' /> */}
            </div>


            <div className=' w-full md:flex gap-5 grid-cols-12 px-8 min-h-52'>
<div className=' w-fit h-fit mx-auto'>
<div className='  lg:-top-10  -top-10 md:-top-4 mx-auto md:mx-0    lg:w-44 lg:h-44  md:w-24 md:h-24 w-24 h-24  relative     rounded-full'>
                    <img className='w-full h-full  rounded-full' src={profileImg} alt="" />
                    <Camera   className=' bg-blue-700 lg:w-8 lg:h-8 md:h-6 md:w-6  text-white lg:p-2 p-1 rounded-full absolute  right-0 bottom-[10%]' />

                </div>
</div>

               



                <div className=' w-full  min-h-40 py-2 lg:py-5'>

                <div className='md:flex justify-between   '>
                   <div className='flex-item profile w-full header'>
                   <h2 className= 'apple lg:text-2xl font-bold text-black'>
                        {ProfileName}
                    </h2>
                    <h2 className= 'apple text-sm lg:text-lg text-slate-500 font-semibold '>
                       Professional Website developer
                    </h2>
                   </div>
                   <div className='flex-item w-full flex justify-end '>
                    <Link to="/dashboard/updateProfile"><Pen   size={20} /></Link>

                   </div>
                


                </div>

                <div className='Content min-h-20  w-full my-5 '>
                    {ProfileDescreption &&  <p className= 'apple lg:text-lg  text-xs py-3 font-semibold md:pr-5 text-slate-500'>
                      {ProfileDescreption}
                    </p> }
               
                    <h2 className='text-lg font-medium text-slate-700'>Email:</h2>
                    <p className= 'apple lg:text-lg  text-xs py-3 font-semibold md:pr-5 text-slate-500'>
                     {ProfileEmail}
                    </p>
                   {ProfileNumber && <> <h2 className='text-lg font-medium text-slate-700'>number:</h2>
                    <p className= 'apple lg:text-lg  text-xs py-3 font-semibold md:pr-5 text-slate-500'>
                      {ProfileNumber}
                    </p></> }
                    

                    

                </div>
                </div>

               
                

            </div>

           
        </div>
    );
};

export default OrganizerProfile;