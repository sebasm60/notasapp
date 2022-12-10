import { useDispatch, useSelector } from 'react-redux';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

import { appApi } from '../api';
import jwt from 'jwt-decode';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ user, pass }) => {
        dispatch(onChecking());
        try {
            const { data } = await appApi.post('auth/login', { user, pass });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ user: jwt(data.token).user, documento: jwt(data.token).documento, rol: jwt(data.token).rol }));
        } catch (error) {
            const _errorMessage = error.response?.data.message ? error.response.data.message : error.response?.data.errors.pass.msg;
            dispatch(onLogout(_errorMessage));
            setTimeout(() => {
                dispatch(clearErrorMessage);
            }, 10);
        };
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await appApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ user: jwt(data.token).user, documento: jwt(data.token).documento, rol: jwt(data.token).rol }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        };
    };

    const startLogout = async () => {
        localStorage.clear();
        dispatch(onLogout());
    };

    return {
        status, user, errorMessage,

        checkAuthToken,
        startLogin,
        startLogout,
    };
};