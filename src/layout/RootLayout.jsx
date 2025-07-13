import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../shared/Footer';
import Loading from '../shared/Loading';

const RootLayout = () => {
    const navigation = useNavigation()
    const isNavigation = Boolean(navigation.location)
    return (
        <div className='bg-base-200 dark:bg-linear-to-r from-base-200 to-gray-900 min-h-screen relative'>
            <header  className='sticky backdrop-blur-2xl top-0 z-10 bg-base-200'>
            <Navbar/>
            </header>
            <main className=' min-h-[calc(100vh-313px)]'>
                {
                isNavigation && <Loading/>
            }
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default RootLayout;