// import { useRuntimeConfig } from "nuxt/dist/app/nuxt";
// import { useRuntimeConfig } from 'nuxt/app';

const config = useRuntimeConfig();
const yandexSuggest = config.yandexSuggest;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const text = query.text as string;
  const response = await fetch(
     `https://suggest-maps.yandex.ru/v1/suggest?apikey=${yandexSuggest}&text=${text}&results=7&print_address=1`,
    );
  const data = await response.json();
  return data;
});
