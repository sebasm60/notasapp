import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AdminLayout, Loading } from '../components';
import { LoginPage, NotasHome, Asistencia, Ingresos, Grados, Grupos, GradoGrupo, Asignaturas } from '../pages';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

    const { checkAuthToken, status } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (
            <Loading />
        );
    };

    return (
        <Routes>
            {
                status === 'not-authenticated'
                    ? (
                        <>
                            <Route path='/auth/*' element={<LoginPage />} />
                            <Route path='/*' element={<Navigate to={'auth/login'} />} />
                        </>
                    )
                    : (
                        <>
                            <Route path='/' element={<AdminLayout />}>
                                <Route path='/notas' element={<NotasHome />} />
                                <Route path='/asistencia' element={<Asistencia />} />
                                <Route path='/ingresos' element={<Ingresos />} />
                                <Route path='/grados' element={<Grados />} />
                                <Route path='/grupos' element={<Grupos />} />
                                <Route path='/grados_grupos' element={<GradoGrupo />} />
                                <Route path='/asignaturas' element={<Asignaturas />} />
                            </Route>
                            <Route path='/*' element={<Navigate to='/' />} />
                        </>
                    )
            }

        </Routes>
    )
}