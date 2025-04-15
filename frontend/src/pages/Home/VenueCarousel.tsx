import MediaCarousel from "components/common/MediaCarousel/MediaCarousel";
import Card from "components/common/Card/Card";
import { Venue } from "models/Venue";
import useFetchPage from "hooks/useFetchPage";
import { defaultImage } from "assets/default_values/defaultValues";
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
      <div className="h-[620px] flex justify-center items-center text-2xl text-atlantdarkred">
        Error while loading page
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
    <div className="w-[1256px] mb-10">
      <MediaCarousel
        title="Venues"
        nextPage={nextPage}
        prevPage={previousPage}
        page={page}
      >
        {page.content.map((venue) => {
          const coverImage = venue.image;
          const coverImageUrl: string = coverImage?.url ?? defaultImage;

          return (
            <Card
              key={venue.id}
              imageUrl={coverImageUrl}
              title={venue.name}
              description={
                <div className="text-atlantlightgray text-sm h-5 flex ml-1">
                  {venue.streetAddress}, {venue.city}
                </div>
              }
            />
          );
        })}
      </MediaCarousel>
    </div>
  );
}
