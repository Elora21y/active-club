import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/auth.jpg'
const AuthLayout = () => {
    return (
        <div >
            <main className="min-h-screen w-full"
             style={{
                backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.5), rgba(0,0,0,0.28)) , url(${authImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
                   <div className=" flex justify-center items-center min-h-screen py-10">
                     <Outlet/>
                   </div>
            </main>

        </div>
    );
};

export default AuthLayout;