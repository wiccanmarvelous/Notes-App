import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../store/auth';
import toast from 'react-hot-toast';
import useGetNotes from './useGetNotes';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { getNotes } = useGetNotes();
    
    const login = async (resetInputs, { username, password }) => {
        
        const dataValid = checkData(username, password);
        if (!dataValid)
            return;

        setLoading(true);
        try {
            const res = await fetch('http://localhost:1000/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json();

            if (data.error)
                throw new Error(data.error);

            localStorage.setItem('chat-user', JSON.stringify(data));
            dispatch(authActions.setAuthUser(data));
            await getNotes();
            toast.success('Login successfull.');
        } catch (error) {
            toast.error(error.message);
            resetInputs();
        } finally {
            setLoading(false);
        }
    }
    return { loading, login };
}

export default useLogin;

function checkData(username, password) {
    if (!username || !password) {
        toast.error('Please fill all the fields.');
        return false;
    }
    return true;
}