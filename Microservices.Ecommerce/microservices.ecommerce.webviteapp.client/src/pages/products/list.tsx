import {
  useTable,
  List,
  ShowButton,
  EditButton,
  DeleteButton,
  getDefaultSortOrder,
  DateField,
  FilterDropdown,
} from "@refinedev/antd";
import { Table, Space, Input, Button } from "antd";
import { IProduct } from "./types";
import {
  getDefaultFilter,
  useNavigation,
  useCan,
  useDeleteMany,
  useMany,
} from "@refinedev/core";
import { PaginationTotal } from "@components/index";
import React from "react";
import { IUserShort } from "..";
export const ListProduct = () => {
  const { mutate: deleteMutate } = useDeleteMany();
  const { tableProps, sorters, filters } = useTable<IProduct>({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "Id", order: "desc" }] },
  });
  const { data: users, isLoading } = useMany<IUserShort>({
    resource: "users",
    ids:
      [...new Set(tableProps?.dataSource?.map((user) => user.CreatedBy))] ?? [],
  });
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  React.useEffect(() => {
    console.log(selectedRowKeys);
  }, [selectedRowKeys]);
  const { create, push } = useNavigation();
  const { data: canCreate } = useCan({
    resource: "products",
    action: "create",
  });

  const handleDelete = () => {
    const ids = selectedRowKeys.map((key) => key.toString());
    deleteMutate({ resource: "products", ids });
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <List
      headerButtons={
        canCreate ? (
          <>
            <Button onClick={() => create("products")}>Create</Button>
            <Button onClick={() => push("/products/create-range")}>
              Create range
            </Button>
            <Button
              disabled={selectedRowKeys.length === 0}
              onClick={() => handleDelete()}
            >
              Delete range {selectedRowKeys.length}
            </Button>
          </>
        ) : null
      }
    >
      <Table
        {...tableProps}
        rowKey="Id"
        pagination={{
          ...tableProps.pagination,
          showTotal: (total) => (
            <PaginationTotal total={total} entityName="products" />
          ),
        }}
        rowSelection={rowSelection}
      >
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
          defaultFilteredValue={getDefaultFilter("Name", filters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Name" />
            </FilterDropdown>
          )}
        />

        <Table.Column
          dataIndex="Barcode"
          title="Barcode"
          sorter
          defaultSortOrder={getDefaultSortOrder("Barcode", sorters)}
          defaultFilteredValue={getDefaultFilter("Barcode", filters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Barcode" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="Rate"
          title="Rate"
          sorter
          defaultSortOrder={getDefaultSortOrder("Rate", sorters)}
          defaultFilteredValue={getDefaultFilter("Rate", filters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Rate" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="Price"
          title="Price"
          sorter
          defaultSortOrder={getDefaultSortOrder("Price", sorters)}
          defaultFilteredValue={getDefaultFilter("Price", filters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Price" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="CreatedBy"
          title="Created By"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }
            return (
              users?.data?.find((role) => role.Id == value)?.UserName ??
              "Not Found"
            );
          }}
        />
        <Table.Column
          dataIndex="LastModifiedBy"
          title="Last Modified By"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }
            return (
              users?.data?.find((role) => role.Id == value)?.UserName ?? "-"
            );
          }}
        />
        <Table.Column
          dataIndex="LastModified"
          title="Last Modified"
          render={(value) => {
            if (!value) return "-";
            return <DateField format="LLL" value={value} />;
          }}
        />
        <Table.Column
          dataIndex="Created"
          title="Created At"
          render={(value) => <DateField format="LLL" value={value} />}
        />
        <Table.Column
          title="Actions"
          render={(_, record: IProduct) => (
            <Space>
              {/* We'll use the `EditButton` and `ShowButton` to manage navigation easily */}
              <ShowButton
                hideText
                size="small"
                recordItemId={record.Id}
                accessControl={{ enabled: true, hideIfUnauthorized: true }}
              />
              <EditButton
                hideText
                size="small"
                recordItemId={record.Id}
                accessControl={{ enabled: true, hideIfUnauthorized: false }}
              />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.Id}
                accessControl={{ enabled: true, hideIfUnauthorized: true }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
