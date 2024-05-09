import { Create, useForm, useSelect } from "@refinedev/antd";
import { ICreateUser } from "./types";
import { Form, Input, Row, Col, Select, Upload, Button, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
export const CreateUser = () => {
  const { formProps, saveButtonProps } = useForm<ICreateUser>({
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
    <Create
      resource="roles"
      title="Create User"
      saveButtonProps={saveButtonProps}
    >
      <Form {...formItemLayout} {...formProps} layout="horizontal">
        <Row gutter={20}>
          <Col span={12}>
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
              <Input />
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
              <Input />
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
              label="Password"
              name="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="ConfirmPassword"
              name="ConfirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("Password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
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
    </Create>
  );
};
