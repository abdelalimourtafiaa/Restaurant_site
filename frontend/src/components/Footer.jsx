import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#050505', padding: '50px 0', marginTop: '50px', borderTop: '1px solid #333' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
                <div>
                    <h3>Le Gourmet Royal</h3>
                    <p>Une expérience gastronomique inoubliable au cœur de la ville.</p>
                </div>
                <div>
                    <h4>Horaires</h4>
                    <p>Lundi - Dimanche</p>
                    <p>12:00 - 14:30</p>
                    <p>19:00 - 23:00</p>
                </div>
                <div>
                    <h4>Contact</h4>
                    <p>123 Avenue des Champs-Élysées</p>
                    <p>75008 Paris</p>
                    <p>+33 1 23 45 67 89</p>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                        <Facebook color="#D4AF37" />
                        <Instagram color="#D4AF37" />
                        <Twitter color="#D4AF37" />
                    </div>
                </div>
            </div>
            <div className="text-center" style={{ marginTop: '40px', opacity: 0.5, fontSize: '0.9rem' }}>
                &copy; 2025 Le Gourmet Royal. Tous droits réservés.
            </div>
        </footer>
    );
};

export default Footer;
