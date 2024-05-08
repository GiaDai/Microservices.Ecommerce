import { Edit, useForm } from "@refinedev/antd";
import { IUser } from "./types";
import { Form, Input } from "antd";
export const EditUser = () => {
    const { formProps, saveButtonProps } = useForm<IUser>({
        redirect: "edit",
    });
    return (
        <Edit resource="users" title="Edit user" saveButtonProps={saveButtonProps} >
            <Form {...formProps} layout="vertical">
                <Form.Item label="ID" name="Id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item label="FirstName" name="FirstName">
                    <Input />
                </Form.Item>
                <Form.Item label="LastName" name="LastName">
                    <Input />
                </Form.Item>
                <Form.Item label="PhoneNumber" name="PhoneNumber">
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};