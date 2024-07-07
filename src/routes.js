import { Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

const routes = (user) => [
    {
        path: '/',
        element: user ? <Navigate to="/dashboard" /> : <SignIn />,
    },
    {
        path: '/register',
        element: user ? <Navigate to="/dashboard" /> : <SignUp />,
    },
    {
        path: '/dashboard',
        element: user ? <Dashboard /> : <Navigate to="/" />,
    }
];

export default routes;
