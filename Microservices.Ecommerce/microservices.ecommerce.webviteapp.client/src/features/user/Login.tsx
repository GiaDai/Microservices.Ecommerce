import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import InputField from '@components/input/InputField'
import { useAuth } from '@core/index';
import { useAuthenticate } from '@api/accounts';
import SuspenseContent from '@containers/SuspenseContent';
import type { AuthenRequest, AuthenResponse, AuthenResponseError } from '@api/accounts';
import type { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { showToast } from '@features/common/toastSlice'

interface ILogin {
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
    const dispatch = useDispatch();
    const { mutate: authenticate, isPending } = useAuthenticate();
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const signIn = useAuth.use.signIn();
    const token = useAuth.use.token();
    if (token) {
        navigate('/app/welcome');
    }
    const INITIAL_LOGIN_OBJ: ILogin = {
        password: "",
        email: ""
    }

    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    };

    const submitForm = (_values: ILogin, { }: { setSubmitting: any }) => {
        authenticate(
            { email: _values.email, password: _values.password } as AuthenRequest,
            {
                onSuccess: (data: AuthenResponse) => {
                    const { userName, email } = data.data;
                    signIn({ access: data.data.jwToken, refresh: data.data.jwToken }, userName, email);
                    if (rememberMe) {
                        Cookies.set('jwtToken', data.data.jwToken, { expires: 7 }); // The token will be stored for 7 days.
                    }
                    dispatch(showToast({ message: 'Login successful', type: 'success' }));
                    // Redirect to /app/welcome use history.push('/app/welcome')   
                    navigate('/app/welcome');
                },
                onError: (error: AxiosError) => {
                    const errorMessage = (error.response?.data as AuthenResponseError)?.Message || error.message;
                    console.error(errorMessage);
                    dispatch(showToast({ message: errorMessage, type: 'error' }));
                }
            }
        );
    }

    return (
        <>
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
                            {() => (
                                <Form>
                                    <div className="mb-4">
                                        <InputField name="email" type="email" placeholder="Please enter your email" labelTitle="" labelStyle="text-primary" containerStyle="mt-4" />
                                        <InputField name="password" type="password" placeholder="Please enter your password" labelTitle="" labelStyle="text-primary" containerStyle="mt-4" />
                                        <div className="mb-4 mt-4">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} className="form-checkbox h-5 w-5 text-blue-600" />
                                                <span className="text-gray-700 dark:text-gray-400">Remember me?</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                                    </div>

                                    <button type="submit" className="btn mt-2 w-full btn-primary">Login</button>

                                    <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
        { isPending && <SuspenseContent loadingText='Logging' />}
        </>
    )
}

export default Login