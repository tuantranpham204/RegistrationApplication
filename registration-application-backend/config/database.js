const mysql = require('mysql2/promise');

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
        });
        console.log('Database connected successfully');
        return connection;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

module.exports = { connectDB };