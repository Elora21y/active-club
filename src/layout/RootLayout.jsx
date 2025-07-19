import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../shared/Footer';
import Loading from '../shared/Loading';

const RootLayout = () => {
    const navigation = useNavigation()
    const isNavigation = Boolean(navigation.location)
    return (
        <div className='bg-linear-to-r from-[#0e101f] to-[#0e2136] min-h-screen relative'>
            <header  className='sticky z-100 top-0 backdrop-blur-3xl'>
            <Navbar/>
            </header>
            <main className=' min-h-[calc(100vh-200px)]'>
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