import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className="container nav-content">
                <Link to="/" className="logo">Le Gourmet Royal</Link>
                <div className="nav-links">
                    <Link to="/">Accueil</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/reviews">Avis</Link>
                    <Link to="/reservation">Réserver</Link>
                    <Link to="/admin/login" style={{ fontSize: '0.8rem', opacity: 0.7 }}>Admin</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
