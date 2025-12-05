import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ dishes: 0, reservations: 0, reviews: 0 });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get('/auth/me');
                // Fetch stats (mocking for now or simple counts)
                const dishes = await api.get('/dishes');
                const reservations = await api.get('/reservations');
                const reviews = await api.get('/restaurant-reviews');
                setStats({
                    dishes: dishes.data.length,
                    reservations: reservations.data.length,
                    reviews: reviews.data.length
                });
            } catch (err) {
                navigate('/admin/login');
            }
        };
        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', backgroundColor: '#111', padding: '20px', borderRight: '1px solid #333' }}>
                <h3 style={{ marginBottom: '40px', color: '#D4AF37' }}>Admin Panel</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <Link to="/admin" style={{ color: '#fff' }}>Dashboard</Link>
                    <Link to="/admin/dishes" style={{ color: '#888' }}>Plats</Link>
                    <Link to="/admin/reservations" style={{ color: '#888' }}>Réservations</Link>
                    <Link to="/admin/reviews" style={{ color: '#888' }}>Avis</Link>
                    <button onClick={handleLogout} className="btn-outline" style={{ marginTop: 'auto' }}>Déconnexion</button>
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '40px' }}>
                <h2>Tableau de bord</h2>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '30px' }}>
                    <div className="card text-center">
                        <h3>{stats.dishes}</h3>
                        <p>Plats au menu</p>
                    </div>
                    <div className="card text-center">
                        <h3>{stats.reservations}</h3>
                        <p>Réservations</p>
                    </div>
                    <div className="card text-center">
                        <h3>{stats.reviews}</h3>
                        <p>Avis Restaurant</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
