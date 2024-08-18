import { cors } from 'cors';
import { cookieParser } from 'cookie-parser';
import mongoose from 'mongoose';

// cookie
export default defineEventHandler((event) => {
  const myCookie = useCookie(event, 'my_cookie').value;
  setCookie(event, 'new_cookie', 'value', { httpOnly: true });
});
