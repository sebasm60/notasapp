import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";

import { useGrados } from './hooks';
import { useUiStore, useForm } from "../../../hooks";

export const AddUpdateGrados = () => {

    const { add, fields } = useGrados();
    const { grado, onInputChange } = useForm(fields);
    const { isModalOpen, closeModal } = useUiStore();
    const handleOpen = () => closeModal();

    const onSubmit = event => {
        event.preventDefault();
        add(grado);
        handleOpen();
    };

    return (
        <form>
            <Dialog open={isModalOpen}>
                <DialogHeader>Grados</DialogHeader>
                <DialogBody>
                    <div className="grid grid-cols-1 gap-5 w-full">
                        <Input label="Grado" name="grado" value={grado} onChange={onInputChange} />
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
    );
};
