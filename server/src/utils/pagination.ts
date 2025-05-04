import { PaginationParams } from "caresync/types/pagination";
import { PAGINATION_LIMIT } from "@/constants/rules";

export class PaginationLimitExceededError extends Error {
    constructor(limit: number) {
        super(`Pagination limit exceeded: ${limit}`);
        this.name = 'PaginationLimitExceededError';
        Object.setPrototypeOf(this, PaginationLimitExceededError.prototype);
    }
}

export class NegativeOffsetError extends Error {
    constructor(offset: number) {
        super(`Negative offset: ${offset}`);
        this.name = 'NegativeOffsetError';
        Object.setPrototypeOf(this, NegativeOffsetError.prototype);
    }
}

export const validatePage = (params: PaginationParams) => {
    const { size, page } = params;

    if (size > PAGINATION_LIMIT) {
        throw new PaginationLimitExceededError(size);
    }

    if (page < 0) {
        throw new NegativeOffsetError(page*size);
    }

    return params;
}

export const defaultPaginationParams: PaginationParams = {
    size: 10,
    page: 0,
};
