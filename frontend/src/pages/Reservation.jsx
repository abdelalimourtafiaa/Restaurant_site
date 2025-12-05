import React, { useState } from 'react';
import api from '../api/axios';

const Reservation = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', guests: 2, date_time: '' });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/reservations', form);
            setMessage('Votre demande de réservation a été envoyée avec succès. Nous vous confirmerons par email.');
            setForm({ name: '', email: '', phone: '', guests: 2, date_time: '' });
        } catch (err) {
            setMessage('Erreur lors de la réservation. Veuillez réessayer.');
        }
    };

    return (
        <div className="container" style={{ padding: '50px 20px', maxWidth: '600px' }}>
            <h2 className="text-center">Réserver une table</h2>
            <p className="text-center" style={{ marginBottom: '40px', color: '#ccc' }}>
                Pour toute demande particulière, n'hésitez pas à nous contacter par téléphone.
            </p>

            {message && (
                <div style={{
                    padding: '15px',
                    backgroundColor: message.includes('succès') ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                    border: `1px solid ${message.includes('succès') ? 'green' : 'red'}`,
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="card" style={{ padding: '30px' }}>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Nom complet"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>
                <div className="flex gap-4">
                    <input
                        type="tel"
                        placeholder="Téléphone"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Nombre de personnes"
                        min="1"
                        max="20"
                        value={form.guests}
                        onChange={e => setForm({ ...form, guests: e.target.value })}
                        required
                    />
                </div>
                <input
                    type="datetime-local"
                    value={form.date_time}
                    onChange={e => setForm({ ...form, date_time: e.target.value })}
                    required
                />
                <button type="submit" className="btn" style={{ width: '100%' }}>Confirmer la réservation</button>
            </form>
        </div>
    );
};

export default Reservation;
