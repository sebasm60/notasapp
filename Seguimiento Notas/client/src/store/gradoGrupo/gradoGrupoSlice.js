import { createSlice } from "@reduxjs/toolkit"

export const gradoGrupoSlice = createSlice({
    name: 'gradosGrupos',
    initialState: {
        gradosGrupos: [],
    },
    reducers: {
        onAddGradosGrupos: (state, { payload }) => {
            state.gradosGrupos = payload;
        },
    },
});

export const { onAddGradosGrupos } = gradoGrupoSlice.actions;