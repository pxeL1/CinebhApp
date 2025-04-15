import useFetchPage from "hooks/useFetchPage";
import { Venue } from "models/Venue";
import { getVenuesRequest } from "services/fetching/API";

export default function HeroVenues() {
  const { page, loading, error } = useFetchPage<Venue>(
    getVenuesRequest(),
    0,
    5,
  );

  if (error) {
    return (
      <div className="h-[620px] flex justify-center items-center text-2xl text-atlantdarkred">
        Error while loading content
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-[620px] flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-40 py-12 flex justify-center gap-10 px-24 mb-10">
      {page.content.map((venue) => {
        return (
          <div
            key={venue.id}
            className="h-16 border border-atlantpale rounded-lg flex justify-center items-center p-4 text-atlantash text-2xl font-bold"
          >
            {venue.name}
          </div>
        );
      })}
    </div>
  );
}
