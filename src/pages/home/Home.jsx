import React from 'react';
import Banner from './Banner';
import About from './About';
import Location from './Location';
import Promotions from './Promotions';

const Home = () => {
    return (
        <>
        <div className='w-full'>
            <Banner/>
        </div>
        <div className='max-w-6xl mx-auto my-10 lg:my-16 xl:my-26 space-y-10 lg:space-y-16 xl:space-y-22  px-5 sm:px-8 xl:px-0 text-xs sm:text-sm'>
            <About/>
            <Location/>
            <Promotions/>
        </div>
        </>
    );
};

export default Home;