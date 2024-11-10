"use client"
import React, { useState } from 'react';
import axios from 'axios';
import classes from './login.module.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const validatePassword = (password) => {
        // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // if (!passwordRegex.test(password)) {
        //     setPasswordError('La password deve contenere almeno 8 caratteri, di cui almeno una lettera, un numero e un carattere speciale.');
        // } else {
        //     setPasswordError('');
        // }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!passwordError) {
            try {
                const response = await axios.post('http://localhost:8080/api/auth/login', {
                    email,
                    password
                }, { withCredentials: true });

                if (response.status === 200) {
                    console.log('Login effettuato!');
                    const userData = await fetch('http://localhost:8080/api/auth/profile', { credentials: 'include' }).then(response => response.json());
                    // Resetta il modulo
                    setEmail('');
                    setPassword('');
                    setLoginError('');
                    if (userData.ruolo === 'utente') {
                        window.location.href = 'http://localhost:3000/user/dashboard';
                    } else {
                        window.location.href = 'http://localhost:3000/admin/dashboard';
                    }
                } else {
                    setLoginError('Login fallito.');
                }
            } catch (error) {
                setLoginError('Errore durante il login. Verifica le credenziali e riprova.');
                console.error(error);
            }
        } else {
            setLoginError('La password non è valida.');
        }
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.heading}>Login</h1>
            <div className={classes.form}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className={classes.formLabel}>E-mail</label>
                    <input
                        type="email"
                        className={classes.formInput}
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <label htmlFor="password" className={classes.formLabel}>Password</label>
                    <input
                        type="password"
                        className={classes.formInput}
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {passwordError && <p className={classes.error}>{passwordError}</p>}
                    {loginError && <p className={classes.error}>{loginError}</p>}
                    <button type="submit" className={classes.submitButton}>Login</button>
                </form>
                <div className="nav-item">
                    <a href="../../auth/register" className={classes.register}>Crea Il Tuo Account</a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
