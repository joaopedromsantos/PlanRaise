import React, { useEffect } from 'react';

import useAuth from '../../hooks/useAuth';

import { useLoader } from '../../context/loaderContext.jsx';

const Home = () => {
    
    useAuth({ redirectIfUnauthenticated: '/' });

    const { startLoader, stopLoader } = useLoader(); 

    useEffect(() => {
        startLoader();  

        const timer = setTimeout(() => {
            stopLoader();
        }, 1000); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='bg-slate-200 w-full h-screen flex items-center justify-center'>
            <h1 className='font-semibold text-4xl'>Autenticado!!</h1>
        </div>
    );
};

export default Home;