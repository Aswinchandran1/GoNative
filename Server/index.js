const express = require('express')
const cors = require('cors')
const router = require('./Routes/userRoutes')
require('dotenv').config()
require('./Config/db')

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use(router);  

app.get('/', (req, res) => {
    res.send('Server is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});