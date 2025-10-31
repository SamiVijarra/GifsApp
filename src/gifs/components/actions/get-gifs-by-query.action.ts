
import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interfaces';
import { giphyApi } from '../api/giphy.api';

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  const response = await giphyApi<GiphyResponse>('/search', {
    params: {
      q: query,
      limit: 15,
    },
  });

  return response.data.data.map( (gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  })
  )


  //fetch(`https://api.giphy.com/v1/gifs/search?api_key=LPxHmAsKEi2QgvI1KwPkOkAI6qQsrBM4&q=${query}&limit=15&lang=es`);
};