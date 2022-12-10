import { useDispatch, useSelector } from 'react-redux';
import { onAddAsignaturas } from '../../../../store';

import { appApi } from '../../../../api';

const fields = {
    nombre: "",
    estado: "",
};

const columns = [
    {
        title: "Id",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Nombre",
        dataIndex: "nombre",
        key: "nombre"
    },
    {
        title: "Estado",
        dataIndex: "estado",
        key: "estado"
    }
];

export const useAsignaturas = () => {

    const dispatch = useDispatch();
    const { asignaturas } = useSelector(state => state.asignaturas);

    const add = async (nombre, estado) => {
        try {
            await appApi.post('asignaturas/add', { nombre, estado });
            dispatch(onAddAsignaturas(nombre, estado));
        } catch (error) {
            console.log(error);
        };
    };

    const list = async () => {
        try {
            const { data } = await appApi.get('asignaturas/list');
            return data;
        } catch (error) {
            console.log(error);
        };
    };

    return {
        fields,
        columns,
        asignaturas,

        add,
        list,
    }
};