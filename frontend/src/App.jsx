import React, { useContext, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
    const authUser = useSelector(state => state.auth.authUser);

    return (
        <>
            <Routes>
                <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
                <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
                <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
            </Routes>
            <Toaster />
        </>
    );
};

export default App;