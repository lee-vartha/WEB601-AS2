const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));


// const authJwt = require('./helpers/jwt'); // uncomment when script has been created
const errorHandler = require('./helpers/error-handler');

// app.use(authJwt()); // uncomment when the script has been created
app.use(errorHandler);


// declaring out the port number for the server
app.listen(3000, () => {
    console.log("");
    console.log('Server is running on port 3000');
})

// configuration of the database
mongoose.connect('mongodb+srv://lee-vartha:hyp1ricuMLeuc5thoe@notepad.lrtnanc.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("");
    console.log('Connected to MongoDB!');
}) .catch(err => {
    console.log('Error:', err.message);
})

// const db = mongoose.connection;

const api = process.env.API_URL

//handlers for the routes
const noteRoute = require(`./routes/notes.js`);
const userRoute = require(`./routes/users.js`);

app.use('/', userRoute);
app.use('/', noteRoute);



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/auth.html'))
})


module.exports = app;