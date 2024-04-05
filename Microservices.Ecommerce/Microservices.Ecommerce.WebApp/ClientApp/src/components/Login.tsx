// create login component with username and password fields
// using reactstrap form and input components
// use formik and yup for form validation and error messages for username and password

import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as AuthStore from '../store/Auth';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthLoginResponse } from '../types/AuthType';

type LoginProps =
    AuthLoginResponse & // replace 'AuthState' with the name of your auth state type
    typeof AuthStore.authActionCreators &
    RouteComponentProps<{}>;

const Login: React.FC<LoginProps> = (props) => {
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
    });

    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-4">
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(`Username: ${values.username}, Password: ${values.password}`);
                        props.login({
                            email: values.username,
                            password: values.password
                        });

                        setSubmitting(false);
                    }}
                >
                    {({ handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit} className="login-form">
                            <h2 className="text-center">Login</h2>
                            <FormGroup>
                                <Label>Username</Label>
                                <Field type="text" name="username" as={Input} />
                                <ErrorMessage name="username" render={msg => <div style={{ color: 'red', fontSize: '12px' }}>{msg}</div>} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Field type="password" name="password" as={Input} />
                                <ErrorMessage name="password" render={msg => <div style={{ color: 'red', fontSize: '12px' }}>{msg}</div>} />
                            </FormGroup>
                            <div className="d-flex justify-content-between">
                                <Button className="btn-lg btn-secondary">Register</Button>
                                <Button type="submit" className="btn-lg btn-primary" disabled={isSubmitting}>Log in</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default connect(
    (state: ApplicationState) => state.authentication, // replace 'auth' with the name of your auth reducer
    AuthStore.authActionCreators // replace 'authActionCreators' with the name of your auth action creators
)(Login);