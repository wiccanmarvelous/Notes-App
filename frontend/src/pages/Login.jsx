import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const initialInputState = {
    username: '',
    password: ''
}

const Login = () => {
    const [inputs, setInputs] = useState(initialInputState);
    const { loading, login } = useLogin();

    const resetInputs = () => {
        setInputs(initialInputState);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await login(resetInputs, inputs);
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setInputs({...inputs, username: e.target.value})}
                        value={inputs.username}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        value={inputs.password}
                        required
                    />
                </div>
                <div>
                    <Link to="/signup">Don't have an account ?</Link>
                </div>
                <div>
                    {loading ?( <span className="loader"></span>
                    ) : (
                        <button className={`${loading ? 'btn-disable' : ''}`} type='submit'>Login</button>
                    )
                    }
                </div>
            </form>
        </div>

    )
}

export default Login
