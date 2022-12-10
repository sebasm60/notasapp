import { createSlice } from "@reduxjs/toolkit"

export const gradoSlice = createSlice({
    name: 'grados',
    initialState: {
        grados: [],
    },
    reducers: {
        onAddGrados: (state, { payload }) => {
            state.grados = payload;
        },
    },
});

export const { onAddGrados } = gradoSlice.actions;