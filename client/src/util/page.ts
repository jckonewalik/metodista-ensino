export interface Page<T> {
  currentPage: number;
  data: T[];
  pages: number;
}
