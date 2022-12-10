import { useDispatch, useSelector } from 'react-redux';
import { onAddGrupos } from '../../../../store';

import { appApi } from '../../../../api';

const fields = {
    grupo: "",
};

const columns = [
    {
        title: "Id",
        dataIndex: "id_grupo",
        key: "id_grupo"
    },
    {
        title: "Grupo",
        dataIndex: "grupo",
        key: "grupo"
    }
];

export const useGrupos = () => {

    const dispatch = useDispatch();
    const { grupos } = useSelector(state => state.grupos);

    const add = async (grupo) => {
        try {
            await appApi.post('grupos/add', { grupo });
            dispatch(onAddGrupos(grupo));
        } catch (error) {
            console.log(error);
        };
    };

    const listGrupos = async () => {
        try {
            const { data } = await appApi.get('grupos/list');
            return data;
        } catch (error) {
            console.log(error);
        };
    };

    return {
        fields,
        columns,
        grupos,

        add,
        listGrupos,
    }
};