const express = require('express');
const { register, login, verifyToken, forgotPassword, resetPassword } = require('../services/authService');
const passport = require('passport');
const router = express.Router();
require('dotenv').config();


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const result = await register(username, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.message === 'User already exists' ? 409 : 400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const result = await login(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Access granted to protected route', user: req.user });
});





router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        const result = await forgotPassword(email);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        // Extract token from query parameter (e.g., ?token=abc123)
        const token = req.query.token // Fallback to body if query is not provided
        const { newPassword, confirmPassword } = req.body;

        // Validate inputs
        if (!token || !newPassword || !confirmPassword) {
            return res.status(400).json({ error: 'Token, new password, and confirm password are required' });
        }
        
        // Call resetPassword service
        const result = await resetPassword(token, newPassword, confirmPassword);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;