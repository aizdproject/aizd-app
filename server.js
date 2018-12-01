const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// var fs = require('fs')
// var https = require('https')

const potNodes = require('./routes/api/v1/pot-nodes');
const soilTemperature = require('./routes/api/v1/soil-temperatures');
const soilMoisture = require('./routes/api/v1/soil-moistures');

const app = express();

//BodyParser Middleware
app.use(bodyParser.json());
app.use(cors());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => 
        console.log('MongoDB is connected...'))
    .catch(err => console.log(err));

//Routes
app.use('/api/v1/pot-nodes', potNodes);
app.use('/api/v1/soil/temperatures', soilTemperature);
app.use('/api/v1/soil/moistures', soilMoisture);

const port = process.env.PORT || 5000;

// https.createServer({
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cert')
//   }, app)
//   .listen(3000, function () {
//     console.log(`Server started on port ${port}`);
//   })

app.listen(port, () => console.log(`Server started on port ${port}`));