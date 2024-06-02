import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards, Autoplay } from 'swiper/modules';

const BannarSlider = () => {
  return (
    <div className="max-w-[300px] md:h-[450px] md:max-w-[500px] lg:max-w-96 px-0 lg:mx-0 overflow-hidden">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[EffectCards, Autoplay]}
        className="mySwiper rounded-xl h-full w-full overflow-hidden"
      >
        <SwiperSlide className="rounded-xl">
          <SingleCard
            image="https://i.ibb.co/y8mN7qf/Pre-Trip-Medical-Check-ups-For-Kids.jpg"
            CardTitle="Comprehensive Health Checkups"
            titleHref="/#"
            CardDescription="In our latest camp, we conducted over 500 comprehensive health checkups, identifying and addressing various health issues early on."
          />
        </SwiperSlide>

        <SwiperSlide className="rounded-xl">
          <SingleCard
            image="https://i.ibb.co/N2qJbHX/Whats-App-Image-2018-07-14-at-4-03-37-PM.jpg"
            CardTitle="Bringing Specialist Care to Rural Areas"
            CardDescription="Our team provided essential healthcare to over 500 patients in remote communities, improving their overall well-being."
          />
        </SwiperSlide>

        <SwiperSlide className="rounded-xl">
          <SingleCard
            image="https://i.ibb.co/kD6PyLB/Screenshot-2024-06-01-at-3-04-20-PM.png"
            CardTitle="Empowering Youth Through Health Education"
            CardDescription="We educated over 300 young people on nutrition, hygiene, and disease prevention, helping them lead healthier lives."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannarSlider;

const SingleCard = ({ image, CardDescription, CardTitle, titleHref }) => {
  return (
    <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-lg duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-xl dark:hover:shadow-2xl">
      <div className="w-full h-52">
        <img src={image} alt={CardTitle} className="w-full h-full object-cover rounded-t-lg" />
      </div>
      <div className="p-6 text-center">
        <h3>
          <a
            href={titleHref ? titleHref : "/#"}
            className="mb-4 block text-xl font-semibold text-gray-900 hover:text-blue-500 dark:text-gray-100 dark:hover:text-blue-300"
          >
            {CardTitle}
          </a>
        </h3>
        <p className="mb-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {CardDescription}
        </p>
      </div>
    </div>
  );
};

SingleCard.propTypes = {
  image: PropTypes.string.isRequired,
  CardDescription: PropTypes.string.isRequired,
  CardTitle: PropTypes.string.isRequired,
  titleHref: PropTypes.string,
};
