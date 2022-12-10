import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Select, Option } from "@material-tailwind/react";

import { useGradosGrupos } from './hooks';
import { useUiStore, useForm } from "../../../hooks";
import { useGrupos, useGrados } from "../../";
import { useState } from "react";
import { useEffect } from "react";

export const AddUpdateGradoGrupo = () => {

    const [grados, setGrados] = useState([]);
    const [grupos, setGrpos] = useState([]);

    const { add, fields } = useGradosGrupos();
    const { grado, grupo, onInputChangeSelect } = useForm(fields);
    const { isModalOpen, closeModal } = useUiStore();
    const handleOpen = () => closeModal();

    const { listGrados } = useGrados();
    const { listGrupos } = useGrupos();

    useEffect(() => {
        getGrados();
        getGrupos();
    }, []);

    const getGrados = async () => {
        const { rows } = await listGrados();
        setGrados(rows);
    };

    const getGrupos = async () => {
        const { rows } = await listGrupos();
        setGrpos(rows);
    };

    const onSubmit = event => {
        event.preventDefault();
        add(grupo, grado);
        handleOpen();
    };

    return (
        <form>
            <Dialog open={isModalOpen}>
                <DialogHeader>Grados-Grupos</DialogHeader>
                <DialogBody>
                    <div className="grid gap-5 grid-cols-2 w-full">
                        <Select lockScroll label="Grado" name="grado" onChange={event => onInputChangeSelect('grado', event)}>
                            {grados && grados?.map(grado => {
                                return <Option value={grado.id_grado}>{grado.grado}</Option>
                            })}
                        </Select>

                        <Select lockScroll label="Grupo" name="grupo" onChange={event => onInputChangeSelect('grupo', event)}>
                            {grupos && grupos?.map(grupo => {
                                return <Option value={grupo.id_grupo}>{grupo.grupo}</Option>
                            })}
                        </Select>
                    </div>

                </DialogBody>

                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                        <span>Cancelar</span>
                    </Button>

                    <Button variant="gradient" color="green" type="submit" onClick={onSubmit}>
                        <span>Guardar</span>
                    </Button>
                </DialogFooter>

            </Dialog>
        </form>
    )
}
