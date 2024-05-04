import {
  useTable,
  List,
  ShowButton,
  EditButton,
  DeleteButton,
  getDefaultSortOrder,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { Product } from "./types";
export const ListProduct = () => {
  const { tableProps, sorters } = useTable<Product>({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "Id", order: "asc" }] },
    syncWithLocation: true,
  });
  return (
    <List>
      <Table {...tableProps} rowKey="Id">
        <Table.Column
          dataIndex="Id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("Id", sorters)}
        />
        <Table.Column
          dataIndex="Name"
          title="Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("Name", sorters)}
        />

        <Table.Column
          dataIndex="Barcode"
          title="Barcode"
          sorter
          defaultSortOrder={getDefaultSortOrder("Barcode", sorters)}
        />
        <Table.Column
          dataIndex="Rate"
          title="Rate"
          sorter
          defaultSortOrder={getDefaultSortOrder("Rate", sorters)}
        />
        <Table.Column
          dataIndex="Price"
          title="Price"
          sorter
          defaultSortOrder={getDefaultSortOrder("Price", sorters)}
        />
        <Table.Column
          dataIndex="Description"
          title="Description"
          sorter
          defaultSortOrder={getDefaultSortOrder("Description", sorters)}
        />
        <Table.Column
          title="Actions"
          render={(_, record: Product) => (
            <Space>
              {/* We'll use the `EditButton` and `ShowButton` to manage navigation easily */}
              <ShowButton hideText size="small" recordItemId={record.Id} />
              <EditButton hideText size="small" recordItemId={record.Id} />
              <DeleteButton hideText size="small" recordItemId={record.Id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
