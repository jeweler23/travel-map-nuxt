// import { createError } from 'nuxt/dist/app/composables/error';
import bcrypt from 'bcrypt';
import { User } from '../../models/User';
import { generateTokens, saveToken } from '../../token/tokengenerate';
import UserDto from '../../dto/user-dto';

export default defineEventHandler(async (data) => {
  const body = await readBody(data);
  if (!body.email || !body.username || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      message: 'Missing required fields',
    });
  }
  // Можно не делать, так как стоит проверка на уникальность полей
  const findUser = await User.findOne({ ...body.email });
  if (findUser) {
    throw createError({
      message: 'User already exists',
    });
  }
  // хэшируем пароль
  const hashPassword = await bcrypt.hash(body.password, 3);
  // создаем юзера
  const user = await User.create({ ...body, password: hashPassword });
  // получаем нужные данные из юзера
  const userDto = new UserDto(user); // id,email

  // генерируем токены
  const token = generateTokens({ ...userDto });

  // созраняем рефреш по айди юзера
  await saveToken(userDto.id, token.refreshToken);

  setCookie(data, 'refreshToken', token.refreshToken, {
    httpOnly: true, // доступен только на сервере
    maxAge: 60 * 60 * 24 * 30, // куки будет действовать 30 дней
  });

  return { ...token, user: userDto };
});
