import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { notesActions } from "../store/notes";

const useEditNote = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const editNote = async ({ noteId, title, note, color }) => {

        setLoading(true);

        try {
            const res = await fetch(`/api/notes/cards/edit/${noteId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, note, color })
            })

            const data = await res.json();

            if (data.error)
                throw new Error(data.error);

            dispatch(notesActions.setEditNote(data));

        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, editNote };
}

export default useEditNote;
