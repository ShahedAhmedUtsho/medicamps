import { Button, Spinner } from "keep-react";
import { X, Warning } from "phosphor-react";
import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from "@mui/material";
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const validationSchema = yup.object().shape({
 
  ParticipantAge: yup.number().required("this field is required") ,
  ParticipantNumber: yup.number().required("this field is required") ,
  // Gender: 
  ParticipantEmergencyContact : yup.number().required("this field is required")


});







const CampDetails = () => {
  const params = useParams();
  const { setLoading, openErrorModal, setModelHead, setModelMessage, openSuccessModal, user, logOut } = useContext(AuthContext);
  const url = `http://localhost:3000/camp-details/${params.campID}`;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { isLoading, error, data: camp } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await fetch(url);
      return response.json();
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
   
  });

const handleRegisterCamp = (data) =>{      
  const name=  camp.name    ; 
  const image=   camp.image    ;

  const fees    =  camp.fees ;
  const  dateTime=    camp.dateTime   ;
  const  location=   camp.location    ;
  const healthcareProfessional=  camp.healthcareProfessional  ;   
  const description= camp.description ;

  const ParticipantAge= data.ParticipantAge;
  const ParticipantNumber= data.ParticipantNumber ;
  // Gender: 
  const ParticipantEmergencyContact =  data.ParticipantEmergencyContact;

  const registerUserDetails = {
    name,image,fees,dateTime,location,healthcareProfessional , description , ParticipantAge,ParticipantNumber,ParticipantEmergencyContact,
  }
  console.log(registerUserDetails)

}





















  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen justify-center items-center text-red-500 dark:text-red-400">
        <Warning size={30} />
        <p className="ml-2">Error loading data... please try again later.</p>
      </div>
    );
  }

  return (
    <>
    <div className="bg-gradient-to-r from-blue-100 min-h-screen pt-20 to-blue-200 dark:from-gray-800 dark:to-gray-900">
      <div className="bg-blue-300 text-center p-8 mx-4 md:mx-0 shadow-lg dark:bg-gray-800">
        <h2 className="text-4xl apple font-extrabold text-gray-800 md:text-6xl dark:text-white">{camp.name}</h2>
        <p className="text-md apple md:text-lg text-gray-700 mt-4 max-w-3xl mx-auto dark:text-gray-300">
          {camp.description}
        </p>
      </div>
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl api shadow-lg overflow-hidden">
          <div className="w-full md:w-1/2 h-72 relative">
            <img src={camp.image} alt="Camp" className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-blue-900 text-white p-2 rounded-lg shadow-md text-center">
              <p className="text-sm">Date</p>
              {new Date(camp.dateTime).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </div>
          <div className="p-6 flex flex-col relative justify-between w-full md:w-1/2">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 apple dark:text-white mb-4">
                Camp Details
              </h2>
              <div className="flex apple flex-wrap md:flex-nowrap">
                <p className="right-5 absolute top-5 text-2xl font-semibold text-gray-700 dark:text-gray-300">
                  <strong></strong> ${camp.fees}
                </p>
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Professional:</strong> {camp.healthcareProfessional}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Location:</strong> {camp.location}
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    <strong>Participants:</strong> {camp.participantCount}
                  </p>
                </div>
              </div>
            </div>
            <Button onClick={toggleModal} size="md" className="mt-6 bg-blue-600 text-white hover:bg-blue-700">
              Join Camp
            </Button>
           
          </div>
        </div>
      </div>
      <ScrollToTop top={20} smooth />
    </div>

<div>


{isModalOpen && (
  <div className="fixed left-0 apple bg-slate-200 bg-opacity-30 flex justify-center items-center top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none">
    <div className="pointer-events-none relative w-auto  opacity-100 transition-all duration-300 ease-in-out mx-auto mt-7 max-w-[600px]">
      <div className="modal bg-white pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
        <div className="flex bg-blue-500 flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
          <h5 className="text-xl apple font-medium leading-normal text-white dark:text-white">
            Register camp
          </h5>
          <button
            type="button"
            className="box-content rounded-none border-none text-neutral-200 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
            onClick={toggleModal}
            aria-label="Close"
          >
            <X size={23} />
          </button>
        </div>
        
      <form onSubmit={handleSubmit(handleRegisterCamp)} >

      <div className="relative p-4 lg:min-w-[600px] md:min-w-96 apple ">
         <img src={camp.image} className="h-44 mb-5 rounded-sm lg:h-52 object-cover w-full" alt="" />
       <div className="mb-3">
       <h2 className="lg:text-2xl md:text-xl py-4 sm:text-lg font-normal text-base apple">
         
         join at <span className="lg:text-2xl md:text-xl py-4 text-blue-600 sm:text-lg font-normal text-base apple"> {camp.name}</span> on <span className="text-blue-700 font-normal text-base">  ( {camp.dateTime})</span>
          </h2>
          <h2 className="pb-2 font-semibold text-base">Name : {user?.displayName}  </h2>
          <h2 className="pb-2 font-semibold text-base">email :{user?.email}  </h2>
         
       </div>
         
          <div className="grid gap-3">
         <TextField
                    fullWidth
                    type="number"
                    id="ParticipantAge"
                    label="your Age"
                    name="ParticipantAge"
                    autoComplete="your Age"
                    className='apple'
                    autoFocus
                    error={Boolean(errors.ParticipantAge?.message)}
                    helperText={errors.ParticipantAge?.message}
                    {...register("ParticipantAge")}
                />
              <TextField
                    fullWidth
                    type="number"
                    id="ParticipantNumber"
                    label="your Number"
                    name="ParticipantNumber"
                    autoComplete="your Number"
                    className='apple'
                    error={Boolean(errors.ParticipantNumber?.message)}
                    helperText={errors.ParticipantNumber?.message}
                    {...register("ParticipantNumber")}
                />
                <TextField
                    fullWidth
                    type="number"
                    id="ParticipantEmergencyContact"
                    label="your Emergency Contact"
                    name="ParticipantEmergencyContact"
                    autoComplete="your Emergency  Contact"
                    className='apple'
                    error={Boolean(errors.ParticipantEmergencyContact?.message)}
                    helperText={errors.ParticipantEmergencyContact?.message}
                    {...register("ParticipantEmergencyContact")}
                />
         </div>
        
          {/* This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the modal, we use an inline style to set a minimum height, thereby extending the length of the overall modal and demonstrating the overflow scrolling. When content becomes longer than the height of the viewport, scrolling will move the modal as needed. */}
        </div>
       
        <div className="flex  flex-shrink-0 gap-3 flex-wrap items-center justify-between rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
        <div className=" relative">
        <p className="text-2xl pl-3 font-semibold text-gray-700 dark:text-gray-300">
                  <strong></strong> ${camp.fees}
                </p>
        </div>
         <div className="flex gap-3">
         <Button type="button" className="" variant="outline" onClick={toggleModal}>
            Close
          </Button>
          <Button type="submit" className="">
            Register Camp
          </Button>
         </div>
        </div>
      </form>
      </div>
    </div>
  </div>
)}
</div></>
  );
};

export default CampDetails


