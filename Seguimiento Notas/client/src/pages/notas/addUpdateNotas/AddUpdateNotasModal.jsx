import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Select, Option, Input } from "@material-tailwind/react";
import { useUiStore } from "../../../hooks";

export const AddUpdateNotasModal = () => {

    const { isModalOpen, closeModal } = useUiStore();
    const handleOpen = () => closeModal();

    return (
        <Dialog open={isModalOpen}>
            <DialogHeader>Notas</DialogHeader>
            <DialogBody>
                <div className="grid grid-cols-1 gap-5 w-full">
                    <Select label="Asignatura"   >
                        <Input label="buscar" />
                    </Select>

                    <Select label="Estudiante">
                        <Input label="buscar" />
                    </Select>

                    <div className="grid grid-cols-2 gap-5">
                        <Select label="Asiste">
                            <Option>Si</Option>
                            <Option>No</Option>
                        </Select>

                        <Input type={'Date'} label="fecha" />
                    </div>

                </div>
            </DialogBody>

            <DialogFooter>
                <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                    <span>Cancelar</span>
                </Button>

                <Button variant="gradient" color="green" onClick={handleOpen}>
                    <span>Guardar</span>
                </Button>
            </DialogFooter>

        </Dialog>
    )
}
