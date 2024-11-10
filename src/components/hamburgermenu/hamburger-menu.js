// JavaScript
"use client";
import React, { useState, useEffect } from "react";
import classes from "./hamburger-menu.module.css";

const HamburgerMenu = () => {
    const [userRole, setUserRole] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/auth/profile", { credentials: "include" });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const userData = await response.json();
                setUserRole(userData.ruolo);
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };
        fetchUserRole();
    }, []);

    const handleToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            window.location.href = '/login';
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav role="navigation">
            <div id="menuToggle" className={`${classes.menuToggle} ${menuOpen ? classes.open : ''}`}>
                <input id='hamburgerCheck' type="checkbox" checked={menuOpen} onChange={handleToggle}/>
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu" className={classes.menu}>
                    <a href="http://localhost:3000/"><li>Home</li></a>
                    <a href="/corsi"><li>Corsi</li></a>

                    {userRole === 'amministratore' && (
                        <React.Fragment>
                            <a href="/dashboardAmministratore"><li>Admin Panel</li></a>
                        </React.Fragment>
                    )}
                    {userRole === 'utente' && (
                        <React.Fragment>
                            <a href="/dashboard"><li>Dashboard</li></a>
                        </React.Fragment>
                    )}

                    <li onClick={handleToggle} className={classes.closeButton}>Close</li>
                </ul>
            </div>
        </nav>
    );
};

export default HamburgerMenu;
