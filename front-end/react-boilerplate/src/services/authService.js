import api from './api';
import { toast } from 'react-toastify'; // Importando o toastify

export async function authenticateWithGoogle(credential) {
  try {
    const response = await api.post('/auth/google', { credential });
    const data = response.data;

    if (response.status === 200) {
      localStorage.setItem('authToken', data.token);
      return data;
    } else {
      toast('Erro ao autenticar: ' + data.message, { type: 'error' });
      throw new Error(data.message);
    }
  } catch (error) {
    toast('Erro ao se conectar ao backend: ' + error.message, { type: 'error' });
    throw error;
  }
}

export async function verifyToken(token) {
  try {
    const response = await api.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    toast('Erro ao verificar token: ' + error.message, { type: 'error' });
    throw error;
  }
}
