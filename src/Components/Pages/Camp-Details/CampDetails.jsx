import { Button,   Spinner }   from 'keep-react';
import { useQuery   }   from '@tanstack/react-query';

import { Warning  }   from 'phosphor-react';
import {  useParams  }   from 'react-router-dom';


import ScrollToTop   from 'react-scroll-to-top';

const CampDetails  = () => {
  const params = useParams();
  const url = `http://localhost:3000/camp-details/${params.campID}`;

  const { isLoading, error, data: camp } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await fetch(url);
      return response.json();
    },
  });

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
    <div className=" bg-gradient-to-r from-blue-100 min-h-screen pt-20   to-blue-200 dark:from-gray-800 dark:to-gray-900">
      <div className="bg-blue-300 text-center p-8  mx-4 md:mx-0 shadow-lg dark:bg-gray-800 ">
        <h2 className="text-4xl apple  apple font-extrabold text-gray-800 md:text-6xl  dark:text-white">{camp.name}</h2>
        <p  className="text-md appl md:text-lg text-gray-700 mt-4 max-w-3xl mx-auto  dark:text-gray-300">
          {camp.description}
        </p>
      </div>



      <div className="container mx-auto p-4  md:p-8">
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800  rounded-xl api shadow-lg  overflow-hidden">
          <div className="w-full md:w-1/2 h-72 relative">
            <img
              src={camp.image}
              alt="Camp"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-blue-900 text-white p-2  rounded-lg shadow-md text-center">
              <p className="text-sm">Date</p>
              {new Date(camp.dateTime).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>
          <div className="p-6 flex flex-col relative justify-between w-full md:w-1/2">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 apple  dark:text-white mb-4">
                Camp Details

              </h2>
              <div className="flex apple  flex-wrap md:flex-nowrap">
              <p className=" right-5 absolute top-5 text-2xl font-semibold  text-gray-700 dark:text-gray-300">
                    <strong> </strong> ${camp.fees}
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
            <Button size="md" className="mt-6 bg-blue-600 text-white hover:bg-blue-700">
              Join Camp
            </Button>
          </div>
        </div>
      </div>
      <ScrollToTop top={20} smooth />
    </div>
  );
};

export default CampDetails;
