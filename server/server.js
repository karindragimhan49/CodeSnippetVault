const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 

app.use(express.json()); 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully!');
    } catch (err) {
        console.error('MongoDB Connection Failed:', err.message);
        process.exit(1); // Exit process with failure
    }
};
connectDB();
app.get('/', (req, res) => res.send('API is running...')); // Test route
app.use('/api/snippets', require('./routes/snippets'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));