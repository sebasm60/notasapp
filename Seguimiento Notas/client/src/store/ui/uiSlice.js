import { createSlice } from "@reduxjs/toolkit"

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isModalOpen: false,
    },
    reducers: {
        onOpenAsistenciaModal: (state) => {
            state.isModalOpen = true;
        },
        onCloseAsistenciaModal: (state) => {
            state.isModalOpen = false;
        },
    },
});

export const { onOpenAsistenciaModal, onCloseAsistenciaModal } = uiSlice.actions;