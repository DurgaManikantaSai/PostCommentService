
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useStore from '../store/store';

const ProtectedRoute = ({ element, ...rest }) => {
    const user = useStore(state => state.user);

    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/login" replace />}
        />
    );
};

export default ProtectedRoute;
