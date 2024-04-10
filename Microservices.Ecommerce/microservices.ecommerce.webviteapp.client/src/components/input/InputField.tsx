import React from 'react';
import { Field, FieldProps, ErrorMessage } from 'formik';
import InputText from './InputText';
import ErrorText from '../typography/ErrorText';

interface InputFieldProps {
    name: string;
    type: string;
    placeholder: string;
    labelTitle: string;
    labelStyle: string;
    containerStyle: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, labelTitle, labelStyle, containerStyle }) => {
    return (
        <>
            <Field name={name}>
                {({ field }: FieldProps) => (
                    <InputText
                        type={type}
                        placeholder={placeholder}
                        labelTitle={labelTitle}
                        labelStyle={labelStyle}
                        containerStyle={containerStyle}
                        defaultValue={field.value}
                        updateFormValue={(obj: { updateType: any; value: string }) => {
                            field.onChange({
                                target: {
                                    name: name,
                                    value: obj.value,
                                },
                            })
                        }}
                        updateType={undefined}
                    />
                )}
            </Field>
            <ErrorMessage name={name} render={msg => <ErrorText styleClass='text-sm'>{msg}</ErrorText>} />
        </>
    );
};

export default InputField;