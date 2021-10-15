const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Test = require('./models/Test');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3002;

// IMPORT ROUTES //
const authRoutes = require('./routes/Auth');
app.use('/auth', authRoutes);
const fileRoutes = require('./routes/FileManagement');
app.use('/user', fileRoutes);


// DATABASE CONNECTION //
mongoose.connect('mongodb+srv://caiouser:Caio130298ishikawa@laravel1.q2vv7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connnected to DB');
    }
});





app.get('/', (req, res) => {
    console.log('test');
});


app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
});

