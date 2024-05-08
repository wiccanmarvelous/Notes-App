import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../store/notes";

const useGetNotes = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.authUser);

    const getNotes = async () => {

        setLoading(true);

        try {
            const res = await fetch('http://localhost:1000/api/notes/cards/get', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id })
            })

            let data = await res.json();

            if (data.error)
                throw new Error(data.error);


            data = data.map(item => ({
                id: item._id,
                title: item.title,
                note: item.note,
                color: item.color,
                userId: item.userId
            }));

            dispatch(notesActions.fetchNotes(data));


        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, getNotes };
}

export default useGetNotes;
