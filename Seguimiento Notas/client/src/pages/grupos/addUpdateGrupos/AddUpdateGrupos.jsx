import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";

import { useGrupos } from './hooks';
import { useUiStore, useForm } from "../../../hooks";

export const AddUpdateGrupos = () => {

    const { add, fields } = useGrupos();
    const { grupo, onInputChange } = useForm(fields);
    const { isModalOpen, closeModal } = useUiStore();
    const handleOpen = () => closeModal();

    const onSubmit = event => {
        event.preventDefault();
        add(grupo);
        handleOpen();
    };

    return (
        <form>
            <Dialog open={isModalOpen}>
                <DialogHeader>Grupos</DialogHeader>
                <DialogBody>
                    <div className="grid grid-cols-1 gap-5 w-full">
                        <Input label="Grupo" name="grupo" value={grupo} onChange={onInputChange} />
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
