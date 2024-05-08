import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import notesReducer from './notes';
import placeholderReducer from './notePlaceholder'

const store = configureStore({
    reducer: {
        auth: authReducer,
        notes: notesReducer,
        placeholder: placeholderReducer,
    }
})

export default store;