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

  function calculateRange(){
    return pageNumber +
      1 +
      (pageNumber * pageSize - pageNumber) +
      " - " +
      (pageNumber +
        1 +
        (pageNumber * pageSize - pageNumber) +
        (numberOfElements - 1));
  }

  return (
    <div className="flex">
      <div className="flex items-center mr-4">
        Showing
        <div className="font-semibold mx-1">
          {calculateRange()}
        </div>
        out of
        <div className="font-semibold mx-1">{totalElements}</div>
      </div>
      <div className='flex gap-4'>
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
