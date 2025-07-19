// src/pages/Page404.jsx
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/Error404.json';

const Page404 = () => {
  return (
    <div className="flex flex-col  min-h-screen justify-center items-center">
        <Lottie animationData={errorAnimation} loop={true}  style={{
                maxWidth : '550px'
            }}/>
        <Link
          to="/"
          className="btn bg-gradient-to-r from-blue-500 to-primary text-white px-6 py-2 rounded-full transition duration-500 hover:scale-105"
        >
          Go Back Home
        </Link>
    </div>
  );
};

export default Page404;
