import React from 'react';
import Logo from '../../assets/planpraise_logo.svg';
import IpiLogo from '../../assets/ipi_logo.svg';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"

const Login = () => {
    return (
        <div className='h-screen flex flex-col items-center'>
            <div className='flex-grow flex flex-col items-center justify-center'>
                <img className='max-w-40 mb-2' src={Logo} alt="Logo" />
                <h2 className='text-5xl font-semibold text-mainBlue mb-[16%]'>PlanPraise</h2>

                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        console.log(jwtDecode(credentialResponse.credential));
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>

            <div className='mb-12'>
                <img className='w-12' src={IpiLogo} alt="Logo IPI" />  
            </div>
            
        </div>
    );
};

export default Login;