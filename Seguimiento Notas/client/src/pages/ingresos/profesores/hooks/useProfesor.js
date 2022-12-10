import { appApi } from '../../../../api';

const fields = {
    documento: "",
    nombres: "",
    apellidos: "",
    genero: "",
    estado: "",
};

export const useProfesor = () => {

    const add = async (documento, nombres, apellidos, genero, estado) => {
        try {
            await appApi.post('profesores/add', { documento: documento, nombres, apellidos, genero, estado, rol: 'profesor' });
        } catch (error) {
            console.log(error);
        };
    };

    return {
        fields,

        add,
    }
};