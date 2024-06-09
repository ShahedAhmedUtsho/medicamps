
import { Download } from "phosphor-react";
import  { useState } from "react";
import dotsvg from "../../../../Assets/svg/dotbox.svg"
import Header from "../../../Header/Header";
import { Button } from "keep-react";
import BannarSlider from "../BannarSlider/BannarSlider";
import CampsSction from "./CampsSction";
import { Link } from "react-router-dom";
import FeedbackSection from "../FeedBack/FeedBack";



const HomeComponent = () => {
  return (
    <div>

    
    <div className=" flex flex-col  bg-gradient-to-b from-slate-50 to-blue-400  min-h-screen">

      <div className="relative  container  mx-auto pb-[110px] pt-[120px] dark:bg-dark lg:pt-[150px]">
        <div className="container ">
          <div className="lg:-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-5/12">
              <div className="hero-content ">
                <h1 className="mb-5 text-4xl font-bold !leading-[1.208] apple text-dark text-slate-900 dark:text-white sm:text-[42px] lg:text-[40px] xl:text-6xl">
                Transforming Lives Through Medical Camps
                </h1>
                
                <p className="mb-8 max-w-[480px] lg:max-w-[600px] apple text-base lg:text-xl text-body-color dark:text-dark-6">
                Join us in delivering essential healthcare to communities in need. Our medical camps provide vital services and create inspiring stories of hope and transformation
                </p>
                <ul className="flex flex-wrap items-center">
                  <li> 
                    <Link to={`/available-camps`}
                    
                      className="inline-flex items-center justify-center rounded-md  px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-dark lg:px-7"
                    >
                       <Button color="primary"  className=""  >Join us </Button>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/#"
                      className="inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium text-[#464646] hover:text-primary dark:text-white"
                    >
                      <span className="mr-2 ">
                      <Download size="20" />
                      </span>
                      Download App
                    </a>
                  </li>
                </ul>




                <div className="clients pt-16">
                  <h6 className="mb-6 flex items-center apple text-xs font-normal text-body-color dark:text-dark-6">
                    Some Of Our Sponsors
                    <span className="ml-3 inline-block h-px w-8 bg-body-color"></span>
                  </h6>

                  <div className="flex items-center space-x-4">
                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/ayroui.svg"
                    />

                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/graygrids.svg"
                    />

                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/uideck.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">




<BannarSlider className="max-w-full "></BannarSlider>

                  <span className="absolute  -bottom-8 -left-8 z-[-1]">
                  <img src={dotsvg} alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CampsSction></CampsSction>
      <FeedbackSection></FeedbackSection>
</div>

    </div>
  );
};

export default HomeComponent;

const SingleImage = ({ href, imgSrc }) => {
  return (
    <>
      <a href={href} className="flex w-full items-center justify-center">
        <img src={imgSrc} alt="brand image" className="h-10 w-full" />
      </a>
    </>
  );
};


