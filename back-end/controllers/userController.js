import User from '../models/usersModel.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ googleId, email, name, picture });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1y' }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    toast('Erro na autenticação com Google: ' + error.message, { type: 'error' });
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

export const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Token válido', userId: decoded.id });
  } catch (error) {
    toast('Erro ao verificar o token: ' + error.message, { type: 'error' });
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};
