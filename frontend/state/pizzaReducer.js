import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    sizeFilter: 'All'
}
export const pizzaSlice = createSlice({
    name: 'pizzaSlice',
    initialState,
    reducers: {
        changeSizeFilter(state, action) {
            state.sizeFilter = action.payload
        } 
    }
})
export const {changeSizeFilter} = pizzaSlice.actions
export default pizzaSlice.reducer