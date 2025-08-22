const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
const authRoute = require('./routes/authRoute.js');
const { connectDB } = require('./config/database.js');
require('dotenv').config()
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());


// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', authRoute);

app.use(cors());



// Connect to database and start server
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    });
}).catch(err => {
    console.error('Failed to connect to database:', err);
});



