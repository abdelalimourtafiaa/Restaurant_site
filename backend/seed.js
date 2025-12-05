const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Dish = require('./models/Dish');
const Admin = require('./models/Admin');
const Review = require('./models/Review');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/le_gourmet_royal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.error(err));

const seedData = async () => {
    try {
        // Clear existing data
        await Dish.deleteMany({});
        await Admin.deleteMany({});
        await Review.deleteMany({});

        // Create Admin
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash('admin123', salt);
        const admin = new Admin({
            email: 'admin@legourmet.com',
            password_hash
        });
        await admin.save();
        console.log('Admin created: admin@legourmet.com / admin123');

        // Create Dishes
        const dishes = [
            {
                name: 'Foie Gras Maison',
                description: 'Terrine de foie gras de canard, chutney de figues et pain brioché toasté.',
                price: 24,
                category: 'Entrées',
                image_url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                average_rating: 4.8
            },
            {
                name: 'Filet de Bœuf Rossini',
                description: 'Cœur de filet de bœuf, escalope de foie gras poêlée, sauce truffe.',
                price: 42,
                category: 'Plats',
                image_url: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                average_rating: 4.9
            },
            {
                name: 'Saint-Jacques Rôties',
                description: 'Noix de Saint-Jacques, purée de panais, émulsion au safran.',
                price: 36,
                category: 'Plats',
                image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                average_rating: 4.7
            },
            {
                name: 'Fondant au Chocolat',
                description: 'Cœur coulant Valrhona, glace vanille Bourbon.',
                price: 14,
                category: 'Desserts',
                image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                average_rating: 5.0
            }
        ];

        const createdDishes = await Dish.insertMany(dishes);
        console.log('Dishes seeded');

        // Create Reviews
        const reviews = [
            {
                dish_id: createdDishes[0]._id,
                author: 'Jean Dupont',
                rating: 5,
                comment: 'Exceptionnel ! Le meilleur foie gras que j\'ai mangé.'
            },
            {
                dish_id: createdDishes[1]._id,
                author: 'Marie Martin',
                rating: 5,
                comment: 'La viande était tendre à souhait. Un délice.'
            }
        ];

        await Review.insertMany(reviews);
        console.log('Reviews seeded');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
