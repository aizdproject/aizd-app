const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const potNodes = require('./routes/api/v1/pot-nodes');

const app = express();

//BodyParser Middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => 
        console.log('MongoDB is connected...'))
    .catch(err => console.log(err));

app.use('/api/v1/pot-nodes', potNodes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));