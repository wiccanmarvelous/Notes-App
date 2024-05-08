import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../store/notes";

const useSetNotes = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.authUser);

    const setNotes = async (inputTitle, inputTextarea, color) => {

        setLoading(true);

        try {
            const res = await fetch('http://localhost:1000/api/notes/cards/set', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, title: inputTitle, note: inputTextarea, color })
            })

            const data = await res.json();

            if (data.error)
                throw new Error(data.error);
            
            dispatch(notesActions.setNotes(data));

        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, setNotes };
}

export default useSetNotes;
