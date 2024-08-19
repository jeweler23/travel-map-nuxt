// import { createError } from 'nuxt/dist/app/composables/error';
import { User } from '../../models/User';

export default defineEventHandler(async (data) => {
  const body = await readBody(data);
  if (!body.email || !body.username || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      message: 'Missing required fields',
    });
  }
  const user = await User.create({ ...body });

return { ...user };
});
