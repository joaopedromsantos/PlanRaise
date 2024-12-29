import React, { useEffect } from 'react';
import Logo from '../../assets/planpraise_logo.svg';
import IpiLogo from '../../assets/ipi_logo.svg';
import { GoogleLogin } from '@react-oauth/google';
import { authenticateWithGoogle } from '../../services/authService';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    useAuth({ redirectIfAuthenticated: '/home' });

    return (
        <div className='h-screen flex flex-col items-center justify-center bg-slate-100 overflow-hidden'>
            <div className='flex-grow flex flex-col items-center justify-center'>
                <img className='max-w-40 mb-2' src={Logo} alt="Logo" />
                <h2 className='text-5xl font-semibold text-mainBlue mb-[16%]'>PlanPraise</h2>

                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        const credential = credentialResponse.credential;
                        try {
                            await authenticateWithGoogle(credential);

                            toast('Login com sucesso!', { type: 'success' });
                            navigate('/home', { replace: true });
                        } catch (error) {
                            toast('Autenticação falhou!', { type: 'error' });
                        }
                    }}
                    onError={() => {
                        toast('Autenticação falhou!', { type: 'error' });
                    }}
                />
            </div>
            
        </div>
    );
};

export default Login;