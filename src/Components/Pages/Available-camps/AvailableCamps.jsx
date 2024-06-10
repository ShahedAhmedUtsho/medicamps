import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { Spinner, Button, Input } from 'keep-react';
import { ArrowRight, Layout, Money, TextAa, UsersThree, Warning } from 'phosphor-react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

const AvailableCamps = () => {

  const { isLoading, error, data: camps  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const response = await axios.get("https://medicamp-server-tau.vercel.app/camps", {
        withCredentials: true
      });
      return response.json();
    },
  });





  
console.log(camps)
  const [isTwoColumnLayout, setIsTwoColumnLayout] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortfun, setSortfun] = useState("");
 
  const toggleLayout = () => {
    setIsTwoColumnLayout(!isTwoColumnLayout);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (selectedOption) => {
    setSortfun(selectedOption.value);
  };

  const filteredCamps = camps
    ? camps.filter((camp) => {
        const searchTerms = searchTerm.toLowerCase().split(' ');
        return searchTerms.every(term =>
          camp?.name.toLowerCase().includes(term) ||
          camp?.description.toLowerCase().includes(term) ||
          camp?.location.toLowerCase().includes(term)
        );
      })
    : [];

  const sortedCamps = filteredCamps
    ? filteredCamps.sort((a, b) => {
        switch (sortfun) {
          case "most-registered":
            return b.participantCount - a.participantCount;
          case "fees":
            return a.fees - b.fees;
          case "alphabetical":
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      })
    : [];

  const featuredCamps = sortedCamps ;

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

  const sortOptions = [
    { value: "", label: <span className='flex capitalize apple  items-center gap-2'>
    Sort By</span> },
    { value: "most-registered", label:  <span className='flex capitalize apple  items-center gap-2'><UsersThree size={20} /> 
    Most participants</span> },
    { value: "fees", label: <span className='flex capitalize apple items-center gap-2'><Money size={20} />  Less Fees
    </span> },
    { value: "alphabetical", label: <span className='flex apple capitalize items-center gap-2'><TextAa size={20} /> Alphabetical order
    </span> },
  ];

  return (
    <div  className="   container mx-auto apple my-10 lg:px-0 px-4    ">
      <div className="flex    flex-col sm:flex-row  justify-between  apple items-center mb-8 mt-12 space-y-4 sm:space-y-0">
        <h2  className="text-2xl  font-semibold text-gray-900 lg:text-3xl dark:text-gray-100">Upcoming Health Camps</h2>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            type="text"

            placeholder="Search camps..."

            value={searchTerm}

            onChange={handleSearch}

            className="px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-auto"
          />



          <Select
            options={sortOptions}
            onChange={handleSort}
            className="w-full sm:w-48"
          />
          <Layout onClick={toggleLayout} className="cursor-pointer text-gray-900 dark:text-gray-100" size={32} />
        </div>
      </div>
      <div className={`grid gap-6 ${isTwoColumnLayout ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {featuredCamps.map((camp) => (
          <SingleCard
            key={camp._id}
            image={camp.image}
            CardTitle={camp.name}
            CardDescription={camp.description}
            CardFees={camp.fees}
            CardDate={camp.dateTime}
            CardLocation={camp.location}
            CardHealthcareProfessional={camp.healthcareProfessional}
            CardParticipantCount={camp.participantCount}
            titleHref={camp._id}
            searchTerm={searchTerm}
          />
        ))}
      </div>
   
    </div>
  );
};

export default AvailableCamps;







const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;

  const terms = searchTerm.split(' ')?.filter(term => term);
  const regex = new RegExp(`(${terms.join('|')})`, 'gi');
  return text.split(regex).map((part, index) =>
    regex.test(part) ? <span key={index} className="bg-yellow-200">{part}</span> : part
  );
};





const   SingleCard  = (  { image,       CardDate, CardLocation, CardHealthcareProfessional, CardParticipantCount,   titleHref, searchTerm ,CardTitle, CardDescription,   CardFees, }) => {
  const formattedDate = new Date(CardDate).toLocaleDateString('en-US', {

    day: 'numeric',

    month:  'long',
  }) ;



  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg apple shadow-lg overflow-hidden flex flex-col">


      <img src={image}  className="w-full apple object-cover h-48" alt={CardTitle} />


      <div className="p-6 flex flex-col h-full">


        <h3 className="text-xl  text-gray-900 font-semibold mb-2 apple dark:text-gray-100">{highlightText(CardTitle, searchTerm)}</h3>



        <p className="text-gray-700 dark:text-gray-300 mb-4">{highlightText(CardDescription.length > 100 ? `${CardDescription.substring(0, 100)}...` : CardDescription, searchTerm)}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2"><strong>Date:</strong> {formattedDate}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2"><strong>Location:</strong> {highlightText(CardLocation, searchTerm)}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2"><strong>Healthcare Professional:</strong> {CardHealthcareProfessional}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2"><strong>Participants:</strong> {CardParticipantCount}</p>
        <div className="mt-auto flex items-center justify-between">
          <Link to={`/camp-details/${titleHref}`} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            <Button size="sm" className="!bg-blue-600 dark:!bg-blue-500 text-white flex items-center gap-1">
              Details
              <ArrowRight size={16} />
            </Button>
          </Link>
          <p className="font-semibold text-blue-600 dark:text-blue-400 text-lg">${CardFees}</p>
        </div>
      </div>
    </div>
  );
};

SingleCard.propTypes = {
  image: PropTypes.string.isRequired,
  CardTitle: PropTypes.string.isRequired,
  CardDescription: PropTypes.string.isRequired,
  CardFees: PropTypes.number.isRequired,
  CardDate: PropTypes.string.isRequired,
  CardLocation: PropTypes.string.isRequired,
  CardHealthcareProfessional: PropTypes.string.isRequired,
  CardParticipantCount: PropTypes.number.isRequired,
  titleHref: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
};
