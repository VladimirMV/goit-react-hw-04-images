import axios from 'axios';

export async function fetchImages(inputData, page) {
  // console.log('inputData fetchImages=', inputData, page);
  const searchParams = new URLSearchParams({
    key: process.env.REACT_APP_API_KEY,
    q: inputData,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return images.data;
}
// функция axios.get делает GET-запрос на API Pixabay и получает массив данных с объектами изображений.
