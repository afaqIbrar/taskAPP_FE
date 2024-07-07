import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SharedContext, setUser, setUserToken } from '../utils/utils';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/axios';


const SignUp = () => {
    const navigate = useNavigate();
    const { setAuthToken, setCurrentUser, currentUser } =
        useContext(SharedContext);

    const setToken = (token) => {
        setUserToken(token);
        return setAuthToken(token);
    };

    useEffect(() => {
        if (currentUser) {
            navigate(`/dashboard`);
        }
    }, [currentUser, navigate]);

    const validationSchema = Yup.object({
        userName: Yup.string().required('Required'),
        password: Yup.string().min(5, 'Password must be at least 5 characters').required('Required'),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await API.post('users/', values, {
                withCredentials: true
            });
            const { userName, id, token } = response.data;
            setUser({ userName, id });
            setCurrentUser({ userName, id });
            setToken(token);
            navigate(`/dashboard`);
            toast.success('Sign Up Successfully');
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Task Manager App</h1>
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign Up
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Formik
                        initialValues={{ userName: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                <div>
                                    <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
                                        User Name
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            id="userName"
                                            name="userName"
                                            type="text"
                                            autoComplete="userName"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage name="userName" component="div" className="text-red-600 text-sm mt-1" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <Field
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <p className="mt-5 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignUp;
