import { createSlice } from "@reduxjs/toolkit";

const placeholderSlice = createSlice({
    name: 'placeholder',
    initialState: { showPlaceholder: false },
    reducers: {
        setPlaceholder(state, action) {
            state.showPlaceholder = action.payload;
        }
    }
})

export const placeholderActions = placeholderSlice.actions;

export default placeholderSlice.reducer;