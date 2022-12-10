import { useDispatch, useSelector } from 'react-redux';
import { onAddAsignaturas } from '../../../../store';

import { appApi } from '../../../../api';

const fields = {
    documento_estudiante: "",
    id_asignatura: "",
    asiste: "",
    fecha: "",
};

const columns = [
    {
        title: "Estudiante",
        dataIndex: "documento_estudiante",
        key: "documento_estudiante"
    },
    {
        title: "Asignatura",
        dataIndex: "id_asignatura",
        key: "id_asignatura"
    },
    {
        title: "Asiste",
        dataIndex: "asiste",
        key: "asiste"
    },
    {
        title: "Fecha",
        dataIndex: "fecha",
        key: "fecha"
    }
];

export const useAsistencia = () => {

    const dispatch = useDispatch();
    const { asignaturas } = useSelector(state => state.asignaturas);

    const add = async (documento_estudiante, id_asignatura, asiste, fecha) => {
        try {
            await appApi.post('estudianteAsistencia/add', { documento_estudiante, id_asignatura, asiste, fecha });
            dispatch(onAddAsignaturas(documento_estudiante, id_asignatura, asiste, fecha));
        } catch (error) {
            console.log(error);
        };
    };

    const list = async () => {
        try {
            const { data } = await appApi.get('estudianteAsistencia/list');
            console.log(data)
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