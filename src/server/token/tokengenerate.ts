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
  const tokenData = await Token.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await Token.create({ user: userId, refreshToken });
  return token;
}

export async function removeToken(refreshToken) {
  const tokenData = await Token.deleteOne({ refreshToken });
  return tokenData;
}

export function validateAccessToken(token) {
  try {
    const userData = jwt.verify(token, config.accessToken);
    return userData;
  }
 catch (e) {
    return null;
  }
}

export function validateRefreshToken(token) {
  try {
    const userData = jwt.verify(token, config.refreshToken);
    return userData;
  }
 catch (e) {
    return null;
  }
}

export async function findToken(refreshToken) {
  const tokenData = await Token.findOne({ refreshToken });
  return tokenData;
}
