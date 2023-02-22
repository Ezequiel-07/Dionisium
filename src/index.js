require('dotenv').config();
// IMPORTS
const morgan = require('morgan');
const cors = require('cors');
const MOD = require('method-override');
const express = require('express');
const app = express();
const auth_routes = require('./routes/auth');
const series_routes = require('./routes/series');
require('./server/database');

// MIDLEWARES
app.use(MOD('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// ROUTES
app.use('/api' ,auth_routes);
app.use('/api', series_routes);

// SERVER
app.set('port', process.env.PORT);
app.listen(app.get('port'), ()=>{
    console.log('server on port:' + app.get('port'));
});