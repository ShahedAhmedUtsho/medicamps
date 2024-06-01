
import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/effect-cards';



// import required modules
import { EffectCards,Autoplay } from 'swiper/modules';

const BannarSlider = ()=> {
  return (
    <>
      <div  className=' w-full h-[450px] max-w-96 px-0 mx-0 overflow-hidden'>
      <Swiper
      
        effect={'cards'}
        grabCursor={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
       
      
        modules={[EffectCards,Autoplay]}
        

        className="mySwiper bg-red-300 rounded-xl   *:rounded-xl h-full w-full overflow-hidden "
      >
        <SwiperSlide className='bg-red-200  rounded-xl '>
          
        <SingleCard
              image="https://i.ibb.co/r2zns1m/image-01.jpg"
              CardTitle="50+ Best creative website themes & templates"
              titleHref="/#"
              btnHref="/#"
              CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
              Button="View Details"
            />
          
          </SwiperSlide>
        <SwiperSlide className='bg-red-300 rounded-xl  '>
          
        <SingleCard
              image="https://i.ibb.co/0nbbWM9/image-02-1.jpg"
              CardTitle="Creative Card Component designs graphic elements"
              CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
              Button="View Details"
            />
           
        <SwiperSlide className='bg-red-400 rounded-xl '>
          
        <SingleCard
              image="https://i.ibb.co/dL9fH7N/image-03-1.jpg"
              CardTitle="The ultimate UX and UI guide to card design"
              CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
              Button="View Details"
            />
          </SwiperSlide>
          
        </SwiperSlide>
        <SwiperSlide className='bg-red-500 rounded-xl '>Slide 4</SwiperSlide>
        <SwiperSlide className='bg-red-600 rounded-xl '>Slide 5</SwiperSlide>
       
      </Swiper>
      </div>
    </>
  );
}


export default BannarSlider;


const SingleCard = ({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
}) => {
  return (
    <>
      {/*  */}
      <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <img src={image} alt="" className="w-full" />
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <a
              href={titleHref ? titleHref : "/#"}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {CardTitle}
            </a>
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {CardDescription}
          </p>

          {Button && (
            <a
              href={btnHref ? btnHref : "#"}
              className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
            >
              {Button}
            </a>
          )}
        </div>
      </div>
      {/*  */}
    </>
  );
};