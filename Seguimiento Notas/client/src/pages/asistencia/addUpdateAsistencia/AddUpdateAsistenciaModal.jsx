import { useEffect, useState } from "react";

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Select, Option, Input } from "@material-tailwind/react";
import { useUiStore, useForm } from "../../../hooks";
import { useAsignaturas, useEstudiante, useAsistencia } from "../../";

useAsignaturas

export const AddUpdateAsistenciaModal = () => {

    const { add, fields } = useAsistencia();

    const [asignaturas, setAsignaturas] = useState([]);
    const [estudantes, setEstudiantes] = useState([]);

    const { isModalOpen, closeModal } = useUiStore();
    const { documento_estudiante, id_asignatura, asiste, fecha, onInputChange, onInputChangeSelect } = useForm(fields);
    const { list } = useAsignaturas();
    const { listEstudiantes } = useEstudiante()
    const handleOpen = () => closeModal();

    useEffect(() => {
        getAsignaturas();
        getEstudiantes();
    }, []);

    const getAsignaturas = async () => {
        const { rows } = await list();
        setAsignaturas(rows);
    };

    const getEstudiantes = async () => {
        const { rows } = await listEstudiantes();
        setEstudiantes(rows);
    };

    const onSubmit = event => {
        event.preventDefault();
        add(documento_estudiante, id_asignatura, asiste, fecha);
        handleOpen();
    };
    return (
        <form>
            <Dialog open={isModalOpen}>
                <DialogHeader>Asistencia</DialogHeader>
                <DialogBody>
                    <div className="grid grid-cols-1 gap-5 w-full">
                        <Select label="Asignatura" name="id_asignatura" onChange={e => onInputChangeSelect('id_asignatura', e)} >
                            {asignaturas && asignaturas?.map(asignatura => {
                                return (
                                    <Option value={asignatura.id}>{asignatura.nombre}</Option>
                                )
                            })}
                        </Select>

                        <Select label="Estudiante" name="documento_estudiante" onChange={e => onInputChangeSelect('documento_estudiante', e)} >
                            {estudantes && estudantes?.map(estudante => {
                                return (
                                    <Option value={estudante.documento}>{estudante.nombres}</Option>
                                )
                            })}
                        </Select>

                        <div className="grid grid-cols-2 gap-5">
                            <Select label="Asiste" name="asiste" onChange={e => onInputChangeSelect('asiste', e)}>
                                <Option value={true}>Si</Option>
                                <Option value={false}>No</Option>
                            </Select>

                            <Input type={'Date'} name="fecha" value={fecha} onChange={onInputChange} />
                        </div>

                    </div>
                </DialogBody>

                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                        <span>Cancelar</span>
                    </Button>

                    <Button variant="gradient" color="green" onClick={onSubmit}>
                        <span>Guardar</span>
                    </Button>
                </DialogFooter>

            </Dialog>
        </form>
    )
}
