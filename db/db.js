
const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGODB_URL || 'mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => {
        console.log('Error in DB connection: ' + err)
        process.exit(1)
    })

module.exports = mongoose