import { useForm, Edit, useSelect } from "@refinedev/antd";
import { RoleClaim } from "./types";
import { Form, Input, Select } from "antd";
export const EditRoleClaim = () => {
  const { formProps, saveButtonProps } = useForm<RoleClaim>({
    redirect: "show",
  });

  const { selectProps } = useSelect({
    resource: "roles",
    optionLabel: "Name",
    optionValue: "Id",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="ID" name="Id" hidden>
          <Input />
        </Form.Item>
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
    </Edit>
  );
};
