const config = useRuntimeConfig();
const yandexMap = config.yandexMap;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const place = query.place as string;
  const response = await fetch(
       `https://geocode-maps.yandex.ru/1.x/?apikey=${yandexMap}&geocode=${place}&format=json`,
  );
  const data = await response.json();
  return data;
});
