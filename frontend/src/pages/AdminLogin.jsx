import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/admin');
        } catch (err) {
            alert('Identifiants invalides');
        }
    };

    return (
        <div className="flex items-center justify-center" style={{ height: '100vh', backgroundColor: '#000' }}>
            <div className="card" style={{ width: '400px', padding: '40px' }}>
                <h2 className="text-center mb-4">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn" style={{ width: '100%' }}>Se connecter</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
