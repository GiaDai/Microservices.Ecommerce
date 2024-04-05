export interface ApiResponse<T> {
    pageNumber: number;
    pageSize: number;
    succeeded: boolean;
    message: string | null;
    errors: string | null;
    data: T;
}
