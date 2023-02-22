const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.URI_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('database on connection'))
    .catch(err => console.error(err));