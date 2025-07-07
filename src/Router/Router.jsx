import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Home from '../Components/Home/Home';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            }
        ]
    },
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/register',
        Component: Register,
    }
]);

export default router;