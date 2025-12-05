import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const RestaurantReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ author: '', rating: 5, category: 'Service', comment: '' });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await api.get('/restaurant-reviews');
                setReviews(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/restaurant-reviews', form);
            setReviews([res.data, ...reviews]);
            setForm({ author: '', rating: 5, category: 'Service', comment: '' });
        } catch (err) {
            alert('Erreur lors de l\'envoi de l\'avis');
        }
    };

    return (
        <div className="container" style={{ padding: '50px 20px' }}>
            <h2 className="text-center">Avis sur le Restaurant</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginTop: '40px' }}>
                <div>
                    <h3>Laisser un avis</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Votre nom"
                            value={form.author}
                            onChange={e => setForm({ ...form, author: e.target.value })}
                            required
                        />
                        <select
                            value={form.category}
                            onChange={e => setForm({ ...form, category: e.target.value })}
                        >
                            <option value="Service">Service</option>
                            <option value="Qualité">Qualité</option>
                            <option value="Hygiène">Hygiène</option>
                            <option value="Rapidité">Rapidité</option>
                        </select>
                        <div className="flex items-center mb-4">
                            <label style={{ marginRight: '10px' }}>Note :</label>
                            <select
                                value={form.rating}
                                onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                                style={{ width: 'auto', marginBottom: 0 }}
                            >
                                <option value="5">5 ★★★★★</option>
                                <option value="4">4 ★★★★</option>
                                <option value="3">3 ★★★</option>
                                <option value="2">2 ★★</option>
                                <option value="1">1 ★</option>
                            </select>
                        </div>
                        <textarea
                            placeholder="Votre commentaire"
                            value={form.comment}
                            onChange={e => setForm({ ...form, comment: e.target.value })}
                            required
                            rows="4"
                        ></textarea>
                        <button type="submit" className="btn">Envoyer</button>
                    </form>
                </div>

                <div>
                    <h3>Derniers avis</h3>
                    {loading ? <p>Chargement...</p> : (
                        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                            {reviews.map(review => (
                                <div key={review._id} className="card" style={{ marginBottom: '20px', padding: '15px' }}>
                                    <div className="flex justify-between">
                                        <strong>{review.author}</strong>
                                        <span style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(review.date).toLocaleDateString()}</span>
                                    </div>
                                    <div style={{ color: '#D4AF37', fontSize: '0.9rem', margin: '5px 0' }}>
                                        {review.category} - {'★'.repeat(review.rating)}
                                    </div>
                                    <p style={{ margin: 0 }}>{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantReviews;
