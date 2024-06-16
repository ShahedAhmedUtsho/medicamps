import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Success from '../Model/SuccessModel';
import ErrorModel from '../Model/ErrorModel';
import Footer from '../Components/Footer/Footer';
import ScrollToTop from 'react-scroll-to-top';

const Root = () => {
  // Get the current location using useLocation hook from react-router-dom
  const location = useLocation();

  // State to keep track of the previous scroll position
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  // State to determine if the header should be visible
  const [visible, setVisible] = useState(true);
  // State to check if the user is at the top of the page
  const [isTop, setIsTop] = useState(true);

  // Function to handle scroll events
  const handleScroll = () => {
    // Get the current scroll position
    const currentScrollPos = window.pageYOffset;
    // Determine if the user is scrolling up
    const scrolledUp = prevScrollPos > currentScrollPos;
    // Set the visibility of the header based on scroll direction and position
    setVisible(scrolledUp || currentScrollPos < 10);
    // Check if the user is at the top of the page
    setIsTop(currentScrollPos < 10);
    // Update the previous scroll position state
    setPrevScrollPos(currentScrollPos);
  };

  // Add and clean up the scroll event listener
  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);
    // Remove scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  // Determine if the header and footer should be displayed based on the current path
  const show = location.pathname !== "/login" &&
               location.pathname !== "/register" && 
               location.pathname !== "/profile" && 
               location.pathname.slice(0, 10) !== "/dashboard";

  return (
    // Main container for the page with flex layout and minimum height to cover the screen
    <div className='min-h-screen flex flex-col relative'>
      {show && (
        // Header container with conditional classes for visibility and background color
        <div className={`mx-auto fixed z-[999] left-0 right-0 w-full  transition-all duration-300 ${visible ? 'top-0' : '-top-20'} ${isTop ? 'bg-transparent' : 'bg-blue-50 shadow-lg'}`}>
         <div className='lg:container mx-auto'>
         <Header />
         </div>
        </div>
      )}

      {/* Outlet for rendering child routes */}
      <Outlet />

      {show && (
        // Footer container
        <div className='mx-auto mt-auto z-50 w-full'>
          <Footer />
        </div>
      )}

      {/* Modal components for success and error messages */}
      <Success />
      <ErrorModel />
      
      {/* ScrollToTop component for smooth scrolling to the top */}
      <ScrollToTop className='z-50 bg-black' smooth top={20} />
    </div>
  );
};

export default Root;
