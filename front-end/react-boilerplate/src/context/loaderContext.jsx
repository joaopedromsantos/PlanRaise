import React, { createContext, useContext, useState } from 'react';
import Loader from '../components/spinnerLoader.jsx'; 
const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const startLoader = () => {
        setLoading(true);
    };

    const stopLoader = () => {
        setLoading(false);
    };

    return (
        <LoaderContext.Provider value={{ loading, startLoader, stopLoader }}>
            {loading && <Loader />}
            {children}
        </LoaderContext.Provider>
    );
};
