import { Select, Option } from '@material-tailwind/react';
import { useState } from 'react';
import { Acudientes, Estudiantes, Profesores } from './';

export const Ingresos = () => {

    const [rol, setRol] = useState('');

    const renderOption = () => {
        switch (rol) {
            case 'acudiente':
                return <Acudientes />;
            case 'estudiante':
                return <Estudiantes />;
            case 'profesor':
                return <Profesores />
            default: return (
                <div className='grid justify-center items-center'>
                    <h1 className='text-4xl p-5'>Seleccione un rol</h1>
                </div>
            )
        };
    };

    return (
        <div className='grid gap-3'>
            <div>
                <h1
                    className='inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded text-4xl shadow-xl'>
                    Registrar nuevo ingreso
                </h1>
            </div>
            <br />
            <div>
                <Select label='Rol' onChange={e => setRol(e)}>
                    <Option value=''>Seleccione una opción</Option>
                    <Option value='acudiente'>Acudiente</Option>
                    <Option value='estudiante'>Estudiante</Option>
                    <Option value='profesor'>Profesor</Option>
                </Select>
            </div>

            {renderOption()}
        </div>
    )
}
