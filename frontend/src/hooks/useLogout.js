import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../store/auth';
import toast from 'react-hot-toast';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:1000/api/auth/logout', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
            })

            const data = await res.json();

            if (data.error)
                throw new Error(data.error);

            localStorage.removeItem('chat-user');
            dispatch(authActions.setAuthUser(null));
            toast.success('Logged Out Successfully')

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }
    return { loading, logout };
}

export default useLogout