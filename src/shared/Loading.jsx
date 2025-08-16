import React from 'react';
import loading from '../assets/SportLoading.json'
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <div className="text-center flex flex-col justify-center items-center min-h-screen">
          {/* <span className="loading loading-bars loading-lg text-primary" /> */}
    <Lottie animationData={loading} loop={true}  style={{
                maxWidth : '250px'
            }}/>
 
        </div>
    );
};

export default Loading;