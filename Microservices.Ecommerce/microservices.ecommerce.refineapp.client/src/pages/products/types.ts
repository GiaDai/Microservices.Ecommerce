export interface IProduct {
    name: string;
    barcode: string;
    description: string;
    rate: number;
    price: number;
}

export interface IProductResponse {
    pageNumber: number;
    pageSize: number;
    succeeded: boolean;
    message?: any;
    errors?: any;
    data: IProduct[];
  }