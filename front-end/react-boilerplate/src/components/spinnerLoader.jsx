import React, { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {

    useEffect(() => {
        setTimeout(() => {
        }, 3000);
    });


    return (
        <div className="flex justify-center items-center h-screen">
            <TailSpin
                height={80}
                width={80}
                color="#44749D"
                visible={true}
                ariaLabel="tail-spin-loading"
                radius={1}
            />
        </div>
    );
};

export default Loader;
