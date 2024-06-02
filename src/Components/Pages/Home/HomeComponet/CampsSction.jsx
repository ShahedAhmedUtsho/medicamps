import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { Spinner, Button } from 'keep-react';
import { ArrowRight, Warning } from 'phosphor-react';
import { Link } from 'react-router-dom';

const CampsSection = () => {
  const { isLoading, error, data: camps } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const response = await fetch("camps.json");
      return response.json();
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="min-h-40 flex justify-center items-center">
        <Warning size={30} />
        <p className="ml-2">Error loading data... please try again later.</p>
      </div>
    );
  }

  const sortedCamps = camps ? [...camps].sort((a, b) => b.participantCount - a.participantCount) : [];
  const featuredCamps = sortedCamps.slice(0, 6);

  return (
    <div className="container my-10 mx-auto px-4 lg:px-0">
      <h2 className="text-3xl font-semibold text-center mb-8 mt-12">Upcoming Health Camps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredCamps.map((camp) => (
          <SingleCard
            key={camp.id}
            image={camp.image}
            CardTitle={camp.name}
            CardDescription={camp.description}
            CardFees={camp.fees}
            CardDate={camp.dateTime}
            titleHref={`/camp-details/${camp.id}`}
          />
        ))}
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
    <div className="overflow-hidden bg-white rounded-lg flex flex-col shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
      <img src={image} alt={CardTitle} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col h-full">
        <h2 className="text-lg font-semibold text-dark hover:text-primary dark:text-white">
          {CardTitle}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-body-color dark:text-dark-6">
          {CardDescription.length > 100 ? `${CardDescription.substring(0, 100)}...` : CardDescription}
        </p>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <p><strong>Date:</strong> {formattedDate}</p>
        </div>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <Link to={titleHref} className="text-sm font-medium   text-primary hover:underline">
            <Button size="sm" className="!bg-[#1B4DFE] gap-1 px-3 py-2 text-xs">
              Details
              <ArrowRight />
            </Button>
          </Link>
          <p className='font-semibold text-blue-900 text-lg'>${CardFees}</p>
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
