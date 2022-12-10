import { IconButton, Typography, Input } from "@material-tailwind/react";

import { Table } from 'antd';
import { useEffect, useState } from "react";

import { useUiStore, useAuthStore } from "../../hooks";
import { AddUpdateAsistenciaModal, useAsistencia } from "./addUpdateAsistencia";

export const Asistencia = () => {

    const { user } = useAuthStore();
    const [data, setData] = useState([]);
    const { list, columns, grados } = useAsistencia();
    const { openModal } = useUiStore();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const { rows } = await list();
        setData(rows);
    };

    return (
        <>
            <AddUpdateAsistenciaModal />
            <Typography variant="h1">Asistencia</Typography>
            <div className="grid grid-cols-2">
                <IconButton color="red" onClick={() => openModal()}>
                    <span className="material-icons">
                        add
                    </span>
                </IconButton>

                <Input color="red" label="Buscar." />
            </div>
            <Table columns={columns} dataSource={data} rowKey={record => record.id_grado} size='middle' scroll={true} />
        </>
    )
}
