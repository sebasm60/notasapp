import { useDispatch, useSelector } from 'react-redux';
import { onAddGrados } from '../../../../store';

import { appApi } from '../../../../api';

const fields = {
    grado: "",
};

const columns = [
    {
        title: "Id",
        dataIndex: "id_grado",
        key: "id_grado"
    },
    {
        title: "Grado",
        dataIndex: "grado",
        key: "grado"
    }
];

export const useGrados = () => {

    const dispatch = useDispatch();
    const { grados } = useSelector(state => state.grados);

    const add = async (grado) => {
        try {
            await appApi.post('grados/add', { grado });
            dispatch(onAddGrados(grado));
        } catch (error) {
            console.log(error);
        };
    };

    const listGrados = async () => {
        try {
            const { data } = await appApi.get('grados/list');
            return data;
        } catch (error) {
            console.log(error);
        };
    };

    return {
        fields,
        columns,
        grados,

        add,
        listGrados,
    }
};