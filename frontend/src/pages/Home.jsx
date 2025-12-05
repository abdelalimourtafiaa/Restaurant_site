import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div>
            <div className="hero">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1>Le Gourmet Royal</h1>
                    <p>L'excellence culinaire dans un cadre d'exception.</p>
                    <Link to="/reservation" className="btn">Réserver une table</Link>
                </motion.div>
            </div>

            <div className="container" style={{ padding: '80px 20px' }}>
                <div className="text-center mb-4">
                    <h2>Pourquoi nous choisir ?</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto', color: '#ccc' }}>
                        Une cuisine raffinée, des produits frais de saison et un service irréprochable.
                        Découvrez l'art de vivre à la française.
                    </p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '50px' }}>
                    <div className="card text-center">
                        <h3 style={{ marginTop: 0 }}>Cuisine Gastronomique</h3>
                        <p>Des plats créés avec passion par nos chefs étoilés.</p>
                    </div>
                    <div className="card text-center">
                        <h3 style={{ marginTop: 0 }}>Ambiance Luxe</h3>
                        <p>Un décor élégant pour vos dîners romantiques ou d'affaires.</p>
                    </div>
                    <div className="card text-center">
                        <h3 style={{ marginTop: 0 }}>Vins d'Exception</h3>
                        <p>Une cave sélectionnée parmi les meilleurs vignobles.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
