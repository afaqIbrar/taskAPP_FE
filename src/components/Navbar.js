import React from 'react'
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import API from '../utils/axios';
import { SharedContext, removeAuth } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { currentUser, setCurrentUser } = useContext(SharedContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setCurrentUser(null);
            removeAuth();
            navigate(`/`);
            toast.success('Logged out Successfully');
        } catch (err) {
            toast.error(err?.data?.message || err?.error);
        }
    };
    return (
        <>
            <div className='p-4 bg-black flex justify-between'>
                <div className='text-white text-center text-xl'>
                    Task Management App
                </div>
                <div>
                    <Button variant="contained" onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </>
    )
}

export default Navbar