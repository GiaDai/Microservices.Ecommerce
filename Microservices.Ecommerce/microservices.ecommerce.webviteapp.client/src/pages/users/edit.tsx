import {useEffect} from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { IUser } from "./types";
import { LoadingOutlined,PlusOutlined } from "@ant-design/icons";
import { Checkbox, Col, Form, Input, Row, Select, Upload, Image } from "antd";
import type { GetProp, UploadProps } from "antd";
import React from "react";
// https://ant.design/components/upload
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export const EditUser = () => {
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string>();
  const { formProps, saveButtonProps } = useForm<IUser>({
    redirect: "edit",
  });

  useEffect(() => {
    const avatarUrl = formProps.form?.getFieldValue("Avatar")?.AvatarUrl;
    setImageUrl(avatarUrl);
  }, [formProps.form?.getFieldValue("Avatar")]);

  const { selectProps } = useSelect({
    resource: "roles",
    optionLabel: "Name",
    optionValue: "Id",
  });

  const normFile = (e: any) => {
    // console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    // const fileList = [] as any[];
    // e?.fileList.forEach((file: any) => {
    //   if (file.response && file.name) {
    //     fileList.push({
    //       uid: file.uid,
    //       name: file.name,
    //       url: file.response,
    //     });
    //   }
    // });
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
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      console.log("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    console.log(info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });

      const fileList = info.fileList.map((file) => {
        if (file.response && file.name) {
          return {
            AvatarUid: file.uid,
            AvatarName: file.name,
            AvatarUrl: file.response,
          };
        }
        return file;
      });
      formProps.form?.setFieldValue("Avatar", fileList);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> : <PlusOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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
              // name="Avatar"
              label="Avatar"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra=""
            >
              <Upload
                name="file"
                action="/api/file"
                multiple={false}
                onRemove={(file) => {
                  console.log(file);
                }}
                accept=".png,.jpg"
                listType="picture-circle"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? <Image src={imageUrl} /> : uploadButton}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
