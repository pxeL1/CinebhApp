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

export default function MediaCarousel<T>(
  props: PropsWithChildren<MediaCarouselProps<T>>,
) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center h-10 mb-8">
        <div className="font-bold text-4xl">{props.title}</div>
        <Link
          to="/"
          className="font-semibold tracking-[.015em] text-atlantdarkred hover:underline hidden"
        >
          See All
        </Link>
      </div>
      <div className="flex gap-4 mb-6">{props.children}</div>
      <div className="flex justify-end">
        <CarouselPagination
          pageNumber={props.page.number}
          pageSize={props.page.size}
          numberOfElements={props.page.numberOfElements}
          totalElements={props.page.totalElements}
          totalPages={props.page.totalPages}
          nextPage={props.nextPage}
          previousPage={props.prevPage}
        />
      </div>
    </div>
  );
}
