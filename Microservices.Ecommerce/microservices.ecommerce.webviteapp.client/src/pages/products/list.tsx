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
import { Table, Space, Input, Form, Spin, Button } from "antd";
import { Product } from "./types";
import { getDefaultFilter, useNavigation, useCan } from "@refinedev/core";
import { PaginationTotal } from "@components/index";
import debounce from "lodash/debounce";
import { SearchOutlined, StarOutlined } from "@ant-design/icons";
export const ListProduct = () => {
  const { tableProps, searchFormProps, sorters, filters, tableQueryResult } =
    useTable<Product>({
      resource: "products",
      pagination: { current: 1, pageSize: 10 },
      sorters: { initial: [{ field: "Id", order: "asc" }] },
    });

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchFormProps?.onFinish?.({
      name: e.target.value,
    });
  };
  const debouncedOnChange = debounce(onSearch, 500);
  const { create } = useNavigation();
  const { data: canCreate } = useCan({
    resource: "products",
    action: "create",
  });
  return (
    <List
      title={
        <Button
          hidden={!canCreate?.can}
          onClick={() => {
            create("products");
          }}
          type="primary"
          icon={
            <StarOutlined
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          }
        >
          Create Product
        </Button>
      }
      headerButtons={() => {
        return (
          <Space>
            <Form {...searchFormProps} layout="inline">
              <Form.Item name="name" noStyle>
                <Input
                  size="large"
                  prefix={
                    <SearchOutlined
                      className="anticon tertiary"
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  }
                  suffix={
                    <Spin size="small" spinning={tableQueryResult.isFetching} />
                  }
                  placeholder="Search by name"
                  onChange={debouncedOnChange}
                />
              </Form.Item>
            </Form>
          </Space>
        );
      }}
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
