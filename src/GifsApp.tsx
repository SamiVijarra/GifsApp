
import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { getGifsByQuery } from "./gifs/components/actions/get-gifs-by-query.action"
import type { Gif } from "./gifs/components/interfaces/gif.interfaces"


export const GifsApp = () => {


  const [gifs, setGifs] = useState<Gif[]>([])

  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  const handleSearch = async (query: string = '') => {
    query = query.trim().toLowerCase();

    if (query.length === 0) return;

    if (previousTerms.includes(query)) return; 

    setPreviousTerms([query, ...previousTerms].splice(0, 8));

    const gifs = await getGifsByQuery(query);

    setGifs(gifs);
    };

  return (
    <>
      <CustomHeader title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto" />
      <SearchBar placeholder="Buscar Gifs"
        onQuery={handleSearch} />
      <PreviousSearches searches={previousTerms}
        onLabelClicked={handleTermClicked} />
      <GifList gifs={gifs} />
    </>
  );
};
