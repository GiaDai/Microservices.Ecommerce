
import {
    List,
} from "@refinedev/antd";
import { useCustom } from "@refinedev/core";
import { Table } from "antd";
import { IProductResponse, IProduct } from "./types";

export const ProductList: React.FC = () => {
    const { data, isLoading } = useCustom<IProductResponse>({
        url: `/api/v1/product`,
        method: "get",
        config: {
            query: {
                pageNumber: 1,
                pageSize: 10,
            },
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <List>
        <Table dataSource={data?.data?.data || []} rowKey="id">
            <Table.Column<IProduct> title="Name" dataIndex="name" />
            <Table.Column<IProduct> title="Description" dataIndex="description" />
            <Table.Column<IProduct> title="Price" dataIndex="price" />
            <Table.Column<IProduct> title="Rate" dataIndex="rate" />
            <Table.Column<IProduct> title="Price" dataIndex="price" />
        </Table>
    </List>
}