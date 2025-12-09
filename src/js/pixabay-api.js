import axios from 'axios';

async function getImagesByQuery(query, page) {
  const per_page = 15;
  try {
    const response = await axios
      .get(`https://pixabay.com/api/`, {
        params: {
          key: '53361470-387588d6f5d48c87f9e06e518',
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: page,
          per_page: per_page,
        },
      });
    return {
      images: response.data.hits,
      total: response.data.totalHits,
    };
  }
  catch(error) {
    throw error;
  }
}

export default getImagesByQuery;