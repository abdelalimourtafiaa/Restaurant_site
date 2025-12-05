export const mockDishes = [
    {
        _id: '1',
        name: 'Foie Gras Maison',
        description: 'Terrine de foie gras de canard, chutney de figues et pain brioché toasté.',
        price: 24,
        category: 'Entrées',
        image_url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        average_rating: 4.8
    },
    {
        _id: '2',
        name: 'Filet de Bœuf Rossini',
        description: 'Cœur de filet de bœuf, escalope de foie gras poêlée, sauce truffe.',
        price: 42,
        category: 'Plats',
        image_url: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        average_rating: 4.9
    },
    {
        _id: '3',
        name: 'Saint-Jacques Rôties',
        description: 'Noix de Saint-Jacques, purée de panais, émulsion au safran.',
        price: 36,
        category: 'Plats',
        image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        average_rating: 4.7
    },
    {
        _id: '4',
        name: 'Fondant au Chocolat',
        description: 'Cœur coulant Valrhona, glace vanille Bourbon.',
        price: 14,
        category: 'Desserts',
        image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        average_rating: 5.0
    }
];

export const mockReviews = [
    {
        _id: '101',
        dish_id: '1',
        author: 'Jean Dupont',
        rating: 5,
        comment: 'Exceptionnel ! Le meilleur foie gras que j\'ai mangé.',
        date: new Date().toISOString()
    },
    {
        _id: '102',
        dish_id: '2',
        author: 'Marie Martin',
        rating: 5,
        comment: 'La viande était tendre à souhait. Un délice.',
        date: new Date().toISOString()
    }
];

export const mockRestaurantReviews = [
    {
        _id: '201',
        author: 'Pierre Durand',
        rating: 5,
        category: 'Service',
        comment: 'Service impeccable et attentionné.',
        date: new Date().toISOString()
    },
    {
        _id: '202',
        author: 'Sophie Lefebvre',
        rating: 4,
        category: 'Qualité',
        comment: 'Très bonne cuisine, cadre magnifique.',
        date: new Date().toISOString()
    }
];

export const mockReservations = [
    {
        _id: '301',
        name: 'Alice Wonderland',
        email: 'alice@example.com',
        phone: '0612345678',
        guests: 2,
        date_time: new Date().toISOString(),
        status: 'pending'
    }
];
