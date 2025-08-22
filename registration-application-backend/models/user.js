const { connectDB } = require('../config/database.js');
const bcrypt = require('bcryptjs');

const createUser = async (username, email, password) => {
    const connection = await connectDB();
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await connection.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        return result;
    } catch (error) {
        console.log(error)
    } finally {
        await connection.end();
    }
};

const findUserByEmail = async (email) => {
    const connection = await connectDB();
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    } catch (error) {
        console.log(error)
    } finally {
        await connection.end();
    }
};

const updatePassword = async(email, password) => {
    const connection = await connectDB();
    try {
        const hashedNewPassword = await bcrypt.hash(password, 10);
        await connection.execute(
            'UPDATE users SET password = ? WHERE email = ?',
            [hashedNewPassword, email]
        );
    } catch (error) {
        console.log(error)
    } finally {
        await connection.end();
    }
}


module.exports = { createUser, findUserByEmail, updatePassword };