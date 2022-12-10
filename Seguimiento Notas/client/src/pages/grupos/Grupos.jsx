import { useEffect, useState } from "react";

import { IconButton, Typography, Input } from "@material-tailwind/react";
import { Table } from 'antd';

import { useUiStore } from "../../hooks";
import { AddUpdateGrupos, useGrupos } from "./addUpdateGrupos";

export const Grupos = () => {

    const [data, setData] = useState([]);
    const { listGrupos, columns, grupos } = useGrupos();
    const { openModal } = useUiStore();

    useEffect(() => {
        getData();
    }, [grupos]);

    const getData = async () => {
        const { rows } = await listGrupos();
        setData(rows);
    };

    return (
        <>
            <AddUpdateGrupos />
            <Typography variant="h1">Grupos</Typography>
            <div className="grid grid-cols-2">
                <IconButton color="red" onClick={() => openModal()}>
                    <span className="material-icons">
                        add
                    </span>
                </IconButton>
                <Input color="red" label="Buscar." />
            </div>

            <Table columns={columns} dataSource={data} rowKey={record => record.id_grupo} size='middle' scroll={true} />
        </>
    )
}
