const express = require('express')
const cors = require('cors')
const userRouter = require('./Routes/userRoutes')
const hostRouter = require('./Routes/hostRoutes')
const experienceRouter =require('./Routes/experiencesRoutes')
require('dotenv').config()
require('./Config/db')

const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"));

// Routes
app.use('/api/travelers', userRouter);
app.use('/api/travelers', experienceRouter);
app.use('/api/hosts', hostRouter)

app.get('/', (req, res) => {
    res.send('Server is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});