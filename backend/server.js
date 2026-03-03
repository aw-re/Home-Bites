const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API endpoints

// Get all categories
app.get('/api/categories', (req, res) => {
    db.all('SELECT * FROM categories', [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        res.json(rows);
    });
});

// Get all families
app.get('/api/families', (req, res) => {
    db.all('SELECT * FROM families', [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        res.json(rows);
    });
});

// Get family by ID with their dishes
app.get('/api/families/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM families WHERE id = ?', [id], (err, family) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        if (!family) return res.status(404).json({ error: 'Family not found' });

        db.all('SELECT * FROM dishes WHERE family_id = ?', [id], (err, dishes) => {
            if (err) return res.status(500).json({ error: 'Internal Server Error' });
            res.json({ ...family, dishes });
        });
    });
});

// Get all dishes with optional search and category filters
app.get('/api/dishes', (req, res) => {
    const { search, category, family } = req.query;
    let query = 'SELECT dishes.*, families.name as family_name, categories.name as category_name FROM dishes ';
    query += 'JOIN families ON dishes.family_id = families.id ';
    query += 'JOIN categories ON dishes.category_id = categories.id ';

    const conditions = [];
    const params = [];

    if (search) {
        conditions.push('(dishes.name LIKE ? OR dishes.description LIKE ?)');
        params.push(`%${search}%`, `%${search}%`);
    }
    if (category) {
        conditions.push('dishes.category_id = ?');
        params.push(category);
    }
    if (family) {
        conditions.push('dishes.family_id = ?');
        params.push(family);
    }

    if (conditions.length > 0) {
        query += 'WHERE ' + conditions.join(' AND ');
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        res.json(rows);
    });
});

// Create/Seed dummy data endpoint (For testing)
app.post('/api/seed', (req, res) => {
    const categories = ['Traditional', 'Desserts', 'Healthy', 'Pastries', 'Main Courses'];
    const insertCategory = db.prepare('INSERT INTO categories (name) VALUES (?)');

    categories.forEach(cat => {
        insertCategory.run(cat, (err) => {
            // ignore errors like unique constraints
        });
    });
    insertCategory.finalize();

    // Create some sample families
    const insertFamily = db.prepare('INSERT INTO families (name, contact_number, bio, location, image_url) VALUES (?, ?, ?, ?, ?)');
    insertFamily.run('The Dough Factory', '966500000000', 'Handcrafted pastries and cakes.', 'Riyadh', 'https://images.unsplash.com/photo-1555507036-ab1e4006aaeb?w=500&q=80');
    insertFamily.run('Mama Fatima Kitchen', '966500000001', 'Authentic traditional Saudi dishes.', 'Jeddah', 'https://images.unsplash.com/photo-1590846406792-0adc7f928a18?w=500&q=80');
    insertFamily.run('Healthy Bites', '966500000002', 'Nutritious and delicious daily meals.', 'Dammam', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80');
    insertFamily.finalize(() => {
        // Seed some dishes
        const insertDish = db.prepare('INSERT INTO dishes (family_id, category_id, name, description, price, image_url) VALUES (?, ?, ?, ?, ?, ?)');
        insertDish.run(1, 4, 'Croissant Box', 'Assorted box of 6 butter croissants.', 45.00, 'https://images.unsplash.com/photo-1555507036-ab1e4006aaeb?w=500&q=80');
        insertDish.run(2, 1, 'Kabsa Chicken', 'Traditional Saudi Kabsa with half chicken.', 35.00, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Kabsa.jpg/500px-Kabsa.jpg');
        insertDish.run(3, 3, 'Grilled Salmon Bowl', 'Fresh salmon with quinoa and greens.', 65.00, 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80');
        insertDish.run(2, 2, 'Luqaimat', 'Sweet dumplings with date syrup.', 25.00, 'https://arabianfarms.com/wp-content/uploads/2021/04/Luqaimat.jpg');
        insertDish.finalize();

        res.json({ message: 'Database seeded successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
