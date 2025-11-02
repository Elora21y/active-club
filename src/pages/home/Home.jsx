import React from 'react';
import Banner from './Banner';
import About from './About';
import Location from './Location';
import Promotions from './Promotions';
import RecentCourts from './CourtCard';
import ReviewSection from './ReviewSection';
import Newsletter from './Newsletter';

const Home = () => {
    return (
        <>
        <div className='max-w-[2700px] mx-auto'>
            <Banner/>
        <div className='max-w-6xl mx-auto my-26 xl:my-36 space-y-26 xl:space-y-32 px-5 sm:px-8 xl:px-0 text-xs sm:text-sm'>
            <About/>
            <RecentCourts/>
            <Location/>
            <Promotions/>
            <ReviewSection/>
        </div>
            <Newsletter/>
        </div>
        </>
    );
};

export default Home;