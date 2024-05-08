import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { notesActions } from "../store/notes";

const useDelNote = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const delNote = async (noteId) => {

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:1000/api/notes/cards/del/${noteId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await res.json();

            if (data.error)
                throw new Error(data.error);


        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, delNote };
}

export default useDelNote;
