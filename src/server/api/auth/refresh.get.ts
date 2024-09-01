import { User } from '../../models/User';
import { findToken, generateTokens, saveToken, validateRefreshToken } from '../../token/tokengenerate';
import UserDto from '../../dto/user-dto';

export default defineEventHandler(async (token) => {
  const refreshToken = getQuery(token);

   const userData = validateRefreshToken(refreshToken);
   const tokenFromDb = await findToken(refreshToken);
  if (!userData || !tokenFromDb) {
    console.log('Ошибка');
  }

  const findUser = await User.findById(userData.id);

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
