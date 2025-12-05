import { mockDishes, mockReviews, mockRestaurantReviews, mockReservations } from '../data/mockData';

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get data from localStorage or default to mock data
const getStoredData = (key, defaultData) => {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
};

const api = {
    get: async (url) => {
        await delay(500); // Simulate network latency

        if (url === '/auth/me') {
            const token = localStorage.getItem('token');
            if (token === 'mock-token') return { data: { email: 'admin@legourmet.com' } };
            throw new Error('Unauthorized');
        }

        if (url === '/dishes') return { data: getStoredData('dishes', mockDishes) };

        if (url === '/restaurant-reviews') return { data: getStoredData('restaurantReviews', mockRestaurantReviews) };

        if (url === '/reservations') return { data: getStoredData('reservations', mockReservations) };

        if (url.startsWith('/reviews/')) {
            const dishId = url.split('/')[2];
            const allReviews = getStoredData('reviews', mockReviews);
            return { data: allReviews.filter(r => r.dish_id === dishId) };
        }

        return { data: [] };
    },

    post: async (url, data) => {
        await delay(500);

        if (url === '/auth/login') {
            if (data.email === 'admin@legourmet.com' && data.password === 'admin123') {
                return { data: { token: 'mock-token' } };
            }
            throw new Error('Invalid credentials');
        }

        if (url === '/dishes') {
            const dishes = getStoredData('dishes', mockDishes);
            const newDish = { ...data, _id: Date.now().toString(), average_rating: 0 };
            dishes.push(newDish);
            localStorage.setItem('dishes', JSON.stringify(dishes));
            return { data: newDish };
        }

        if (url === '/reservations') {
            const reservations = getStoredData('reservations', mockReservations);
            const newRes = { ...data, _id: Date.now().toString(), status: 'pending' };
            reservations.push(newRes);
            localStorage.setItem('reservations', JSON.stringify(reservations));
            return { data: newRes };
        }

        if (url === '/restaurant-reviews') {
            const reviews = getStoredData('restaurantReviews', mockRestaurantReviews);
            const newReview = { ...data, _id: Date.now().toString(), date: new Date().toISOString() };
            reviews.unshift(newReview);
            localStorage.setItem('restaurantReviews', JSON.stringify(reviews));
            return { data: newReview };
        }

        if (url === '/reviews') {
            const reviews = getStoredData('reviews', mockReviews);
            const newReview = { ...data, _id: Date.now().toString(), date: new Date().toISOString() };
            reviews.push(newReview);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            return { data: newReview };
        }

        return { data: {} };
    },

    put: async (url, data) => {
        await delay(500);

        if (url.startsWith('/dishes/')) {
            const id = url.split('/')[2];
            const dishes = getStoredData('dishes', mockDishes);
            const index = dishes.findIndex(d => d._id === id);
            if (index !== -1) {
                dishes[index] = { ...dishes[index], ...data };
                localStorage.setItem('dishes', JSON.stringify(dishes));
                return { data: dishes[index] };
            }
        }

        if (url.startsWith('/reservations/')) {
            const id = url.split('/')[2];
            const reservations = getStoredData('reservations', mockReservations);
            const index = reservations.findIndex(r => r._id === id);
            if (index !== -1) {
                reservations[index] = { ...reservations[index], ...data };
                localStorage.setItem('reservations', JSON.stringify(reservations));
                return { data: reservations[index] };
            }
        }

        return { data: {} };
    },

    delete: async (url) => {
        await delay(500);

        if (url.startsWith('/dishes/')) {
            const id = url.split('/')[2];
            const dishes = getStoredData('dishes', mockDishes);
            const newDishes = dishes.filter(d => d._id !== id);
            localStorage.setItem('dishes', JSON.stringify(newDishes));
            return { data: { message: 'Deleted' } };
        }

        if (url.startsWith('/reservations/')) {
            const id = url.split('/')[2];
            const reservations = getStoredData('reservations', mockReservations);
            const newReservations = reservations.filter(r => r._id !== id);
            localStorage.setItem('reservations', JSON.stringify(newReservations));
            return { data: { message: 'Deleted' } };
        }

        if (url.startsWith('/restaurant-reviews/')) {
            const id = url.split('/')[2];
            const reviews = getStoredData('restaurantReviews', mockRestaurantReviews);
            const newReviews = reviews.filter(r => r._id !== id);
            localStorage.setItem('restaurantReviews', JSON.stringify(newReviews));
            return { data: { message: 'Deleted' } };
        }

        return { data: {} };
    }
};

export default api;
