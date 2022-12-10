import { createSlice } from "@reduxjs/toolkit"

export const asignaturasSlice = createSlice({
    name: 'asignaturas',
    initialState: {
        asignaturas: [],
    },
    reducers: {
        onAddAsignaturas: (state, { payload }) => {
            state.asignaturas = payload;
        },
    },
});

export const { onAddAsignaturas } = asignaturasSlice.actions;