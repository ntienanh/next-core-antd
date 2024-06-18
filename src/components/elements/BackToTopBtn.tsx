'use client';

import React from 'react';

const BackToTopBtn = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  });

  const jumpToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <React.Fragment>
      {show ? (
        <div className='fixed bottom-0 right-0 z-10 mb-6 mr-6'>
          <button onClick={jumpToTop} className='rounded bg-[#EAB30A] p-2 text-white transition-all hover:bg-yellow-600'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 10l7-7m0 0l7 7m-7-7v18' />
            </svg>
          </button>
        </div>
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
};

export default BackToTopBtn;
