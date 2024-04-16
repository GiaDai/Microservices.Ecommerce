
import {
    List,
    useTable,
} from "@refinedev/antd";
import { useList, HttpError } from "@refinedev/core";
import { Table } from "antd";
import { IProductResponse, IProduct } from "./types";

export const ProductList: React.FC = () => {
    const { data, isLoading, isError } = useList<IProductResponse, HttpError>({
        resource: "api/v1/product",
    });
    const products = data?.data? ?? [];
    console.log(products);
    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (isError) {
        return <div>Something went wrong!</div>;
      }
    return <List>
        <Table dataSource={products} rowKey="id">
            <Table.Column<IProduct> title="Name" dataIndex="name" />
            <Table.Column<IProduct> title="Description" dataIndex="description" />
            <Table.Column<IProduct> title="Price" dataIndex="price" />
        </Table>
    </List>
}