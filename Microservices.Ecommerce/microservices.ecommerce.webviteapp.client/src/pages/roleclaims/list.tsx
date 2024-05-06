import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  ShowButton,
  useSelect,
  useTable,
} from "@refinedev/antd";
import { RoleClaim } from "./types";
import { Select, Space, Table } from "antd";
import { getDefaultFilter, useMany } from "@refinedev/core";
import { Role } from "@pages/roles/types";
export const ListRoleClaim = () => {
  const { tableProps, filters } = useTable<RoleClaim>({
    resource: "roleclaims",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "Id", order: "asc" }] },
  });

  const { data: roles, isLoading } = useMany<Role>({
    resource: "roles",
    ids: tableProps?.dataSource?.map((roleclaim) => roleclaim.RoleId) ?? [],
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
        <Table.Column dataIndex="Id" title="ID" />
        <Table.Column
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
        <Table.Column dataIndex="ClaimType" title="ClaimType" />
        <Table.Column dataIndex="ClaimValue" title="ClaimValue" />
        <Table.Column
          title="Actions"
          render={(_, record: RoleClaim) => (
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
