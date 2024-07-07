import { toast } from 'react-toastify';
import { createContext } from 'react';

export const user = null;

export const SharedContext = createContext(null);

export function toaster(type, msg) {
    toast[type](msg);
}

export const setUserToken = (token) => {
    localStorage.setItem('taskApptoken', token);
};

export const getUserToken = () => {
    return localStorage.getItem('taskApptoken');
};

export const setUser = (user) => {
    localStorage.setItem('taskAppUser', JSON.stringify(user));
};

export const getUser = () => {
    let user = localStorage.getItem('taskAppUser');
    if (user && user !== 'undefined') {
        return JSON.parse(user);
    } else {
        return null;
    }
};

export const removeUserToken = () => {
    localStorage.removeItem('taskApptoken');
};

export const removeUser = () => {
    localStorage.removeItem('taskAppUser');
};

export const removeAuth = () => {
    removeUserToken();
    removeUser();
};
