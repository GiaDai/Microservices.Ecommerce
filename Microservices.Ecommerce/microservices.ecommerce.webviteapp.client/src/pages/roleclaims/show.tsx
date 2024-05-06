import { useShow } from "@refinedev/core";
import { RoleClaim } from "./types";
import { Show, TextField } from "@refinedev/antd";
import { Typography } from "antd";
export const ShowRoleClaim = () => {
  const {
    queryResult: { isError, isLoading, data },
  } = useShow<RoleClaim>();
  if (isError) return <div>Error</div>;
  return (
    <Show isLoading={isLoading}>
      <Typography.Title level={5}>ClaimType</Typography.Title>
      <TextField value={data?.data?.ClaimType} />

      <Typography.Title level={5}>ClaimValue</Typography.Title>
      <TextField value={data?.data?.ClaimValue} />
    </Show>
  );
};
