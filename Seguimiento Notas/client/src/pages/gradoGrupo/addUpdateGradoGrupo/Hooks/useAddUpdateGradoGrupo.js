import { useDispatch, useSelector } from 'react-redux';
import { onAddGrados, onAddGradosGrupos } from '../../../../store';

import { appApi } from '../../../../api';

const fields = {
    grado: "",
    grupo: "",
};

const columns = [
    {
        title: "Id",
        dataIndex: "id_grupo_grado",
        key: "id_grupo_grado"
    },
    {
        title: "Grado",
        dataIndex: "id_grado",
        key: "id_grado"
    },
    {
        title: "Grupo",
        dataIndex: "id_grupo",
        key: "id_grupo"
    }
];

export const useGradosGrupos = () => {

    const dispatch = useDispatch();
    const { gradosGrupos } = useSelector(state => state.gradosGrupos);

    const add = async (grupo, grado) => {
        try {
            await appApi.post('grupoGrado/add', { id_grupo: grupo, id_grado: grado });
            dispatch(onAddGradosGrupos('xd'));
        } catch (error) {
            console.log(error);
        };
    };

    const list = async () => {
        try {
            const { data } = await appApi.get('grupoGrado/list');
            return data;
        } catch (error) {
            console.log(error);
        };
    };

    return {
        fields,
        columns,
        gradosGrupos,

        add,
        list,
    }
};