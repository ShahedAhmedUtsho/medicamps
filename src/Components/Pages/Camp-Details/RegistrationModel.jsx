import { Button } from "keep-react";
import { X } from "phosphor-react";
import React, { useState } from "react";

const DemoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button
        type="button"
        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        onClick={toggleModal}
      >
        Launch demo modal long
      </button>

      {isModalOpen && (
        <div className="fixed  left-0 apple bg-slate-200  bg-opacity-30 flex justify-center items-center top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none">
          <div className="pointer-events-none  relative w-auto translate-y-[-50px]  opacity-100 transition-all duration-300 ease-in-out  mx-auto mt-7 max-w-[600px]">



            <div className=" modal bg-white pointer-events-auto  relative flex w-full flex-col rounded-md border-none bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">



              <div className="flex bg-blue-500 flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
                <h5 className="text-xl apple font-medium leading-normal text-white dark:text-white">
                 Register camp
                </h5>
                <button
                  type="button"
                  className="box-content  rounded-none border-none text-neutral-200 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                  onClick={toggleModal}
                  aria-label="Close"
                >
                 <X size={23} />
                </button>
              </div>






              <div className="relative p-4 apple min-h-96">
                This is some placeholder content to show the scrolling behavior
                for modals. Instead of repeating the text in the modal, we use
                an inline style to set a minimum height, thereby extending the
                length of the overall modal and demonstrating the overflow
                scrolling. When content becomes longer than the height of the
                viewport, scrolling will move the modal as needed.
              </div>

              <div className="flex flex-shrink-0 gap-3 flex-wrap  items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
                <Button
                  type="button"
                  className="" 
                  variant="outline"
                  onClick={toggleModal}
                >
                    
                  Close
                </Button>
                <Button
                  type="button"
                  className=""
                >
                  Save changes
                </Button>
              </div>
            </div>








          </div>
        </div>
      )}
    </div>
  );
};

export default DemoModal;
