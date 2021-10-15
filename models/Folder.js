const mongoose          = require('mongoose');

const folderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 5,
        max: 100
    },
    movies: [{
        type: String,
        required: false
    }]
});

module.exports = mongoose.model('Folder', folderSchema)