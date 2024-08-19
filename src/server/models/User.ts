import { Schema, model } from 'mongoose';

interface IUser {
  email: string;
  username: string;
  password: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    length: [8, 'Пароль должен  содержать 8 символов'],
  },
});

export const User = model<IUser>('User', UserSchema);
