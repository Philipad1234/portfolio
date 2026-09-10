// Imports
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import contactRoutes from './routes/contact.js';
import contactLimiter from './middlewares/rateLimiter.js';

// Configuring app
const app = express();

// Configuring port
const PORT = process.env.PORT || 3000;

// Establish database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB via Mongoose!');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

connectDB();

// Configuring cors module
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

app.set('trust proxy', 1);

// Use routes
app.use('/api/contact', contactLimiter, contactRoutes);

// App listening on port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});