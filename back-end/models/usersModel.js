import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String },
}, { timestamps: true });

export default model('User', userSchema);
