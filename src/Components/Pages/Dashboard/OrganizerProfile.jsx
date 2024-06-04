import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { Camera, Image } from 'phosphor-react';

const OrganizerProfile = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className='w-full min-h-screen rounded-lg overflow-hidden bg-slate-200'>

            <div className='w-full  relative rounded-xl md:h-[24vw] h-[12vh] lg:h-[18vw] max-h-[300px] bg-slate-600'>
                <img src="https://i.ibb.co/tmjWqYg/laurenmcdonaghpereiraphoto-A-field-of-lavender-with-a-soft-su-645ac3bc-37ff-4eb0-8a8b-4d20c9c58037-1.webp" alt="" className='w-full h-full  object-cover ' />
                <Camera   className=' bg-white lg:w-8 lg:h-8 md:h-6 md:w-6  text-white lg:p-2 p-1 rounded-md bg-opacity-30 absolute  right-4 bottom-[5%]' />
            </div>
            <div className='bg-slate-600 w-full px-8 min-h-52'>
                <div className='  -top-10    lg:max-w-44 lg:max-h-44  md:max-w-32 md:max-h-32 max-w-20 max-h-20  relative    bg-slate-200 rounded-full'>
                    <img className='w-full rounded-full' src={user?.photoURL} alt="" />
                    <Camera   className=' bg-blue-700 lg:w-8 lg:h-8 md:h-6 md:w-6  text-white lg:p-2 p-1 rounded-full absolute  right-0 bottom-[10%]' />

                </div>

            </div>

           
        </div>
    );
};

export default OrganizerProfile;