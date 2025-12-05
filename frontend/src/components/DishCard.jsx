import React from 'react';
import { Link } from 'react-router-dom';

const DishCard = ({ dish }) => {
    return (
        <div className="card">
            <img src={dish.image_url} alt={dish.name} />
            <div style={{ padding: '0 10px' }}>
                <div className="flex justify-between items-center">
                    <h3 style={{ margin: '0 0 10px 0' }}>{dish.name}</h3>
                    <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>{dish.price}€</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '15px' }}>{dish.description}</p>
                <div className="flex justify-between items-center">
                    <div style={{ color: '#FFD700' }}>
                        {'★'.repeat(Math.round(dish.average_rating))}
                        <span style={{ color: '#555' }}>{'★'.repeat(5 - Math.round(dish.average_rating))}</span>
                    </div>
                    <Link to={`/reviews/${dish._id}`} className="btn-outline" style={{ padding: '5px 10px', fontSize: '0.8rem' }}>Voir avis</Link>
                </div>
            </div>
        </div>
    );
};

export default DishCard;
