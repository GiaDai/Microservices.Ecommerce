import { FC } from 'react'
import LandingIntro from './LandingIntro'
import InputField from '../../components/input/InputField'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    password: Yup.string().required('Password is required!'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
    email: Yup.string().email('Invalid email').required('Email Id is required!'),
});

const Register: FC = () => {

    interface RegisterObj {
        name: string;
        password: string;
        confirmPassword: string;
        email: string;
    }

    const INITIAL_REGISTER_OBJ: RegisterObj = {
        name: "",
        password: "",
        confirmPassword: "",
        email: ""
    }

    const submitForm = (_values: RegisterObj, { setSubmitting }: { setSubmitting: any }) => {
        setSubmitting(true);
        // Call API to check user credentials and save token in localstorage
        localStorage.setItem("token", "DumyTokenHere")
        setSubmitting(false)
        window.location.href = '/app/welcome'
    }

    return (
        // ... rest of the component
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                        <Formik
                            initialValues={INITIAL_REGISTER_OBJ}
                            validationSchema={validationSchema}
                            onSubmit={submitForm}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <InputField name="name" type="text" placeholder="Please enter your name" labelTitle="" labelStyle="text-primary" containerStyle="mt-4" />
                                    <InputField name="email" type="email" placeholder="Please enter your email" labelTitle="" labelStyle="text-primary" containerStyle="mt-4" />
                                    <InputField name="password" type="password" placeholder="Please enter your email" labelTitle="" labelStyle="text-primary" containerStyle="mt-4" />
                                    <InputField name="confirmPassword" type="password" placeholder="Please confirm your password" labelTitle="" labelStyle="text-primary" containerStyle="mt-4" />

                                    <button type="submit" className={"btn mt-2 w-full btn-primary" + (isSubmitting ? " loading" : "")}>Register</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register