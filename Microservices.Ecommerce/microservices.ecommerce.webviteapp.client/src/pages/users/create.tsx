import { Create, useForm } from "@refinedev/antd";
import { ICreateUser } from "./types";
import { Form, Input, Row, Col } from "antd";
export const CreateUser = () => {
    const { formProps, saveButtonProps } = useForm<ICreateUser>({
        redirect: "edit",
    });
    return (
        <Create resource="roles" title="Create Role" saveButtonProps={saveButtonProps} >
            <Form {...formProps} layout="vertical">
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item label="FirstName" name="FirstName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="LastName" name="LastName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="UserName" name="UserName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="Email">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="PhoneNumber" name="PhoneNumber">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="Password">
                            <Input />
                        </Form.Item>
                        <Form.Item label="ConfirmPassword" name="ConfirmPassword">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Create>
    );
};