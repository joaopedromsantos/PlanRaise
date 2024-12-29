import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../services/authService';
import { useLoader } from '../context/loaderContext.jsx';

const useAuth = ({ redirectIfAuthenticated, redirectIfUnauthenticated }) => {
    const navigate = useNavigate();

    const { startLoader, stopLoader } = useLoader(); 

    useEffect(() => {

        startLoader();

        const token = localStorage.getItem('authToken');

        if (token) {
            verifyToken(token)
                .then(() => {
                    if (redirectIfAuthenticated) {
                        navigate(redirectIfAuthenticated, { replace: true });
                    }
                })
                .catch(() => {
                    localStorage.removeItem('authToken');
                    if (redirectIfUnauthenticated) {
                        navigate(redirectIfUnauthenticated, { replace: true });
                    }
                });
        } else if (redirectIfUnauthenticated) {
            navigate(redirectIfUnauthenticated, { replace: true });
        }

        stopLoader();
        
    }, [navigate, redirectIfAuthenticated, redirectIfUnauthenticated]);
};

export default useAuth;
