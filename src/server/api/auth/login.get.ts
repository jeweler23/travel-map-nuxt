// import { createError } from 'nuxt/dist/app/composables/error';
import bcrypt from 'bcrypt';
import { User } from '../../models/User';
import { generateTokens, saveToken } from '../../token/tokengenerate';
import UserDto from '../../dto/user-dto';

export default defineEventHandler(async (data) => {
  const body = getQuery(data);
  console.log(body.username);

  const findUser = await User.findOne({ username: body.username });
  console.log(findUser);

  if (!findUser) {
    throw createError({
      message: 'User not found',
    });
  }
  // проверяем пароль
  const isPassEquals = await bcrypt.compare(body.password, findUser.password);

  if (!isPassEquals) {
    throw createError({
      message: 'Passwords are not equal',
    });
  }

  // получаем нужные данные из юзера
  const userDto = new UserDto(findUser); // id,email

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
