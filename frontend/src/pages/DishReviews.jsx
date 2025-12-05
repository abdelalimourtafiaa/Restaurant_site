import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import ReviewCard from '../components/ReviewCard';

const DishReviews = () => {
    const { id } = useParams();
    const [dish, setDish] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ author: '', rating: 5, comment: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // In a real app, we might need a specific endpoint to get one dish, 
                // but here we can filter from all dishes or add a getOne route.
                // Assuming we added getOne or just fetch all and find.
                // Let's assume we need to fetch all for now as I didn't add getOne.
                // Wait, I didn't add getOne in backend. I'll add it or just fetch all.
                // Fetching all is inefficient but fine for this scope.
                const dishesRes = await api.get('/dishes');
                const foundDish = dishesRes.data.find(d => d._id === id);
                setDish(foundDish);

                const reviewsRes = await api.get(`/reviews/${id}`);
                setReviews(reviewsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/reviews', { ...form, dish_id: id });
            setReviews([...reviews, res.data]);
            setForm({ author: '', rating: 5, comment: '' });
        } catch (err) {
            alert('Erreur lors de l\'envoi');
        }
    };

    if (loading) return <p className="text-center mt-4">Chargement...</p>;
    if (!dish) return <p className="text-center mt-4">Plat non trouvé</p>;

    return (
        <div className="container" style={{ padding: '50px 20px' }}>
            <div className="flex gap-4" style={{ alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <img src={dish.image_url} alt={dish.name} style={{ width: '100%', borderRadius: '8px' }} />
                </div>
                <div style={{ flex: 1 }}>
                    <h2>{dish.name}</h2>
                    <p style={{ fontSize: '1.2rem', color: '#D4AF37' }}>{dish.price}€</p>
                    <p>{dish.description}</p>
                    <div style={{ margin: '20px 0' }}>
                        <h3>Avis Clients ({reviews.length})</h3>
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {reviews.map(review => (
                                <div key={review._id} style={{ marginBottom: '15px' }}>
                                    <ReviewCard review={review} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card" style={{ marginTop: '20px' }}>
                        <h4>Donner votre avis</h4>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Votre nom"
                                value={form.author}
                                onChange={e => setForm({ ...form, author: e.target.value })}
                                required
                            />
                            <div className="flex items-center mb-4">
                                <label style={{ marginRight: '10px' }}>Note :</label>
                                <select
                                    value={form.rating}
                                    onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                                >
                                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} ★</option>)}
                                </select>
                            </div>
                            <textarea
                                placeholder="Commentaire"
                                value={form.comment}
                                onChange={e => setForm({ ...form, comment: e.target.value })}
                                required
                            ></textarea>
                            <button type="submit" className="btn">Publier</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishReviews;
