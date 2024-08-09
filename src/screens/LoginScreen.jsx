import React, { useState } from 'react';
import axios from 'axios';
import style from '../style/loginScreen.module.css';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const handleLogin = async (event) => {
        event.preventDefault();

        axios.post(`${import.meta.env.VITE_SERVER}/user/login/`, {
            username: username,
            password: password
        })
            .then(function (response) {
                const accessToken = response.data.accessToken;
                const accessExpiry = response.data.accessExpiry
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('expiry', accessExpiry)
                navigate('/dashboard/products');
            })
            .catch(function (error) {
                setError(error.response.data)
            });
    }
    return (
        <div className={style.loginContainer}>
            <div className={style.loginCard}>
                <div className={style.heading}>
                    <h1>Hi</h1>
                    <h1>Welcome Back..</h1>
                </div>
                <form onSubmit={handleLogin}>
                    <p>Username</p>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p>Password</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button type='submit'><p>Login</p></button>
                </form>
                {error && (
                    <div className={style.error}>
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginScreen;
