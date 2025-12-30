const express = require('express');
const app = express();

// ========== MIDDLEWARE ==========
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// ========== TEMP DATA (NO DB) ==========
let users = [];

// ========== ROUTES ==========

// Home page
app.get('/', (req, res) => {
    res.render('index');
});

// ---------- CREATE USER (API) ----------
app.post('/api/users', (req, res) => {
    const { fullname, email, age, course, state } = req.body;

    if (!fullname || !email || !age || !course || !state) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = {
        id: Date.now(),
        fullname,
        email,
        age,
        course,
        state
    };

    users.push(user);
    res.json(user);
});

// ---------- READ USERS (API) ----------
app.get('/api/users', (req, res) => {
    res.json(users);
});

// ---------- DELETE USER (API) ----------
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(u => u.id !== id);
    res.json({ message: "User deleted" });
});

// ========== SERVER ==========
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
