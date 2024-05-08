import React, { useContext, useEffect, useState } from 'react'
import Card from '../../UI/Card/Card';
import { useDispatch, useSelector } from 'react-redux'
import { notesActions } from '../../../store/notes';
import NewNote from '../NewNote/NewNote';
import useGetNotes from '../../../hooks/useGetNotes';
import useDelNote from '../../../hooks/useDeleteNote';
import useEditNote from '../../../hooks/useEditNote';

const AllNotes = () => {
    const dispatch = useDispatch();
    const allNotes = useSelector(state => state.notes.allNotes);
    const editNoteId = useSelector(state => state.notes.editNoteId);
    const [edit, setEdit] = useState(false);
    const [editIdx, setEditIdx] = useState(null);
    const [dataItem, setDataItem] = useState({ title: '', note: '', color: '' })
    const { loading, getNotes } = useGetNotes();
    const { editNote } = useEditNote();
    const { delNote } = useDelNote();

    useEffect(() => {
        const onRefresh = async () => {
            await getNotes();
        }
        onRefresh();

    }, [editNoteId])


    const editNotesHandler = (idx) => {
        setEditIdx(idx);
        setDataItem(allNotes[idx]);
        dispatch(notesActions.getEditNote(allNotes[idx].id));
        setEdit(true);
    }

    const submitHandler = async (inputTitle, inputTextarea, color) => {
        const note = {
            noteId: editNoteId,
            title: inputTitle,
            note: inputTextarea,
            color: color
        }
        await editNote(note);
        setEdit(false);
    }

    const emptyHandler = () => {
        setEdit(false);
    }
    
    const removeItemHandler = async () => {
        dispatch(notesActions.removeNotes(editIdx));
        await delNote(editNoteId);
        setEditIdx(null);
        setEdit(false);
    }

    return (
        <>
            <div className="all-notes">

                {allNotes.length !== 0 &&
                        allNotes.map((item, idx) => (
                            <Card
                                key={Math.random()}
                                title={item.title}
                                note={item.note}
                                bgColor={item.color}
                                index={idx}
                                removeItem={removeItemHandler.bind(null, idx)}
                                editNote={editNotesHandler.bind(null, idx)}
                            />
                        ))
                }
                {allNotes.length === 0 &&
                    <div className='emptyPage'>
                        {/* <img src={EmptyPageImmg} /> */}
                        {loading ? <p>Loading notes...</p> : <p>Add Notes...</p>}
                    </div>
                }
            </div>
            {edit && <NewNote submitHandler={submitHandler} emptyHandler={emptyHandler} dataItem={dataItem} removeItemHandler={removeItemHandler} />}
        </>
    )
}

export default AllNotes
