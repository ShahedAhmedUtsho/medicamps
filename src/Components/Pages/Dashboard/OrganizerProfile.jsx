import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { Camera, Image, Pen } from 'phosphor-react';

const OrganizerProfile = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className='w-full min-h-screen box-shadow rounded-lg overflow-hidden '>

            <div className='w-full  relative rounded-xl md:h-[24vw] h-[12vh] lg:h-[18vw] max-h-[300px] bg-slate-600'>
                <img src="https://i.ibb.co/tmjWqYg/laurenmcdonaghpereiraphoto-A-field-of-lavender-with-a-soft-su-645ac3bc-37ff-4eb0-8a8b-4d20c9c58037-1.webp" alt="" className='w-full h-full  object-cover ' />
                {/* <Camera   className=' bg-white lg:w-8 lg:h-8 md:h-6 md:w-6  text-white lg:p-2 p-1 rounded-md bg-opacity-30 absolute  right-4 bottom-[5%]' /> */}
            </div>


            <div className=' w-full md:flex gap-5 grid-cols-12 px-8 min-h-52'>
<div className=' w-fit h-fit mx-auto'>
<div className='  lg:-top-10  -top-10 md:-top-4 mx-auto md:mx-0    lg:w-44 lg:h-44  md:w-24 md:h-24 w-24 h-24  relative     rounded-full'>
                    <img className='w-full h-full  rounded-full' src={user?.photoURL} alt="" />
                    <Camera   className=' bg-blue-700 lg:w-8 lg:h-8 md:h-6 md:w-6  text-white lg:p-2 p-1 rounded-full absolute  right-0 bottom-[10%]' />

                </div>
</div>

               



                <div className=' w-full  min-h-40 py-2 lg:py-5'>

                <div className='md:flex justify-between   '>
                   <div className='flex-item profile w-full header'>
                   <h2 className= 'apple lg:text-2xl font-bold text-black'>
                        {user?.displayName}
                    </h2>
                    <h2 className= 'apple text-sm lg:text-lg text-slate-500 font-semibold '>
                       Professional Website developer
                    </h2>
                   </div>
                   <div className='flex-item w-full flex justify-end '>
<Pen   size={20} />
                   </div>
                


                </div>

                <div className='Content min-h-20 w-full my-5 '>
                <p className= 'apple lg:text-lg  text-xs py-3 font-semibold md:pr-5 text-slate-500'>
                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, minima obcaecati saepe repudiandae eum est voluptas quos, provident odio unde mollitia minus exercitationem nulla asperiores quisquam veritatis! Repellat, est illum.
                    </p>
                    <h2 className='text-lg font-medium text-slate-700'>Email:</h2>
                    <p className= 'apple lg:text-lg  text-xs py-3 font-semibold md:pr-5 text-slate-500'>
                      shahedahmedutsho@gmail.com
                    </p>
                    <h2 className='text-lg font-medium text-slate-700'>number:</h2>
                    <p className= 'apple lg:text-lg  text-xs py-3 font-semibold md:pr-5 text-slate-500'>
                      +8801581429924
                    </p>
                    

                    

                </div>
                </div>

               
                

            </div>

           
        </div>
    );
};

export default OrganizerProfile;