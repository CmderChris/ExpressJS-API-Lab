const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');
const path = require('path');
const morgan = require('morgan');

let app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname,'../client')))

app.listen(3000, () => console.log('Server up and running!'));