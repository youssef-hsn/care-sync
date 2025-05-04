export type PaginationParams = {
    size: number;
    page: number;
};

export type PaginationResponse<T> = {
    data: T[];
    total: number;
};
  