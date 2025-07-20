import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'
const router = express.Router();


// Register Route
router.post('/register', async (req, res) => {

    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingUser = await pool.query(
            `SELECT * FROM users WHERE username = $1 OR email = $2`,
            [username, email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Username or Email is already exists...!!!' });
        }

        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const newUser = await pool.query(
            `INSERT INTO users (username, email,password) 
      VALUES ($1, $2, $3) 
      RETURNING id,username,email,role`,
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        // Find user by email
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

        // Respond with token and user
        res.json({message: 'Login successful',token });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;

