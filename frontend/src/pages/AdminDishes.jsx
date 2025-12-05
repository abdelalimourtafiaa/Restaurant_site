import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const AdminDishes = () => {
    const [dishes, setDishes] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', price: '', category: 'Entrées', image_url: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchDishes();
    }, []);

    const fetchDishes = async () => {
        const res = await api.get('/dishes');
        setDishes(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/dishes/${editingId}`, form);
            } else {
                await api.post('/dishes', form);
            }
            setForm({ name: '', description: '', price: '', category: 'Entrées', image_url: '' });
            setEditingId(null);
            fetchDishes();
        } catch (err) {
            alert('Erreur');
        }
    };

    const handleEdit = (dish) => {
        setForm(dish);
        setEditingId(dish._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Supprimer ce plat ?')) {
            try {
                await api.delete(`/dishes/${id}`);
                fetchDishes();
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
                    <Link to="/admin/dishes" style={{ color: '#fff' }}>Plats</Link>
                    <Link to="/admin/reservations" style={{ color: '#888' }}>Réservations</Link>
                    <Link to="/admin/reviews" style={{ color: '#888' }}>Avis</Link>
                </div>
            </div>

            <div style={{ flex: 1, padding: '40px' }}>
                <h2>Gestion des Plats</h2>

                <div className="card" style={{ marginBottom: '40px' }}>
                    <h3>{editingId ? 'Modifier' : 'Ajouter'} un plat</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4">
                            <input type="text" placeholder="Nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                            <input type="number" placeholder="Prix" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                        </div>
                        <div className="flex gap-4">
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                <option>Entrées</option>
                                <option>Plats</option>
                                <option>Desserts</option>
                                <option>Boissons</option>
                            </select>
                            <input type="text" placeholder="URL Image" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} required />
                        </div>
                        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required></textarea>
                        <button type="submit" className="btn">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
                        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', description: '', price: '', category: 'Entrées', image_url: '' }) }} className="btn-outline" style={{ marginLeft: '10px' }}>Annuler</button>}
                    </form>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {dishes.map(dish => (
                        <div key={dish._id} className="card">
                            <img src={dish.image_url} alt={dish.name} style={{ height: '150px' }} />
                            <div style={{ padding: '10px' }}>
                                <h4>{dish.name}</h4>
                                <p>{dish.price}€</p>
                                <div className="flex gap-4 mt-4">
                                    <button onClick={() => handleEdit(dish)} className="btn-outline" style={{ flex: 1 }}>Editer</button>
                                    <button onClick={() => handleDelete(dish._id)} className="btn-outline" style={{ flex: 1, borderColor: 'red', color: 'red' }}>Supprimer</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDishes;
