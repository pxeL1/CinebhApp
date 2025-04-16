import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";
import CarouselPagination from "components/common/CarouselPagination/CarouselPagination";
import { Page } from "models/Page";

export interface MediaCarouselProps<T> {
  title: string;
  page: Page<T>;
  nextPage: () => void;
  prevPage: () => void;
}

export default function PaginatedCarousel<T>(
  {title, page, nextPage, prevPage, children}: PropsWithChildren<MediaCarouselProps<T>>,
) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center h-10 mb-8">
        <div className="font-bold text-4xl">{title}</div>
        <Link
          to="/"
          className="font-semibold tracking-[.015em] text-cinebhdarkred hover:underline hidden"
        >
          See All
        </Link>
      </div>
      <div className="grid grid-rows-1 grid-cols-4 gap-4 mb-6">{children}</div>
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
