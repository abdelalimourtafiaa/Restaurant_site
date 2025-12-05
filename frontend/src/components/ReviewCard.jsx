import React from 'react';

const ReviewCard = ({ review }) => {
    return (
        <div className="card" style={{ padding: '20px' }}>
            <div className="flex justify-between items-center mb-4">
                <h4 style={{ margin: 0 }}>{review.author}</h4>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(review.date).toLocaleDateString()}</span>
            </div>
            <div style={{ color: '#FFD700', marginBottom: '10px' }}>
                {'★'.repeat(review.rating)}
                <span style={{ color: '#555' }}>{'★'.repeat(5 - review.rating)}</span>
            </div>
            <p style={{ fontStyle: 'italic', color: '#ddd' }}>"{review.comment}"</p>
        </div>
    );
};

export default ReviewCard;
