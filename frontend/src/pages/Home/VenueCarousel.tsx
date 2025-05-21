import PaginatedCarousel from "components/common/PaginatedCarousel/PaginatedCarousel";
import Card from "components/common/Card/Card";
import { Venue } from "models/Venue";
import useFetchPage from "hooks/useFetchPage";
import { defaultImage } from "defaultValues";
import { getVenuesRequest } from "services/fetching/API";
import usePagination from "hooks/usePagination";

export default function VenueCarousel() {
  const { pageNumber, pageSize, nextPage, previousPage } = usePagination(4);
  const { page, loading, error } = useFetchPage<Venue>(
    getVenuesRequest(),
    pageNumber,
    pageSize,
  );

  if (error) {
    return (
      <div className="p-96 flex justify-center items-center text-2xl text-cinebhdarkred">
        Error while loading page
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
    <div className="w-full mb-10">
      <PaginatedCarousel
        title="Venues"
        seeAllPath="/"
        nextPage={nextPage}
        prevPage={previousPage}
        page={page}
      >
        {page.content.map((venue) => {
          const coverImage = venue.image;
          const coverImageUrl: string = coverImage?.url ?? defaultImage;

          function getVenueAddress(): string {
            return `${venue.streetAddress}, ${venue.city.name}`;
          }

          return (
            <Card
              key={venue.id}
              imageUrl={coverImageUrl}
              title={venue.name}
              description={
                <div className="text-cinebhlightgray text-sm h-5 flex ml-1">
                  {getVenueAddress()}
                </div>
              }
            />
          );
        })}
      </PaginatedCarousel>
    </div>
  );
}
