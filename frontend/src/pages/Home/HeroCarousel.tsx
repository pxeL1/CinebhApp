import { Movie } from "models/Movie";
import { useState } from "react";
import Button, { ButtonType } from "components/common/Button/Button";
import HeroControl from "pages/Home/HeroControl";
import useFetchPage from "hooks/useFetchPage";
import { getCurrentMoviesRequest } from "services/fetching/API";

export default function HeroCarousel() {
  const { page, loading, error } = useFetchPage<Movie>(
    getCurrentMoviesRequest(),
    0,
    3,
  );
  const [index, setIndex] = useState(0);

  if (error) {
    return (
      <div className="p-96 flex justify-center items-center text-2xl text-cinebhdarkred">
        Error while loading content
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-96 flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-[810px] flex flex-col justify-end">
      <img
        src={page.content.at(index)?.images[0].url}
        alt="Hero cover image"
        className="min-w-[1440px] h-[810px] w-full absolute pointer-events-none -z-[1] object-cover"
      />
      <div className="w-xl ml-24 flex flex-col mb-10">
        <div className="w-20 h-8 rounded-lg bg-cinebhpale text-black flex items-center justify-center mb-4">
          {page.content.at(index)?.genres[0].genre.name ?? ""}
        </div>
        <div className="text-5xl font-bold text-cinebhneutral mb-4">
          {page.content.at(index)?.name ?? ""}
        </div>
        <div className="text-xl font-bold text-cinebhneutral mb-8">
          {page.content.at(index)?.synopsis ?? ""}
        </div>
        <div className="hidden">
          <Button variant={ButtonType.PRIMARY} onClick={() => {}}>Buy Ticket</Button>
        </div>
      </div>
      <div className="w-full flex justify-center items-center p-8">
        <HeroControl
          numberOfItems={page.numberOfElements}
          selectedIndex={index}
          onIndexChange={setIndex}
        />
      </div>
    </div>
  );
}
