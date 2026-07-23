const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'users.json');

// Ensure users.json exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}), 'utf8');
}

function getUsers() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data || '{}');
    } catch (e) {
        return {};
    }
}

function saveUsers(users) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// 1. REGISTER API
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();

    if (users[cleanEmail]) {
        return res.status(400).json({ error: "Email already exists" });
    }

    const namePart = cleanEmail.split('@')[0];
    const newUser = {
        uid: 'user_' + Date.now(),
        email: cleanEmail,
        password: password,
        firstName: namePart ? namePart.charAt(0).toUpperCase() + namePart.slice(1) : "Nguyễn Văn",
        lastName: "A",
        phone: "+84 90 123 4567",
        address: "Tòa nhà CowColap, Cơ sở 1 PTIT, TP. Hồ Chí Minh",
        isVerified: true,
        createdAt: new Date().toISOString()
    };

    users[cleanEmail] = newUser;
    saveUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ message: "Successfully", user: userWithoutPassword });
});

// 2. LOGIN API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const user = users[cleanEmail];

    if (!user) {
        return res.status(404).json({ error: "Invalid Email" });
    }

    if (user.password !== password) {
        return res.status(401).json({ error: "Incorrect password" });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ message: "Login successful", user: userWithoutPassword });
});

// 3. GET PROFILE API
app.get('/api/profile', (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ error: "Email query parameter required" });
    }

    const users = getUsers();
    const user = users[email.trim().toLowerCase()];

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword });
});

// 4. UPDATE PROFILE API
app.put('/api/profile/update', (req, res) => {
    const { email, firstName, lastName, phone, address } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const user = users[cleanEmail];

    if (!user) {
        return res.status(404).json({ error: "User session not found" });
    }

    user.firstName = firstName !== undefined ? firstName : user.firstName;
    user.lastName = lastName !== undefined ? lastName : user.lastName;
    user.phone = phone !== undefined ? phone : user.phone;
    user.address = address !== undefined ? address : user.address;
    user.updatedAt = new Date().toISOString();

    users[cleanEmail] = user;
    saveUsers(users);

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ message: "Cập nhật thông tin thành công!", user: userWithoutPassword });
});

app.listen(PORT, () => {
    console.log(`CowColap Express Backend server running on http://localhost:${PORT}`);
});
