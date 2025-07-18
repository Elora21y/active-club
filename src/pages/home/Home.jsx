import React from 'react';
import Banner from './Banner';
import About from './About';

const Home = () => {
    return (
        <>
        <div className='w-full'>
            <Banner/>
        </div>
        <div className='max-w-6xl mx-auto my-10 lg:my-16 xl:my-20  px-5 sm:px-8 xl:px-0 text-xs sm:text-sm'>
            <About/>
        </div>
        </>
    );
};

export default Home;