import jwt from 'jsonwebtoken';
import { Token } from '../models/Token';

const config = useRuntimeConfig();

export function generateTokens(payload) {
  const accessToken = jwt.sign(payload, config.accessToken, { expiresIn: '30m' });
  const refreshToken = jwt.sign(payload, config.refreshToken, { expiresIn: '30d' });

  return {
    accessToken,
    refreshToken,
  };
}

export async function saveToken(userId: string, refreshToken: string) {
  console.log('asd');

  const tokenData = await Token.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await Token.create({ user: userId, refreshToken });
  return token;
}
