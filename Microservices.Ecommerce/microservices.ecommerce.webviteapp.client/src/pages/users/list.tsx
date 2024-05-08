import {
    DeleteButton,
    EditButton,
    CloneButton,
    List,
    ShowButton,
    useTable,
  } from "@refinedev/antd";
  import { IUser } from "./types";
  import { Space, Table } from "antd";
export const ListUser = () => {
    const { tableProps } = useTable<IUser>({
        resource: "users",
        pagination: { current: 1, pageSize: 10 },
        sorters: { initial: [{ field: "Id", order: "asc" }] },
      });
    return (
        <List>
      <Table {...tableProps} rowKey="Id">
        <Table.Column<IUser> dataIndex="Id" title="ID" />
        <Table.Column<IUser> dataIndex="FirstName" title="FirstName" />
        <Table.Column<IUser> dataIndex="LastName" title="LastName" />
        <Table.Column<IUser> dataIndex="Email" title="Email" />
        <Table.Column<IUser> dataIndex="PhoneNumber" title="PhoneNumber" />
        <Table.Column
          title="Actions"
          width={150}
          render={(_, record: IUser) => (
            <Space>
              {/* We'll use the `EditButton` and `ShowButton` to manage navigation easily */}
              <ShowButton hideText size="small" recordItemId={record.Id} />
              <EditButton hideText size="small" recordItemId={record.Id} />
              <DeleteButton hideText size="small" recordItemId={record.Id} />
              <CloneButton hideText size="small" recordItemId={record.Id} />
            </Space>
          )}
        />
      </Table>
    </List>
    );
};