import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../shared/Footer';
import Loading from '../shared/Loading';

const RootLayout = () => {
    const navigation = useNavigation()
    const isNavigation = Boolean(navigation.location)
    return (
        <div className='min-h-screen relative'>
            {/* Background Image + Gradient Combined */}
            <div 
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(14, 16, 31, 0.90), rgba(14, 33, 54, 0.80)), url(/bg.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            />
            
            <header className='sticky z-50 top-0 backdrop-blur-3xl'>
                <Navbar/>
            </header>
            <main className='min-h-[calc(100vh-200px)] overflow-hidden'>
                {isNavigation && <Loading/>}
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default RootLayout;