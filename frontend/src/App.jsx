import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import RestaurantReviews from './pages/RestaurantReviews';
import DishReviews from './pages/DishReviews';
import Reservation from './pages/Reservation';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminDishes from './pages/AdminDishes';
import AdminReviews from './pages/AdminReviews';
import AdminReservations from './pages/AdminReservations';

// Layout wrapper to conditionally show Navbar/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <div style={{ minHeight: '80vh' }}>
        {children}
      </div>
      {!isAdmin && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reviews" element={<RestaurantReviews />} />
          <Route path="/reviews/:id" element={<DishReviews />} />
          <Route path="/reservation" element={<Reservation />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dishes" element={<AdminDishes />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/reservations" element={<AdminReservations />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
