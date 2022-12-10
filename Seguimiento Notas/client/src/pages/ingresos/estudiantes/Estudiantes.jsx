import { useState, useEffect } from 'react';

import { Input, Button, Select, Option } from '@material-tailwind/react';

import { useForm } from '../../../hooks';
import { useEstudiante } from './hooks';
import { useGradosGrupos } from '../../';

export const Estudiantes = () => {

    const [gradosGrupos, setGradosGrupos] = useState([])

    const { add, fields } = useEstudiante();
    const { documento, nombres, apellidos, genero, estado, id_grupo_grado, edad, onInputChange, onInputChangeSelect } = useForm(fields);

    const { list } = useGradosGrupos();

    useEffect(() => {
        getGradosGrupos();
    }, []);

    const getGradosGrupos = async () => {
        const { rows } = await list();
        console.log(rows)
        setGradosGrupos(rows);
    };

    const onSubmit = event => {
        event.preventDefault();
        add(documento, nombres, apellidos, genero, estado, id_grupo_grado, edad);
    };

    return (
        <div className="mt-5">
            <h1 className="font-bold text-2xl">ESTUDIANTE</h1>

            <form className="bg-white shadow-lg rounded-lg p-5 grid gap-5" onSubmit={onSubmit}>
                <div className='grid grid-cols-3 gap-5'>
                    <Input label='Documento' type='number' name="documento" value={documento} onChange={onInputChange} />
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    <Input label='Nombres' type='text' name="nombres" value={nombres} onChange={onInputChange} />
                    <Input label='Apellidos' type='text' name="apellidos" value={apellidos} onChange={onInputChange} />
                </div>
                <div className='grid grid-cols-4 gap-5'>

                    <Select label='Genero' name="genero" onChange={event => onInputChangeSelect('genero', event)}>
                        <Option value=''>Escoja una opción</Option>
                        <Option value='Masculino'>Masculino</Option>
                        <Option value='Femenino'>Femenino</Option>
                    </Select>

                    <Select label='Estado' name="estado" onChange={event => onInputChangeSelect('estado', event)}>
                        <Option value=''>Escoja una opción</Option>
                        <Option value='Activo'>Activo</Option>
                        <Option value='Retirado'>Retirado</Option>
                    </Select>

                    <Select label='Grado-Grupo' name="estado" onChange={event => onInputChangeSelect('id_grupo_grado', event)}>
                        {gradosGrupos && gradosGrupos?.map(gradoGrupo => {
                            return (
                                <Option value={gradoGrupo.id_grupo_grado}>{gradoGrupo.id_grupo_grado}</Option>
                            )
                        })}
                    </Select>
                    <Input label='edad' type='number' name="edad" value={edad} onChange={onInputChange} />
                </div>
                <Button type='submit'>Guardar</Button>
            </form>
        </div>
    )
}