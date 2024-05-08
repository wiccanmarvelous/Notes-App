import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const signup = async (resetInputs, {name, username, password, confirmPassword}) => {

        const dataValid = checkData(name, username, password, confirmPassword);
        if (!dataValid)
            return;

        setLoading(true);
        try {
            const res = await fetch('http://localhost:1000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, username, password, confirmPassword })
            })

            const data = await res.json();

            if (data.error)
                throw new Error(data.error);

            localStorage.setItem('chat-user', JSON.stringify(data));
            dispatch(authActions.setAuthUser(data));
            toast.success('SignUp successfull.')

        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
            resetInputs();
        } finally {
            setLoading(false);
        }
    }
    return { loading, signup };
}

export default useSignup;

function checkData(name, username, password, confirmPassword) {

    if (!name, !username, !password, !confirmPassword) {
        toast.error('Please fill all the fields.');
        return false;
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match.');
        return false;
    }

    if (password.trim().length < 6) {
        toast.error('Password must be atleast 6 characters long.');
        return false;
    }
    return true;
}