import { useEffect, useState } from "react";

import { IconButton, Typography, Input } from "@material-tailwind/react";
import { Table } from 'antd';

import { useUiStore } from "../../hooks";
import { AddUpdateAsignaturas, useAsignaturas } from "./addUpdateAsingaturas";

export const Asignaturas = () => {

    const [data, setData] = useState([]);
    const { list, columns, asignaturas } = useAsignaturas();
    const { openModal } = useUiStore();

    useEffect(() => {
        getData();
    }, [asignaturas]);

    const getData = async () => {
        const { rows } = await list();
        setData(rows);
    };

    return (
        <>
            <AddUpdateAsignaturas />
            <Typography variant="h1">Asignaturas</Typography>
            <div className="grid grid-cols-2">
                <IconButton color="red" onClick={() => openModal()}>
                    <span className="material-icons">
                        add
                    </span>
                </IconButton>
                <Input color="red" label="Buscar." />
            </div>

            <Table columns={columns} dataSource={data} rowKey={record => record.id} size='middle' scroll={true} />
        </>
    );
};
