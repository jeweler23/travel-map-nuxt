import { OAuth2Client } from 'google-auth-library';
// import { createError } from 'nuxt/dist/app/composables/error';
// import { useRuntimeConfig } from '#app';
// import { useRuntimeConfig } from 'nuxt/dist/app/nuxt';

const config = useRuntimeConfig();
const googleClientId = config.googleClientId;
const client = new OAuth2Client(googleClientId);

async function verify(token: string) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleClientId,
  });
  const payload = ticket.getPayload();

  return payload;
}

export default defineEventHandler(async (key: string) => {
  const { token } = await readBody(key);

  if (!token) {
    throw createError ({
      statusCode: 401,
      message: 'user not found',
    });
  }
  const user = await verify(token);
  return user;
});
