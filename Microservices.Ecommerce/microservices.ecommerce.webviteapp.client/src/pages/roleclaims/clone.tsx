import { AutoSaveIndicator } from "@refinedev/core";
import { useForm, useSelect, Create } from "@refinedev/antd";
import { RoleClaim } from "./types";
import { Form, Input, Select } from "antd";

export const CloneRoleClaim = () => {
  const { formProps, saveButtonProps, autoSaveProps } = useForm<RoleClaim>({
    redirect: "list",
  });

  const { selectProps } = useSelect({
    resource: "roles",
    optionLabel: "Name",
    optionValue: "Id",
  });
  return (
    <Create
      resource="roleclaims"
      title="Clone Role Claim"
      saveButtonProps={saveButtonProps}
    >
      <AutoSaveIndicator {...autoSaveProps} />
      <Form {...formProps} layout="vertical">
        <Form.Item label="RoleId" name="RoleId">
          <Select {...selectProps} />
        </Form.Item>
        <Form.Item
          label="ClaimType"
          name="ClaimType"
          rules={[{ required: true, message: "Please input your ClaimType!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ClaimValue"
          name="ClaimValue"
          rules={[{ required: true, message: "Please input your ClaimValue!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
