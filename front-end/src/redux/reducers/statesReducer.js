import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'states', // nome do reducer
    initialState: {
        statesList: []
    }, //estado inicial
    reducers: {
        setStatesList: (state, action) => {
            state.statesList = action.payload
        }
    } // actions 
})


export const { setStatesList } = slice.actions;
export default slice.reducer;