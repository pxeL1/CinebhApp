export type Page<T> = {
  content: Array<T>;
  pageable: object;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: object;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};
