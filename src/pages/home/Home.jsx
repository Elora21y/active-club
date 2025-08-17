import React from 'react';
import Banner from './Banner';
import About from './About';
import Location from './Location';
import Promotions from './Promotions';
import RecentCourts from './CourtCard';

const Home = () => {
    return (
        <>
        <div className='w-full'>
            <Banner/>
        </div>
        <div className='max-w-6xl mx-auto my-16 lg:my-26 xl:my-36 space-y-16 lg:space-y-26 xl:space-y-32 px-5 sm:px-8 xl:px-0 text-xs sm:text-sm'>
            <About/>
            <RecentCourts/>
            <Location/>
            <Promotions/>
        </div>
        </>
    );
};

export default Home;