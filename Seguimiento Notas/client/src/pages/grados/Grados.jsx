import { useEffect, useState } from "react";

import { IconButton, Typography, Input } from "@material-tailwind/react";
import { Table } from 'antd';

import { useUiStore } from "../../hooks";
import { AddUpdateGrados, useGrados } from "./addUpdateGrados";

export const Grados = () => {

    const [data, setData] = useState([]);
    const { listGrados, columns, grados } = useGrados();
    const { openModal } = useUiStore();

    useEffect(() => {
        getData();
    }, [grados]);

    const getData = async () => {
        const { rows } = await listGrados();
        setData(rows);
    };

    return (
        <>
            <AddUpdateGrados />
            <Typography variant="h1">Grados</Typography>
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
