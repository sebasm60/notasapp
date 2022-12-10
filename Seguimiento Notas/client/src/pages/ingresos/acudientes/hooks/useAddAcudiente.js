import { appApi } from '../../../../api';

const fields = {
    documento: "",
    nombres: "",
    apellidos: "",
    genero: "",
    estado: "",
    telefono: "",
    correo: "",
    direccion: ""
};

export const useAcudiente = () => {

    const add = async (documento, nombres, apellidos, genero, estado, telefono, correo, direccion) => {
        try {
            const response = await appApi.post('acudientes/add', {
                documento: documento, nombres, apellidos, genero, estado, rol: 'acudiente', telefono, correo, direccion
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        };
    };

    return {
        fields,

        add,
    }
};