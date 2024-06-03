
import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'keep-react';
import { Warning } from 'phosphor-react';
import { useParams } from 'react-router-dom';

const CampDetails = () => {
    const params = useParams() ;
  
    const url = `http://localhost:3000/camp-details/${params.campID}` ;
    console.log(url) ;


    const { isLoading, error, data: camps } = useQuery({
        queryKey: ["camps"],
        queryFn: async () => {
          const response = await fetch(url);
          return response.json();
        },
      });
   

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
        <div className='min-h-screen bg-slate-200 pt-20'>
            this is cam details
        </div>
    );
};

export default CampDetails;


