import { createSlice } from "@reduxjs/toolkit"

export const grupoSlice = createSlice({
    name: 'grupos',
    initialState: {
        grupos: [],
    },
    reducers: {
        onAddGrupos: (state, { payload }) => {
            state.grupos = payload;
        },
    },
});

export const { onAddGrupos } = grupoSlice.actions;