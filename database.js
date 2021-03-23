const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017`)
.then(() => console.log('Connected to mongodb'))
.catch(err => console.error('Could not connect to MongoDB',err))