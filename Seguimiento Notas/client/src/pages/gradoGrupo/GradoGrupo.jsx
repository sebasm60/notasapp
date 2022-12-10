import { useEffect, useState } from "react";

import { IconButton, Typography, Input } from "@material-tailwind/react";
import { Table } from 'antd';

import { useUiStore } from "../../hooks";
import { AddUpdateGradoGrupo, useGradosGrupos } from "./addUpdateGradoGrupo";


export const GradoGrupo = () => {

    const [data, setData] = useState([]);
    const { list, columns, gradosGrupos } = useGradosGrupos();
    const { openModal } = useUiStore();

    useEffect(() => {
        getData();
    }, [gradosGrupos]);

    const getData = async () => {
        const { rows } = await list();
        setData(rows);
    };

    return (
        <>
            <AddUpdateGradoGrupo />
            <Typography variant="h1">Grados-Grupos</Typography>
            <div className="grid grid-cols-2">
                <IconButton color="red" onClick={() => openModal()}>
                    <span className="material-icons">
                        add
                    </span>
                </IconButton>
                <Input color="red" label="Buscar." />
            </div>

            <Table columns={columns} dataSource={data} rowKey={record => record.id_grupo_grado} size='middle' scroll={true} />
        </>
    )
}
