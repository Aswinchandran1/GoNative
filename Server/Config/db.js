const mongoose = require('mongoose')
const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString).then(res => {
    console.log("Database is connected successfully");
}).catch(err => {
    console.log("Database Connection Error", err);
})