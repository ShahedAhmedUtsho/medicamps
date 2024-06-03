import  { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { Spinner, Button } from 'keep-react';
import { ArrowRight, Layout, Warning } from 'phosphor-react';
import { Link } from 'react-router-dom';

const CampsSection = () => {
  const url = "http://localhost:3000/camps"
  const { isLoading, error, data: camps } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const response = await fetch(url);
      return response.json();
    },
  });

  const [isTwoColumnLayout, setIsTwoColumnLayout] = useState(false);

  const toggleLayout = () => {
    setIsTwoColumnLayout(!isTwoColumnLayout);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (error) {
    return (
      <div className="min-h-40 flex justify-center items-center text-red-500 dark:text-red-400">
        <Warning size={30} />
        <p className="ml-2">Error loading data... please try again later.</p>
      </div>
    );
  }

  const sortedCamps = camps ? [...camps].sort((a, b) => b?.participantCount - a?.participantCount) : [];
  const featuredCamps = sortedCamps?.slice(0, 6);

  return (
    <div className="container mx-auto my-10 px-4 lg:px-0">
      <div className="flex justify-between items-center mb-8 mt-12">
        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100">Upcoming Health Camps</h2>
        <Layout onClick={toggleLayout} className="cursor-pointer lg:block hidden text-gray-900 dark:text-gray-100" size={32} />
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
            titleHref={`/camp-details/${camp._id}`}
          />
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <Link to="/available-camps">
          <Button size="sm" className="!bg-white text-blue-500 dark:!bg-gray-800 dark:text-gray-100 font-semibold flex items-center gap-1">
            All Camps
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const SingleCard = ({ image, CardTitle, CardDescription, CardFees, CardDate, titleHref }) => {
  const formattedDate = new Date(CardDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <img src={image} alt={CardTitle} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{CardTitle}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{CardDescription.length > 100 ? `${CardDescription.substring(0, 100)}...` : CardDescription}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2"><strong>Date:</strong> {formattedDate}</p>
        <div className="mt-auto flex items-center justify-between">
          <Link to={titleHref} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
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
  titleHref: PropTypes.string.isRequired,
};

export default CampsSection;
