import PaginatedCarousel from "components/common/PaginatedCarousel/PaginatedCarousel";
import usePagination from "hooks/usePagination";
import useFetchPage from "hooks/useFetchPage";
import { Movie } from "models/Movie";
import { getCurrentMoviesRequest } from "services/fetching/API";
import { Page } from "models/Page";
import { defaultImage } from "defaultValues";
import Card, { CardType } from "components/common/Card/Card";
import { Link } from "react-router-dom";

export default function SeeAlsoCarousel() {
  const { pageNumber, pageSize, nextPage, previousPage } = usePagination(6);
  const { page, loading, error } = useFetchPage<Movie>(
    getCurrentMoviesRequest(),
    pageNumber,
    pageSize,
  );

  if (error) {
    return (
      <div className="w-full text-center text-cinebherrordark">
        Error while loading.
      </div>
    );
  }

  if (loading) {
    return <div className="w-full text-center">Loading...</div>;
  }

  return (
    <PaginatedCarousel
      title="See Also"
      seeAllPath="/currently"
      nextPage={nextPage}
      prevPage={previousPage}
      page={page}
      numberOfElements={6}
    >
      <SeeAlsoCards page={page} />
    </PaginatedCarousel>
  );
}

interface SeeAlsoCardProps {
  page: Page<Movie>;
}

function SeeAlsoCards({ page }: SeeAlsoCardProps) {
  return page?.content.map((movie) => {
    const coverImage = movie.images.find((image) => image.coverPhoto);
    const coverImageUrl: string = coverImage?.url ?? defaultImage;

    return (
      <Link to={`/details/${movie.id}`} key={movie.id}>
        <Card
          imageUrl={coverImageUrl}
          title={movie.name}
          type={CardType.SMALL}
        />
      </Link>
    );
  });
}
