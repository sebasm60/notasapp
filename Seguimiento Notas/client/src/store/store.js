import { configureStore } from '@reduxjs/toolkit'
import { uiSlice, authSlice, gradoSlice, grupoSlice, gradoGrupoSlice, asignaturasSlice } from './'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        grados: gradoSlice.reducer,
        grupos: grupoSlice.reducer,
        gradosGrupos: gradoGrupoSlice.reducer,
        ui: uiSlice.reducer,
        asignaturas: asignaturasSlice.reducer,
    },

})