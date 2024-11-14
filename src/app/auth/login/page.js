"use client";
import React, { useState } from "react";
import axios from "axios";
import classes from "./login.module.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!passwordError) {
            setIsLoggingIn(true);
            try {
                const response = await axios.post("http://localhost:8080/api/auth/login", {
                    email,
                    password,
                }, { withCredentials: true });

                if (response.status === 200) {
                    console.log("Login effettuato!");
                    const userData = await fetch("http://localhost:8080/api/auth/profile", {
                        credentials: "include",
                    }).then((res) => res.json());

                    setEmail("");
                    setPassword("");
                    setLoginError("");
                    const redirectUrl = userData.ruolo === "utente"
                        ? "/user/dashboard"
                        : "/admin/dashboard";
                    window.location.href = redirectUrl;
                } else {
                    setLoginError("Login fallito.");
                }
            } catch (error) {
                setLoginError("Errore durante il login. Verifica le credenziali e riprova.");
                console.error(error);
            } finally {
                setIsLoggingIn(false);
            }
        } else {
            setLoginError("La password non è valida.");
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.logoContainer}>
                <img src="/images/logo.webp" alt="Logo C'est la Vie" className={classes.logo} />
            </div>
            <h1 className={classes.heading}>Login</h1>
            <form onSubmit={handleSubmit} className={classes.form}>
                <label htmlFor="email" className={classes.formLabel}>E-mail</label>
                <input
                    type="email"
                    className={classes.formInput}
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <label htmlFor="password" className={classes.formLabel}>Password</label>
                <input
                    type="password"
                    className={classes.formInput}
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                {passwordError && <p className={classes.error}>{passwordError}</p>}
                {loginError && <p className={classes.error}>{loginError}</p>}
                <button type="submit" className={classes.submitButton} disabled={isLoggingIn}>
                    {isLoggingIn ? "Login in corso..." : "Login"}
                </button>
            </form>
            <div className={classes.register}>
                <p>Non hai un account? <a href="/auth/register">Registrati</a></p>
            </div>
        </div>
    );
};

export default LoginForm;
