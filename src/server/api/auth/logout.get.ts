import { removeToken } from '../../token/tokengenerate';

export default defineEventHandler(async (data) => {
  const cookie = getCookie(data, 'refreshToken') || 0;
  const token = await removeToken(cookie);

  setCookie(data, 'refreshToken', '', {
      httpOnly: true,
      maxAge: -1,
  });

  return {
    statusCode: 200,
    message: 'Successfully logged out.',
  };
});
