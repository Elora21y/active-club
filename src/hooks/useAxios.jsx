import React from 'react';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL : import.meta.env.VITE_api_url
})

const useAxios = () => {
    return axiosSecure
};

export default useAxios;