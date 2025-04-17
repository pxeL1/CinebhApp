import Button, { ButtonType } from "components/common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export interface CarouselPaginationProps {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
}

export default function CarouselPagination({
  pageNumber,
  pageSize,
  numberOfElements,
  totalElements,
  totalPages,
  nextPage,
  previousPage,
}: CarouselPaginationProps) {
  const totalElementsOnPage = numberOfElements - 1;
  const pageOffset = pageNumber * pageSize - pageNumber;
  const rangeFrom = pageNumber + 1 + pageOffset;
  const rangeTo = pageNumber + 1 + pageOffset + totalElementsOnPage;
  const range = rangeFrom + " - " + rangeTo;

  return (
    <div className="flex">
      <div className="flex items-center mr-4">
        Showing
        <div className="font-semibold mx-1">{range}</div>
        out of
        <div className="font-semibold mx-1">{totalElements}</div>
      </div>
      <div className="flex gap-4">
        <Button
          variant={ButtonType.SECONDARY}
          onClick={previousPage}
          disabled={pageNumber === 0}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Button
          variant={ButtonType.SECONDARY}
          onClick={nextPage}
          disabled={pageNumber === totalPages - 1}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    </div>
  );
}
