import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const AdminReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        const res = await api.get('/reservations');
        setReservations(res.data);
    };

    const handleStatus = async (id, status) => {
        try {
            await api.put(`/reservations/${id}`, { status });
            fetchReservations();
        } catch (err) {
            alert('Erreur');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Supprimer cette réservation ?')) {
            try {
                await api.delete(`/reservations/${id}`);
                fetchReservations();
            } catch (err) {
                alert('Erreur');
            }
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <div style={{ width: '250px', backgroundColor: '#111', padding: '20px', borderRight: '1px solid #333' }}>
                <h3 style={{ marginBottom: '40px', color: '#D4AF37' }}>Admin Panel</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <Link to="/admin" style={{ color: '#888' }}>Dashboard</Link>
                    <Link to="/admin/dishes" style={{ color: '#888' }}>Plats</Link>
                    <Link to="/admin/reservations" style={{ color: '#fff' }}>Réservations</Link>
                    <Link to="/admin/reviews" style={{ color: '#888' }}>Avis</Link>
                </div>
            </div>

            <div style={{ flex: 1, padding: '40px' }}>
                <h2>Gestion des Réservations</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px', backgroundColor: '#1F1F1F' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #333', textAlign: 'left' }}>
                            <th style={{ padding: '15px' }}>Nom</th>
                            <th style={{ padding: '15px' }}>Date</th>
                            <th style={{ padding: '15px' }}>Pers.</th>
                            <th style={{ padding: '15px' }}>Contact</th>
                            <th style={{ padding: '15px' }}>Statut</th>
                            <th style={{ padding: '15px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(res => (
                            <tr key={res._id} style={{ borderBottom: '1px solid #333' }}>
                                <td style={{ padding: '15px' }}>{res.name}</td>
                                <td style={{ padding: '15px' }}>{new Date(res.date_time).toLocaleString()}</td>
                                <td style={{ padding: '15px' }}>{res.guests}</td>
                                <td style={{ padding: '15px' }}>{res.phone}<br />{res.email}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        color: res.status === 'confirmed' ? 'green' : res.status === 'cancelled' ? 'red' : 'orange'
                                    }}>
                                        {res.status}
                                    </span>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    {res.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleStatus(res._id, 'confirmed')} className="btn" style={{ padding: '5px 10px', fontSize: '0.8rem', marginRight: '5px' }}>✔</button>
                                            <button onClick={() => handleStatus(res._id, 'cancelled')} className="btn-outline" style={{ padding: '5px 10px', fontSize: '0.8rem', borderColor: 'red', color: 'red' }}>✖</button>
                                        </>
                                    )}
                                    <button onClick={() => handleDelete(res._id)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', marginLeft: '10px' }}>🗑</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminReservations;
