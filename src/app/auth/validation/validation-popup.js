'use client';
import React, { useState, useEffect } from "react";

export default function ValidationEmailPopup({ userId, onClose, onValidateOTP, onResendCode }) {
    const [otp, setOtp] = useState("");
    const [isSubmittingOTP, setIsSubmittingOTP] = useState(false); // New loading state

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleOTPSubmit = async () => {
        setIsSubmittingOTP(true); // Start submitting
        await onValidateOTP(otp, userId); // Call validation function
        setIsSubmittingOTP(false); // Stop submitting once done
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    width: "90%",
                    maxWidth: "400px",
                    padding: "24px",
                    textAlign: "center",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "16px" }}>
                    EMAIL VALIDATION
                </div>
                <hr style={{ border: "none", borderTop: "1px solid #ccc", marginBottom: "16px" }} />
                <p style={{ fontSize: "0.875rem", color: "#333", marginBottom: "24px" }}>
                    PLEASE INSERT THE CODE SENT TO YOUR EMAIL BELOW
                </p>

                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP code"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "16px",
                        fontSize: "1rem",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        textAlign: "center",
                    }}
                />

                <div
                    style={{
                        fontSize: "0.875rem",
                        color: "#007bff",
                        textDecoration: "underline",
                        cursor: "pointer",
                        marginBottom: "16px",
                    }}
                    onClick={onResendCode}
                >
                    Resend Code
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#f0f0f0",
                            color: "#333",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleOTPSubmit}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        disabled={isSubmittingOTP} // Disable the button while submitting
                    >
                        {isSubmittingOTP ? "Submitting..." : "SUBMIT"} {/* Change button text */}
                    </button>
                </div>
            </div>
        </div>
    );
}
