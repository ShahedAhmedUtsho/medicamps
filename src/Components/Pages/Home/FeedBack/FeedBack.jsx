
import { Spinner ,Button  } from 'keep-react';
import { useQuery } from '@tanstack/react-query';

const  FeedbackSection  = () => {


  const url =   "http://localhost:3000/feedback";



  const { isLoading, error , data ,} = useQuery({

    queryKey: ["feedback"],
    queryFn: async () => {
      const response = await fetch(url);
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div    className  ="flex justify-center apple  items-center h-64 bg-transparent ,">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center bg-transparent items-center h-64 text-red-500 apple">
        Error loading feedback
      </div>
    );
  }

  const ShowFeedback =data.slice(0, 12);

  return (
    <div className="p-4 , sm:p-6 lg:p-[2rem]">
      <h2 className="text-2xl font-semibold text-[#020202] text-center mb-5   apple ,"> Participants Feedback</h2>
      <div className="grid grid-cols-1 text-[#000000] sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ShowFeedback.map((item) => (
          <div
            key={item._id}
            className="
            flex flex-col p-4 bg-blue-100 rounded-lg shadow-xl hover:shadow-none
             transition-shadow duration-300
             "
          >
            <div className="flex items-center mb-3">
              <img
                src={item.userPhotoURL}
                alt={item.name}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <h3 className="text-lg font-semibold  apple">  {item.name}  </h3>
            </div>
            <div className=" items-center mb-2">
              <div className="text-blue-500  inline w-full apple text-lg  ">
            
                {'★ '.repeat(item.rating)}
              </div>
              <div className="text-gray-400 inline  text-lg">
                {'★ '.repeat(5 - item.rating)}
              </div>
            </div>
            <p className="text-[#494949] text-sm flex-grow apple">{item.feedback}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 md:mt-7 sm-tmt-6  text-center">
        <Button size='sm' className=" bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600  apple">
          Show All
        </Button>
      </div>
    </div>
  );
};

export default FeedbackSection; 
