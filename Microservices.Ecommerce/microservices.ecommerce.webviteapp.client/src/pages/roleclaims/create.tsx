import { Create, useForm, useSelect } from "@refinedev/antd";
import { RoleClaim } from "./types";
import { Form, Input, Select } from "antd";
export const CreateRoleClaim = () => {
  const { formProps, saveButtonProps } = useForm<RoleClaim>({
    redirect: "edit",
  });

  const { selectProps } = useSelect({
    resource: "roles",
    optionLabel: "Name",
    optionValue: "Id",
  });

  return (
    <Create
      resource="roles"
      title="Create Role"
      saveButtonProps={saveButtonProps}
    >
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
