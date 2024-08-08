import React from 'react'
import style from '../style/loginScreen.module.css'
import { useNavigate } from 'react-router-dom';


function LoginScreen() {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        navigate('/dashboard')
    }

    return (
        <div className={style.loginContainer}>
            <div className={style.loginCard}>
                <div className={style.headding}>
                    <h1>Hi</h1>
                    <h1>Welcome Back..</h1>
                </div>
                <form onSubmit={handleLogin}>
                    <p>Username</p>
                    <input type="text" />
                    <p>Password</p>
                    <input type="text" />
                    <br />
                    <button type='submit'><p>Login</p></button>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen