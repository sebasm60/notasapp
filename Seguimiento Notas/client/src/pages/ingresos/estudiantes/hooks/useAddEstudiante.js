import { appApi } from '../../../../api';

const fields = {
    documento: "",
    nombres: "",
    apellidos: "",
    genero: "",
    estado: "",
    id_grupo_grado: "",
    edad: ""
};

export const useEstudiante = () => {

    const add = async (documento, nombres, apellidos, genero, estado, id_grupo_grado, edad) => {
        try {
            const response = await appApi.post('estudiantes/add', {
                documento: documento, nombres, apellidos, genero, estado, rol: 'estudiante', id_grupo_grado, edad
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        };
    };

    const listEstudiantes = async () => {
        try {
            const { data } = await appApi.get('estudiantes/list');
            return data;
        } catch (error) {
            console.log(error);
        };
    };


    return {
        fields,

        add,
        listEstudiantes
    }
};