


import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types'

import 'swiper/css';
import 'swiper/css/effect-cards';



// import required modules
import { EffectCards,Autoplay } from 'swiper/modules';

const BannarSlider = ()=> {
  return (
    <>
      <div  className=' max-w-[300px]  md:h-[450px]  md:max-w-[500px]  lg:max-w-96 px-0 lg:mx-0 overflow-hidden'>
      <Swiper
      
        effect={'cards'}
        grabCursor={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
       
      
        modules={[EffectCards,Autoplay]}
        

        className="mySwiper  rounded-xl   *:rounded-xl h-full w-full overflow-hidden "
      >
        <SwiperSlide className='  rounded-xl '>
          
        <SingleCard
              image="https://i.ibb.co/y8mN7qf/Pre-Trip-Medical-Check-ups-For-Kids.jpg"
              CardTitle=" Comprehensive Health Checkups"
              titleHref="/#"
              btnHref="/#"
              CardDescription="In our latest camp, we conducted over 500 comprehensive health checkups, identifying and addressing various health issues early on."
             
            />
          
          </SwiperSlide>


        <SwiperSlide className=' rounded-xl  '>
          
        <SingleCard
              image="https://i.ibb.co/N2qJbHX/Whats-App-Image-2018-07-14-at-4-03-37-PM.jpg"
              CardTitle="Bringing Specialist Care to Rural Areas"
              CardDescription="Our team provided essential healthcare to over 500 patients in remote communities, improving their overall well-being."
             
            />
           
       
          
        </SwiperSlide>
        <SwiperSlide className=' rounded-xl '>
        <SingleCard
              image="https://i.ibb.co/kD6PyLB/Screenshot-2024-06-01-at-3-04-20-PM.png"
              CardTitle="Empowering Youth Through Health Education"
              CardDescription="We educated over 300 young people on nutrition, hygiene, and disease prevention, helping them lead healthier lives.."
              
            />
       
          </SwiperSlide>
       
       
      </Swiper>
      </div>
    </>
  );
}


export default BannarSlider;


const SingleCard = ({
  image,
  
  CardDescription,
  CardTitle,
  titleHref,
  
}) => {
  return (
    <>
      {/*  */}
      <div className="mb-10 overflow-hidden apple rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
      <div className='w-full h-52 '>
      <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
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

        
        </div>
      </div>
      {/*  */}
    </>
  );
};
SingleCard.propTypes = {
  image: PropTypes.string.isRequired,
  CardDescription: PropTypes.string.isRequired,
  CardTitle: PropTypes.string.isRequired,
  titleHref: PropTypes.string,
  btnHref: PropTypes.string,
};