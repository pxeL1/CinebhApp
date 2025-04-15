import Button from "components/common/Button/Button";
import { ButtonType } from "models/ButtonType";
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
  return (
    <div className="flex">
      <div className="flex items-center mr-4">
        Showing
        <div className="font-semibold mx-1">
          {pageNumber +
            1 +
            (pageNumber * pageSize - pageNumber) +
            " - " +
            (pageNumber +
              1 +
              (pageNumber * pageSize - pageNumber) +
              (numberOfElements - 1))}
        </div>
        out of
        <div className="font-semibold mx-1">{totalElements}</div>
      </div>
      <Button
        variant={ButtonType.SECONDARY}
        onClick={previousPage}
        isActive={pageNumber > 0}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <div className="w-4"></div>
      <Button
        variant={ButtonType.SECONDARY}
        onClick={nextPage}
        isActive={pageNumber < totalPages - 1}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  );
}
