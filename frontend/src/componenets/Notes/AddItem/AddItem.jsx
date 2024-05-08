import React, { useState, useContext } from 'react';
import NewNote from '../NewNote/NewNote2';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import useSetNotes from '../../../hooks/useSetNotes';
import { placeholderActions } from '../../../store/notePlaceholder';
import { useDispatch } from 'react-redux';

const AddItem = () => {

    const [addNote, setAddNote] = useState(false);
    const { loading, setNotes } = useSetNotes();
    const dispatch = useDispatch();

    const submitHandler = async (inputTitle, inputTextarea, color) => {

        await setNotes(inputTitle, inputTextarea, color);
        setAddNote(false);
    }

    const emptyHandler = () => {
        setAddNote(false);
    }

    return (
        <>
            <div className='addItem'>
                <button
                    onClick={() => {
                        dispatch(placeholderActions.setPlaceholder(true));
                        setAddNote(true);
                    }}
                    className='addItemBtn'
                >
                    <NoteAddOutlinedIcon />
                </button>
                {addNote && <NewNote submitHandler={submitHandler} emptyHandler={emptyHandler} />}
            </div>
        </>
    )
}

export default AddItem
