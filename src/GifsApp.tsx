
import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"


export const GifsApp = () => {

  const [previousTerms, setPreviousTerms] = useState(['cats']);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  const handleSearch = (query: string) => {
    console.log({ query });
  };

  return (
    <>
      <CustomHeader title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto" />
      <SearchBar placeholder="Buscar Gifs"
        onQuery={handleSearch} />
      <PreviousSearches searches={previousTerms}
        onLabelClicked={handleTermClicked} />
      <GifList gifs={mockGifs} />
    </>
  )
}
