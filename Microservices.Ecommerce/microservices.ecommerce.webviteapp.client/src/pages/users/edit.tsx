import { Edit, useForm, useSelect } from "@refinedev/antd";
import { IUser } from "./types";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, Select, Upload } from "antd";
export const EditUser = () => {
  const { formProps, saveButtonProps } = useForm<IUser>({
    redirect: "edit",
  });

  const { selectProps } = useSelect({
    resource: "roles",
    optionLabel: "Name",
    optionValue: "Id",
  });

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 0,
      },
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    </Form.Item>
  );

  const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

  return (
    <Edit
      isLoading={false}
      resource="users"
      title="Edit user"
      saveButtonProps={saveButtonProps}
    >
      <Form {...formItemLayout} {...formProps} layout="horizontal">
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Id" name="Id" hidden>
              <Input />
            </Form.Item>
            <Form.Item label="Role" name="RoleId">
              <Select {...selectProps} />
            </Form.Item>
            <Form.Item
              label="FirstName"
              name="FirstName"
              rules={[
                {
                  required: true,
                  message: "Please input your FirstName!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="LastName"
              name="LastName"
              rules={[
                {
                  required: true,
                  message: "Please input your FirstName!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="UserName"
              name="UserName"
              rules={[
                {
                  required: true,
                  message: "Please input your FirstName!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="PhoneNumber"
              name="PhoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="EmailConfirmed"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>Email confirmed</Checkbox>
            </Form.Item>
            <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra=""
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button
                  icon={
                    <UploadOutlined
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  }
                >
                  Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
