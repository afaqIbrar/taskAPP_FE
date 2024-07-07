import React, { useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material';
import { SharedContext } from '../utils/utils';
import API from '../utils/axios';

const Tasks = ({ tasks, getUserTasks }) => {
    const { currentUser } = useContext(SharedContext);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
    });

    const initialValues = {
        title: '',
        description: '',
    };
    const handleSubmit = async (values, { resetForm }) => {
        try {
            await API.post('tasks/', values, {
                withCredentials: true
            });
            getUserTasks();
            toast.success('Task Added Successfully!!!');
            resetForm();
        } catch (e) {
            toast.error(e?.response?.data?.message);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await API.delete('tasks/' + taskId, { withCredentials: true });
            getUserTasks();
            toast.success('Task Deleted Successfully!!!');
        } catch (e) {
            toast.error(e?.response?.data?.message);
        }
    };

    const completeTask = async (taskId) => {
        try {
            await API.put('tasks/' + taskId, { status: 'complete' }, { withCredentials: true });
            getUserTasks();
            toast.success('Task Marked as Complete!!!');
        } catch (e) {
            toast.error(e?.response?.data?.message);
        }
    };
    const columns = [
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'description', headerName: 'Description', width: 260 },
        {
            field: 'status',
            headerName: 'Status',
            headerAlign: 'center',
            width: 150,
            renderCell: (params) => {
                const status = params.value?.toLowerCase();

                if (status === 'pending') {
                    return (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <CancelOutlined style={{ color: 'red', fontSize: 24 }} />
                        </div>
                    );
                } else if (status === 'complete') {
                    return (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <CheckCircleOutline style={{ color: 'green', fontSize: 24 }} />
                        </div>
                    );
                }
                return null;
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: 'center',
            width: 170,
            renderCell: (params) => (
                <div>
                    <Button variant="contained" color="success" sx={{ width: '10px', fontSize: '8px' }} onClick={() => completeTask(params?.row?.id)}>Complete</Button>
                    <Button variant="contained" color="error" size="small" style={{ marginLeft: '4px' }} sx={{ width: '10px', fontSize: '8px' }} onClick={() => deleteTask(params?.row?.id)}>Delete</Button>
                </div>
            ),
        },
    ];

    const currentTime = new Date().getHours();
    let greetingMessage = '';
    if (currentTime >= 5 && currentTime < 12) {
        greetingMessage = 'Good Morning';
    } else if (currentTime >= 12 && currentTime < 18) {
        greetingMessage = 'Good Afternoon';
    } else {
        greetingMessage = 'Good Evening';
    }

    return (
        <div className="flex justify-center items-center min-h-screen mt-0 bg-gray-100">
            <div className='w-4/5  p-4'>
                <h1 className='text-center text-3xl mb-4'>{`${greetingMessage}, ${currentUser.userName} - Your Tasks List`}</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <Field
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter title"
                                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <Field
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    rows={3}
                                    placeholder="Enter description"
                                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                Add Task
                            </Button>
                        </Form>
                    )}
                </Formik>
                <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                    <DataGrid
                        rows={tasks}
                        columns={columns}
                        getRowId={(row) => row.id}
                        componentsProps={{
                            toolbar: { style: { backgroundColor: 'white' } },
                            header: { style: { backgroundColor: 'lightgray' } },
                            pagination: { style: { backgroundColor: 'white' } },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Tasks;
