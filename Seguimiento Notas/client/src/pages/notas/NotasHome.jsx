import { IconButton, Typography, Input } from "@material-tailwind/react";

import { Table } from 'antd';

import { useUiStore, useAuthStore } from "../../hooks";
import { AddUpdateNotasModal } from "./addUpdateNotas";

export const NotasHome = () => {

    const { user } = useAuthStore();
    const { openModal } = useUiStore();

    return (
        <>
            <AddUpdateNotasModal />
            <Typography variant="h1">Notas</Typography>
            <div className="grid grid-cols-2">
                <IconButton color="red" onClick={() => openModal()}>
                    <span className="material-icons">
                        add
                    </span>
                </IconButton>
                <Input color="red" label="Buscar." />
            </div>

            <Table />
        </>
    )
}
