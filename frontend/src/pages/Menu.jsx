import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import DishCard from '../components/DishCard';

const Menu = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('Entrées');

    const categories = ['Entrées', 'Plats', 'Desserts', 'Boissons'];

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const res = await api.get('/dishes');
                setDishes(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDishes();
    }, []);

    const filteredDishes = dishes.filter(d => d.category === activeCategory);

    return (
        <div className="container" style={{ padding: '50px 20px' }}>
            <h2 className="text-center" style={{ marginBottom: '40px' }}>Notre Menu</h2>

            <div className="flex justify-between" style={{ maxWidth: '600px', margin: '0 auto 50px auto', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: activeCategory === cat ? '#D4AF37' : '#fff',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            borderBottom: activeCategory === cat ? '2px solid #D4AF37' : 'none',
                            paddingBottom: '5px'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="text-center">Chargement...</p>
            ) : (
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                    {filteredDishes.map(dish => (
                        <DishCard key={dish._id} dish={dish} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Menu;
