import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option } from "@material-tailwind/react";

import { useAsignaturas } from './hooks';
import { useUiStore, useForm } from "../../../hooks";

export const AddUpdateAsignaturas = () => {

    const { add, fields } = useAsignaturas();
    const { nombre, estado, onInputChange, onInputChangeSelect } = useForm(fields);
    const { isModalOpen, closeModal } = useUiStore();
    const handleOpen = () => closeModal();

    const onSubmit = event => {
        event.preventDefault();
        add(nombre, estado);
        handleOpen();
    };

    return (
        <form>
            <Dialog open={isModalOpen}>
                <DialogHeader>Asignaturas</DialogHeader>
                <DialogBody>
                    <div className="grid grid-cols-2 gap-5 w-full">
                        <Input label="Nombre" name="nombre" value={nombre} onChange={onInputChange} />
                        <Select label="Estado" name="estado" onChange={e => onInputChangeSelect('estado', e)} lockScroll>
                            <Option value="">Escoja una opcion</Option>
                            <Option value={true}>Activa</Option>
                            <Option value={false}>Inactiva</Option>
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
