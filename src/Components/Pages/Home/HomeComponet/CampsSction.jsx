import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'keep-react';
import { Warning } from 'phosphor-react';
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
    return <Spinner></Spinner>;
  }

  if (error) {
    return (
      <div className="min-h-40 ls flex justify-center items-center">
        <Warning size={30} />
        <p className="ml-2 none ">Error loading data.... please try again later ..</p>
      </div>
    );
  }

  const sortedCamps = camps ? [...camps].sort((a, b) => b.participantCount - a.participantCount) : [];
  const featuredCamps = sortedCamps.slice(0, 6);

  return (
    <div className="container  my-10 mx-auto px-4 lg:px-0">
      <h2 className="text-3xl font-semibold text-center mb-8 mt-12">Upcoming Health Camps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCamps.map((camp) => (
          <SingleCard
            key={camp.id}
            image={camp.image}
            CardTitle={camp.name}
            CardDescription={camp.description}
            titleHref={`/camp-details/${camp.id}`}
          />
        ))}
      </div>
    </div>
  );
};

const SingleCard = ({ image, CardTitle, CardDescription, titleHref }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg  shadow-1 Oke-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
      <img src={image} alt={CardTitle} className="w-full h-52 ok-1 object-cover" />
      <div className="p-8">
        <h3>
          <h2
            
            className="block text-xl font-semibold text-dark hover:text-primary dark:text-white"
          >
            {CardTitle}
          </h2>
        </h3>
        <p className="mt-2 text-base leading-relaxed text-body-color dark:text-dark-6">
          {CardDescription}
        </p>
        <div className="mt-4">
          <Link 
          to={titleHref}
            
            className="text-sm font-medium text-primary hover:underline"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

SingleCard.propTypes = {
  image: PropTypes.string.isRequired,
  CardTitle: PropTypes.string.isRequired,
  CardDescription: PropTypes.string.isRequired,
  titleHref: PropTypes.string.isRequired,
};

export default CampsSection;
