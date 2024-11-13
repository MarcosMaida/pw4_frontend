"use client";

import { useState } from "react";
import styles from "./register.module.css";
import ValidationEmailPopup from "@/app/auth/validation/validation-popup";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        nomeUtente: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: "",
        ruolo: "utente"
    });
    const [message, setMessage] = useState("");
    const [subscriptionStatus, setSubscriptionStatus] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isValidationPopupOpen, setIsValidationPopupOpen] = useState(false);
    const [utenteId, setUtenteId] = useState();
    const [isRegistering, setIsRegistering] = useState(false); // New loading state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "password") {
            validatePassword(value);
        }
    };

    const validatePassword = (password) => {
        // Add password validation logic if needed
    };

    const registerUser = async (userData) => {
        setIsRegistering(true); // Start loading
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const { id } = await response.json();
                setSubscriptionStatus(message);
                setUtenteId(id);
                setIsValidationPopupOpen(true);
            } else if (response.status === 400) {
                setSubscriptionStatus("Email già registrata.");
            } else {
                const errorMessage = await response.text();
                setSubscriptionStatus(`Iscrizione fallita: ${errorMessage}`);
            }
        } catch (error) {
            setSubscriptionStatus("Iscrizione fallita. Riprova.");
            console.error("Error during registration:", error);
        } finally {
            setIsRegistering(false); // Stop loading
        }
    };

    const handleOTPSubmit = async (otp) => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/verify", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: utenteId, codiceVerifica: otp })
            });

            if (response.ok) {
                setSubscriptionStatus("Email verified successfully! You can now log in.");
                setIsValidationPopupOpen(false);
            } else {
                const errorMessage = await response.text();
                setSubscriptionStatus(`OTP validation failed: ${errorMessage}`);
            }
        } catch (error) {
            setSubscriptionStatus("Failed to validate OTP. Please try again.");
            console.error("Error during OTP validation:", error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage("Le password non corrispondono");
            return;
        }

        if (passwordError) {
            setMessage(passwordError);
            return;
        }

        const userData = {
            nomeUtente: formData.nomeUtente,
            email: formData.email,
            password: formData.password,
            telefono: formData.telefono,
            registrazione: new Date().toISOString(),
            ruolo: formData.ruolo,
        };

        await registerUser(userData);
        setFormData({
            nomeUtente: "",
            email: "",
            telefono: "",
            password: "",
            confirmPassword: "",
            ruolo: "utente"
        });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Registrazione</h1>
            {message && <p className={styles.message}>{message}</p>}
            {subscriptionStatus && <p className={styles.subscriptionStatus}>{subscriptionStatus}</p>}
            <form onSubmit={handleFormSubmit} className={styles.form}>
                <label className={styles.formLabel}>
                    Username:
                    <input
                        type="text"
                        name="nomeUtente"
                        value={formData.nomeUtente}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <label className={styles.formLabel}>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <label className={styles.formLabel}>
                    Telefono:
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <label className={styles.formLabel}>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <label className={styles.formLabel}>
                    Conferma Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <button type="submit" className={styles.submitButton} disabled={isRegistering}>
                    {isRegistering ? "Registrazione in corso..." : "Registrati"}
                </button>
            </form>
            {isValidationPopupOpen && (
                <ValidationEmailPopup
                    userId={utenteId} // Pass userId to the popup
                    onValidateOTP={handleOTPSubmit}
                    onClose={() => setIsValidationPopupOpen(false)}
                />
            )}
        </div>
    );
}
