export type PaginationParams = {
    size: number;
    page: number;
    search?: string;
};

export type PaginationResponse<T> = {
    data: T[];
    total: number;
    page: number;
};
  