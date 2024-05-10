import {
  DeleteButton,
  EditButton,
  CloneButton,
  List,
  ShowButton,
  useTable,
  useSelect,
  FilterDropdown,
} from "@refinedev/antd";
import { IUser, IUserShort } from "./types";
import { Select, Space, Table, Typography } from "antd";
import { Role } from "@pages/roles/types";
import { getDefaultFilter, useMany } from "@refinedev/core";
import { CustomAvatar } from "@components/custom-avatar";
export const ListUser = () => {
  const { tableProps, filters } = useTable<IUserShort>({
    resource: "users",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "Id", order: "asc" }] },
  });
  const { data: roles, isLoading } = useMany<Role>({
    resource: "roles",
    ids: tableProps?.dataSource?.map((user) => user.RoleId) ?? [],
  });
  const { selectProps } = useSelect({
    resource: "roles",
    optionLabel: "Name",
    optionValue: "Id",
    defaultValue: getDefaultFilter("RoleId", filters, "eq"),
  });

  return (
    <List>
      <Table {...tableProps} rowKey="Id">
        <Table.Column<IUser>
          title="#"
          key="rowNumber"
          render={(_text, _record, index) => index + 1}
        />
        <Table.Column<IUser>
          dataIndex="Name"
          title="Name"
          render={(_, record: IUserShort) => {
            return (
              <Space>
                <CustomAvatar
                  src={record.AvatarUrl}
                  name={`${record.FirstName} ${record.LastName}`}
                />
                <Typography.Text>{`${record.FirstName} ${record.LastName}`}</Typography.Text>
              </Space>
            );
          }}
        />
        <Table.Column<IUser>
          dataIndex="RoleId"
          title="Role"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }
            return (
              roles?.data?.find((role) => role.Id == value)?.Name ?? "Not Found"
            );
          }}
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              mapValue={(selectedKey) => String(selectedKey)}
            >
              <Select style={{ minWidth: 200 }} {...selectProps} />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("RoleId", filters, "eq")}
        />
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
