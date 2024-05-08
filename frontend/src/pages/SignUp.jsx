import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

const initialInputState = {
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
    const [inputs, setInputs] = useState(initialInputState);
    const { loading, signup } = useSignup();

    const resetInputs = () => {
        setInputs(initialInputState);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await signup(resetInputs, inputs);

    }
    return (
        <div className="signup">
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                        value={inputs.name}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        value={inputs.username}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        value={inputs.password}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        value={inputs.confirmPassword}
                        required
                    />
                </div>
                <div>
                    <Link to="/login">Already have an account ?</Link>
                </div>
                <div>
                    {loading ?( <span className="loader"></span>
                    ) : (
                        <button className={`${loading ? 'btn-disable' : ''}`} type='submit'>Signup</button>
                    )
                    }
                </div>
            </form>
        </div>

    )
}

export default SignUp
