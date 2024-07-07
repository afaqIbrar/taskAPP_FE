import React, { useState } from 'react'
import StickyNavbar from '../components/Navbar'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/axios';
import Tasks from '../components/Tasks';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const getUserTasks = async () => {
        const response = await API.get('tasks/', {
            withCredentials: true
        });
        setTasks(response.data);
    }

    useEffect(() => {
        getUserTasks();
    }, [])
    return (
        <div>
            <StickyNavbar />
            <Tasks tasks={tasks} getUserTasks={getUserTasks} />
        </div>
    )
}

export default Dashboard