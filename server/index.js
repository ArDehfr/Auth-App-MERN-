const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute')
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter)
app.use('/api/',userRouter)

//Mongo DB Connection
mongoose
    .connect('mongodb://127.0.0.1:27017/authentication')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error("Failed to connect to MongoDB", error));

//Global Error Handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

//Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));