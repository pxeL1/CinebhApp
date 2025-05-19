import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";
import CarouselPagination from "components/common/PaginatedCarousel/CarouselPagination";
import { Page } from "models/Page";

export interface PaginatedCarouselProps<T> {
  title: string;
  seeAllPath: string;
  page: Page<T>;
  nextPage: () => void;
  prevPage: () => void;
  numberOfElements?: number;
}

export default function PaginatedCarousel<T>({
  title,
  page,
  seeAllPath,
  nextPage,
  prevPage,
  children,
  numberOfElements = 4,
}: PropsWithChildren<PaginatedCarouselProps<T>>) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center h-10 mb-8">
        <div className="font-bold text-4xl">{title}</div>
        <Link
          to={seeAllPath}
          className="font-semibold tracking-[.015em] text-cinebhdarkred hover:underline"
        >
          See All
        </Link>
      </div>
      <div className={`grid grid-rows-1 grid-cols-6 gap-4 mb-6`}>
        {children}
      </div>
      <div className="flex justify-end">
        <CarouselPagination
          pageNumber={page.number}
          pageSize={page.size}
          numberOfElements={page.numberOfElements}
          totalElements={page.totalElements}
          totalPages={page.totalPages}
          nextPage={nextPage}
          previousPage={prevPage}
        />
      </div>
    </div>
  );
}
