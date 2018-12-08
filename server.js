const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const role = require('./routes/api/v1/auth/roles');
const user = require('./routes/api/v1/auth/users');
const potNode = require('./routes/api/v1/pot-node/pot-nodes');
const soilTemperature = require('./routes/api/v1/pot-node/soil-temperatures');
const soilMoisture = require('./routes/api/v1/pot-node/soil-moistures');
const pompNode = require('./routes/api/v1/pomp-node/pomp-nodes');
const greenHouseNode = require('./routes/api/v1/greenhouse-node/greenhouse-nodes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.set('useCreateIndex', true);
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => 
        console.log('MongoDB is connected...'))
    .catch(err => console.log(err));

// Routes
app.use('/api/v1/roles', role);
app.use('/api/v1/users', user);
app.use('/api/v1/pot-nodes', potNode);
app.use('/api/v1/soil/temperatures', soilTemperature);
app.use('/api/v1/soil/moistures', soilMoisture);
app.use('/api/v1/pomp-nodes', pompNode);
app.use('/api/v1/greenhouse-nodes', greenHouseNode);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));