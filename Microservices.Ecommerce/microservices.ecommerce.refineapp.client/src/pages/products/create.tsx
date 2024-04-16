import React from "react";
import { Create, useForm } from "@refinedev/antd"
import { Form, Input } from "antd";
import MDEditor from "@uiw/react-md-editor";
import { IProduct } from "./types";

export const ProductCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<IProduct>({

    });

    return <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input the name!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Barcode"
                name="barcode"
                rules={[{ required: true, message: "Please input the barcode!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please input the description!" }]}
            >
                <MDEditor data-color-mode="light" />
            </Form.Item>
        </Form>
    </Create>
}