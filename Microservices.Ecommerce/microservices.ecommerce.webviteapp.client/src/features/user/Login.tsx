import { FC } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import InputText from '../../components/input/InputText'
import ErrorText from '../../components/typography/ErrorText'
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik'
import * as Yup from 'yup'

interface LoginObj {
    password: string;
    email: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email Id is required!'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required!'),
});

const Login: FC = () => {
    const INITIAL_LOGIN_OBJ: LoginObj = {
        password: "",
        email: ""
    }

    const submitForm = (_values: LoginObj, { setSubmitting }: { setSubmitting: any }) => {
        setSubmitting(true);
        // Call API to check user credentials and save token in localstorage
        localStorage.setItem("token", "DumyTokenHere")
        setSubmitting(false)
        window.location.href = '/app/welcome'
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <Formik
                            initialValues={INITIAL_LOGIN_OBJ}
                            validationSchema={validationSchema}
                            onSubmit={submitForm}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-4">
                                        <Field
                                            // as={InputText}
                                            type="email"
                                            name="email"
                                            placeholder="Please enter your email"
                                        />
                                        <ErrorMessage name="email" render={msg => <ErrorText styleClass='text-sm'>{msg}</ErrorText>} />

                                        <Field
                                            name="password"
                                        >
                                            {({ field }: FieldProps) => (
                                                <InputText
                                                    type="password"
                                                    placeholder="Please enter your password"
                                                    defaultValue={field.value}
                                                    updateFormValue={field.onChange} labelTitle={''} labelStyle={''} containerStyle={''} updateType={undefined} />
                                            )}
                                        </Field>
                                        <ErrorMessage name="password" />
                                    </div>

                                    <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                                    </div>

                                    <button type="submit" className={"btn mt-2 w-full btn-primary" + (isSubmitting ? " loading" : "")}>Login</button>

                                    <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login