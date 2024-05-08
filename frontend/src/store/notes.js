import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
    name: 'notes',
    initialState: { allNotes : [], editNoteId : null },
    reducers: {
        fetchNotes(state, action) {
            state.allNotes = action.payload;
        },
        setNotes(state, action) {
            state.allNotes.push(action.payload);
        },
        getEditNote(state, action) {
            state.editNoteId = action.payload;
        },
        setEditNote(state, action) {
            state.allNotes[state.editNoteId] = action.payload;
            state.editNoteId = null;
        },
        removeNotes(state, action) {
            state.allNotes.splice(action.payload, 1);
        }
    }
})

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;